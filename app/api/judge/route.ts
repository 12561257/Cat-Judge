import { NextResponse } from 'next/server';
import type { CaseData, VerdictData, Language } from '../../../types';

const DEEPSEEK_URL = 'https://api.deepseek.com/chat/completions';
const MODEL = process.env.DEEPSEEK_MODEL || 'deepseek-chat';

const buildOutputInstruction = `
Return a pure JSON object with the following keys:
- rootAnalysis: string
- partyAScore: integer (0-100)
- partyBScore: integer (0-100)
- decreeTitle: string
- decreeContent: string
- reparations: array of objects { party: "A" | "B" | "Both", task: string }
Do not include markdown or extra text; only JSON.
`;

export async function POST(req: Request) {
  try {
    const apiKey = process.env.DEEPSEEK_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'Server missing DEEPSEEK_API_KEY' }, { status: 500 });
    }

    const { caseData, language }: { caseData: CaseData; language: Language } = await req.json();

    const basePrompt = `
      You are the Honorable Judge Cat, presiding over the Court of Cuteness.
      Two humans have brought a petty argument before you.

      Party A (${caseData.partyA.name}):
      - What happened: ${caseData.partyA.event}
      - Why they are upset: ${caseData.partyA.grievance}

      Party B (${caseData.partyB.name}):
      - What happened: ${caseData.partyB.event}
      - Why they are upset: ${caseData.partyB.grievance}

      Analyze this case with the wisdom of a cat.
      1. Find the root cause (usually a silly misunderstanding).
      2. Assign blame percentages.
      3. Write a decree using "legal" language mixed with cat puns.
      4. Assign mandatory reparations (tasks) to fix their relationship.

      Be cute, funny, strict but fair.
    `;

    const languageInstruction = language === 'zh'
      ? 'IMPORTANT: Generate ALL fields in Simplified Chinese (简体中文). Use suitable cute/couple slang where appropriate.'
      : 'Generate the response in English.';

    const messages = [
      {
        role: 'system',
        content:
          'You are a cute, fair, and slightly sassy Cat Judge. You speak in a mix of legalese and cat puns. ' +
          'Return ONLY valid JSON that matches the required keys. ' +
          buildOutputInstruction,
      },
      { role: 'user', content: `${basePrompt}\n\n${languageInstruction}` },
    ];

    async function callModel(model: string) {
      const body = { model, messages, temperature: 0.7, response_format: { type: 'json_object' }, max_tokens: 1024 };
      const resp = await fetch(DEEPSEEK_URL, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });
      return resp;
    }

    let resp = await callModel(MODEL);
    if (!resp.ok) {
      const errText = await resp.text();
      if (/Model Not Exist/i.test(errText)) {
        const candidates = MODEL === 'deepseek-chat'
          ? ['deepseek-reasoner', 'deepseek-r1']
          : ['deepseek-chat', 'deepseek-r1'];
        for (const alt of candidates) {
          resp = await callModel(alt);
          if (resp.ok) {
            break;
          }
        }
      }
    }

    if (!resp.ok) {
      const errText = await resp.text();
      console.error('DeepSeek API error:', resp.status, errText);
      return NextResponse.json({ error: errText }, { status: resp.status });
    }

    const json = await resp.json();
    let text = json?.choices?.[0]?.message?.content;
    if (!text) {
      return NextResponse.json({ error: 'No response from Judge Cat' }, { status: 500 });
    }

    // Fallback: extract the last JSON object if the model added extra text
    const match = text.match(/\{[\s\S]*\}/);
    if (match) {
      text = match[0];
    }

    const data = JSON.parse(text) as VerdictData;
    return NextResponse.json(data);
  } catch (e: any) {
    return NextResponse.json({ error: e?.message || 'Unknown error' }, { status: 500 });
  }
}
