import { getGeminiApiKey } from '@/utils/credentialStorage';
import { fetchConTimeout } from '@/utils/network';
import { GEMINI_GENERATE_URL } from '@/utils/gemini';

interface DatamuseResult {
  word: string;
  score: number;
}

interface GeminiResponse {
  candidates?: {
    content?: {
      parts?: { text?: string }[];
    };
  }[];
}

function esPalabraSimple(palabra: string): boolean {
  const limpia = palabra.trim().toLowerCase();
  if (limpia.includes(' ')) return false;
  if (/^\d/.test(limpia)) return false;
  if (limpia.length < 3) return false;
  return true;
}

async function buscarDatamuse(palabra: string, max = 8, signal?: AbortSignal): Promise<string[]> {
  const params = new URLSearchParams({
    rel_syn: palabra,
    max: max.toString(),
  });

  const response = await fetchConTimeout(`https://api.datamuse.com/words?${params.toString()}`, {
    signal,
  });
  if (!response.ok) throw new Error(`Datamuse respondió con HTTP ${response.status}.`);

  const data: DatamuseResult[] = await response.json();
  return data
    .map((r) => r.word.trim())
    .filter((w) => w.length > 0 && w.toLowerCase() !== palabra.toLowerCase());
}

async function buscarGemini(palabra: string, max = 8, signal?: AbortSignal): Promise<string[]> {
  const apiKey = await getGeminiApiKey();
  if (!apiKey) return [];

  const prompt = `Dame hasta ${max} sinonimos en español para "${palabra}". 
Responde SOLO con una lista de sinonimos separados por comas, sin numeracion ni explicaciones.
Si no existen sinonimos adecuados, responde "ninguno".`;

  const response = await fetchConTimeout(
    GEMINI_GENERATE_URL,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-goog-api-key': apiKey },
      signal,
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 200,
        },
      }),
    },
  );

  if (!response.ok) throw new Error(`Gemini respondió con HTTP ${response.status}.`);

  const data: GeminiResponse = await response.json();
  const texto = data.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
  if (!texto || texto.toLowerCase() === 'ninguno') return [];

  return texto
    .split(',')
    .map((s) => s.trim().replace(/^\d+[\.\)]\s*/, ''))
    .filter((s) => s.length > 0 && s.toLowerCase() !== palabra.toLowerCase())
    .slice(0, max);
}

function deduplicar(lista: string[]): string[] {
  const vistos = new Set<string>();
  const resultado: string[] = [];
  for (const item of lista) {
    const key = item.toLowerCase();
    if (!vistos.has(key)) {
      vistos.add(key);
      resultado.push(item);
    }
  }
  return resultado;
}

export async function buscarSinonimos(palabra: string, signal?: AbortSignal): Promise<string[]> {
  const limpia = palabra.trim();
  if (!limpia) return [];

  if (esPalabraSimple(limpia)) {
    const datamuse = await intentarProveedor(() => buscarDatamuse(limpia, 8, signal), signal);
    if (datamuse.length >= 3) return deduplicar(datamuse);

    const gemini = await intentarProveedor(() => buscarGemini(limpia, 8, signal), signal);
    return deduplicar([...datamuse, ...gemini]);
  }

  const gemini = await intentarProveedor(() => buscarGemini(limpia, 8, signal), signal);
  if (gemini.length >= 3) return deduplicar(gemini);

  const datamuse = await intentarProveedor(() => buscarDatamuse(limpia, 8, signal), signal);
  return deduplicar([...gemini, ...datamuse]);
}

async function intentarProveedor(
  buscar: () => Promise<string[]>,
  signal?: AbortSignal,
): Promise<string[]> {
  try {
    return await buscar();
  } catch (error) {
    if (signal?.aborted) throw error;
    return [];
  }
}
