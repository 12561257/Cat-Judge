import { GoogleGenAI, Type, Schema } from "@google/genai";
import { CaseData, VerdictData, Language } from "../types";

const verdictSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    rootAnalysis: {
      type: Type.STRING,
      description: "A funny, cute, yet insightful root cause analysis of the argument. Use cat puns.",
    },
    partyAScore: {
      type: Type.INTEGER,
      description: "Percentage of responsibility/blame assigned to Party A (0-100).",
    },
    partyBScore: {
      type: Type.INTEGER,
      description: "Percentage of responsibility/blame assigned to Party B (0-100). Should complement Party A to roughly 100%.",
    },
    decreeTitle: {
      type: Type.STRING,
      description: "A formal sounding legal title for the decree.",
    },
    decreeContent: {
      type: Type.STRING,
      description: "The official judgment text. Must use legal jargon mixed with cat terminology. Be humorous but fair.",
    },
    reparations: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          party: {
            type: Type.STRING,
            enum: ['A', 'B', 'Both'],
            description: "Who needs to perform this task.",
          },
          task: {
            type: Type.STRING,
            description: "A specific, cute, and actionable task to resolve the conflict.",
          },
        },
        required: ["party", "task"],
      },
    },
  },
  required: ["rootAnalysis", "partyAScore", "partyBScore", "decreeTitle", "decreeContent", "reparations"],
};

export const judgeCase = async (caseData: CaseData, language: Language): Promise<VerdictData> => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("API Key is missing");
  }

  const ai = new GoogleGenAI({ apiKey });

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
    ? "IMPORTANT: You MUST generate all text (rootAnalysis, decreeTitle, decreeContent, tasks) in Simplified Chinese (简体中文). Use Chinese internet slang suitable for cute pets/couples where appropriate." 
    : "Generate the response in English.";

  const prompt = `${basePrompt}\n\n${languageInstruction}`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: verdictSchema,
        systemInstruction: "You are a cute, fair, and slightly sassy Cat Judge. You speak in a mix of legalese and cat puns.",
        temperature: 0.7,
      },
    });

    const jsonText = response.text;
    if (!jsonText) {
      throw new Error("No response from Judge Cat");
    }

    const data = JSON.parse(jsonText) as VerdictData;
    return data;
  } catch (error) {
    console.error("Error judging case:", error);
    throw error;
  }
};