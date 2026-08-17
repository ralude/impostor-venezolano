import { esPalabraClaveValida } from '@/data/palabrasClave';
import { getGeminiApiKey } from '@/utils/credentialStorage';
import { fetchConTimeout } from '@/utils/network';
import { GEMINI_GENERATE_URL } from '@/utils/gemini';

interface GeminiResponse {
  candidates?: { content?: { parts?: { text?: string }[] } }[];
}

export async function generarPalabraClave(
  palabra: string,
  categoria?: string,
  signal?: AbortSignal,
): Promise<string> {
  const apiKey = await getGeminiApiKey();
  if (!apiKey) throw new Error('Configura una API key de Gemini o escribe la clave manualmente.');

  const prompt = [
    `Genera una sola palabra clave en español relacionada con "${palabra}".`,
    categoria ? `La categoría es "${categoria}".` : '',
    'Debe ayudar de forma indirecta a un impostor en un juego de deducción.',
    'No puede ser la respuesta, una parte de la respuesta ni un sinónimo demasiado obvio.',
    'Responde únicamente con una palabra, sin espacios, puntuación ni explicación.',
  ]
    .filter(Boolean)
    .join(' ');

  const response = await fetchConTimeout(
    GEMINI_GENERATE_URL,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-goog-api-key': apiKey },
      signal,
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: { temperature: 0.8, maxOutputTokens: 20 },
      }),
    },
  );

  if (!response.ok) throw new Error(`Gemini respondió con HTTP ${response.status}.`);

  const data: GeminiResponse = await response.json();
  const clave = data.candidates?.[0]?.content?.parts?.[0]?.text?.trim() ?? '';
  if (!esPalabraClaveValida(clave, palabra)) {
    throw new Error('La clave generada no fue válida. Intenta generar otra.');
  }
  return clave;
}
