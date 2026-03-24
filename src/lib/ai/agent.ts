'use server';

import { GoogleGenAI } from '@google/genai';

const aiInstances: Record<string, GoogleGenAI> = {};

function getAIClient(location?: string) {
  const isVertex = !process.env.GEMINI_API_KEY;
  const loc = location || process.env.GOOGLE_CLOUD_LOCATION || 'us-central1';
  const cacheKey = isVertex ? loc : 'default';

  if (!aiInstances[cacheKey]) {
    aiInstances[cacheKey] = new GoogleGenAI(
      isVertex
        ? {
            vertexai: true,
            project: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'apostolidis-demo',
            location: loc,
          }
        : {
            apiKey: process.env.GEMINI_API_KEY,
          }
    );
  }
  return aiInstances[cacheKey];
}

const MODEL = 'gemini-2.5-flash-lite';
const GENERATOR_MODEL = 'gemini-3.1-flash-lite-preview';

export async function translateText(text: string, sourceLang: 'en' | 'el', targetLang: 'en' | 'el') {
  if (!text) return '';
  
  const prompt = `Translate the following text from ${sourceLang === 'en' ? 'English' : 'Greek'} to ${targetLang === 'en' ? 'English' : 'Greek'}.
Maintain the professional, architectural tone. 
Return ONLY the translated text, with no additional comments or markdown formatting.

Text to translate:
${text}`;

  try {
    const ai = getAIClient();
    const response = await ai.models.generateContent({
      model: MODEL,
      contents: prompt,
    });
    
    return response.text?.trim() || '';
  } catch (error) {
    console.error('Translation error:', error);
    throw new Error('Failed to translate text. Please ensure Vertex AI API is enabled and ADC is configured.');
  }
}

export async function generateProjectDescriptions(title: string, category: string, location: string) {
  if (!title) return null;

  const prompt = `You are an expert architectural copywriter working for a premium construction and renovation company in Greece.
Your task is to draft engaging and professional descriptions for a project to kickstart the admin's work.
The descriptions should NOT be generic; they must sound like a high-end construction firm highlighting aesthetics, quality materials, and functional design.

Project Title: ${title}
Project Category: ${category}
${location ? `Location: ${location}` : ''}

Please generate the following 4 pieces of content:
1. "short_en": A brief Short Description in English (2 to 3 sentences).
2. "short_el": A brief Short Description in Greek (2 to 3 sentences).
3. "long_en": A detailed Full Description in English (2 to 3 paragraphs detailing the challenge, the architectural approach, and the result).
4. "long_el": A detailed Full Description in Greek (translated or adapted nicely from the English long description).

Return ONLY a valid JSON object with the keys: "short_en", "short_el", "long_en", "long_el".`;

  try {
    const ai = getAIClient('global');
    const response = await ai.models.generateContent({
      model: GENERATOR_MODEL,
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      }
    });
    
    const text = response.text?.trim() || '{}';
    return JSON.parse(text);
  } catch (error) {
    console.error('Content generation error:', error);
    throw new Error('Failed to generate descriptions. Please ensure Vertex AI API is enabled and ADC is configured.');
  }
}

export async function generateScopeAndFeatures(shortDesc: string, longDesc: string) {
  if (!shortDesc && !longDesc) return null;

  const prompt = `You are a technical estimator and architectural copywriter for a premium construction company.
Based on the following project descriptions, generate a list of "Scope of Work" items.
The items should be specific, professional, and highlight the construction and renovation aspects (e.g., "Custom oak cabinetry installation", "Structural reinforcement of the load-bearing walls", "Implementation of smart home lighting systems").

Descriptions:
${shortDesc}
${longDesc}

Return ONLY a valid JSON object with two arrays of strings:
- "scope_en": 4 to 6 specific scope of work items in English.
- "scope_el": The same 4 to 6 scope of work items translated to Greek.`;

  try {
    const ai = getAIClient('global');
    const response = await ai.models.generateContent({
      model: GENERATOR_MODEL,
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      }
    });
    
    const text = response.text?.trim() || '{}';
    return JSON.parse(text);
  } catch (error) {
    console.error('Scope generation error:', error);
    throw new Error('Failed to generate scope of work.');
  }
}
