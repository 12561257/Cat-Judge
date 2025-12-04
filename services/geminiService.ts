import { CaseData, VerdictData, Language } from "../types";

export const judgeCase = async (caseData: CaseData, language: Language): Promise<VerdictData> => {
  try {
    const resp = await fetch('/api/judge', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ caseData, language })
    });

    if (!resp.ok) {
      const errText = await resp.text();
      throw new Error(`API error ${resp.status}: ${errText}`);
    }

    const data = await resp.json() as VerdictData;
    return data;
  } catch (error) {
    console.error('Error judging case:', error);
    throw error;
  }
};
