import { Injectable, inject } from '@angular/core';
import { GoogleGenAI, Type } from '@google/genai';
import { WeddingProfileService } from './wedding-profile.service';

@Injectable({
  providedIn: 'root'
})
export class GeminiService {
  private genAI: GoogleGenAI;
  private weddingProfileService = inject(WeddingProfileService);

  constructor() {
    // The instructions state to assume `process.env.API_KEY` is available.
    this.genAI = new GoogleGenAI({ apiKey: process.env.API_KEY });
  }

  async getAssistance(prompt: string): Promise<string> {
    const profile = this.weddingProfileService.profile();
    const model = 'gemini-2.5-flash';
    const systemInstruction = `You are "The Co-Ordinator", an extremely friendly and helpful wedding assistant for the wedding of ${profile.brideName} and ${profile.groomName}.
      Here are the key details you must know:
      - Couple's Names: ${profile.brideName} and ${profile.groomName}
      - Wedding Date: Saturday, October 26, 2024
      - Venue: Evergreen Gardens, 123 Blossom Lane, Napa Valley, CA
      - Ceremony Time: 4:00 PM
      - Reception Time: 6:00 PM, immediately following the ceremony at the same venue.
      - Dress Code: Formal Attire (e.g., suits for men, cocktail or evening dresses for women).
      - Gift Registry: The couple is registered at 'everafterregistry.com/olivia-liam'. They appreciate any gesture, but your presence is the greatest gift.
      - RSVP Deadline: September 15, 2024.
      - Parking: Ample free parking is available at the venue.
      - Plus Ones: Invitations will specify if a plus one is included.
      
      Your role is to answer guest questions based *only* on this information. Be polite, concise, and warm in your responses. If a question is outside the scope of the wedding (e.g., 'What is the meaning of life?'), politely decline to answer and state that you are here to help with wedding-related questions for ${profile.brideName} and ${profile.groomName}'s special day.`;
      
    try {
      const response = await this.genAI.models.generateContent({
        model,
        contents: prompt,
        config: {
            systemInstruction: systemInstruction,
            temperature: 0.7,
        },
      });

      return response.text;
    } catch (error) {
      console.error('Error calling Gemini API:', error);
      return "I'm sorry, I'm having a little trouble connecting right now. Please try again in a moment.";
    }
  }

  async getGiftSuggestion(): Promise<string> {
    const profile = this.weddingProfileService.profile();
    const model = 'gemini-2.5-flash';
    const prompt = `Generate a single, creative, and thoughtful wedding gift idea for a couple named ${profile.brideName} and ${profile.groomName}.
      Here are their interests:
      - ${profile.brideName} is an art historian who loves vintage books and gardening.
      - ${profile.groomName} is a software engineer who enjoys hiking, craft beer, and sci-fi movies.
      - Together, they love traveling (especially to Italy) and cooking.

      Provide one specific gift idea and a short, warm explanation (2-3 sentences) of why it's a good fit for them. Do not use markdown formatting.`;

    try {
      const response = await this.genAI.models.generateContent({
        model,
        contents: prompt,
        config: { temperature: 0.8 },
      });
      return response.text;
    } catch (error) {
      console.error('Error getting gift suggestion:', error);
      return "I'm having a little trouble thinking of a gift right now. Maybe a classic registry item would be nice?";
    }
  }

  async getHoneymoonIdeas(prompt: string): Promise<any> {
    const model = 'gemini-2.5-flash';
    const responseSchema = {
        type: Type.OBJECT,
        properties: {
            destinations: {
                type: Type.ARRAY,
                items: {
                    type: Type.OBJECT,
                    properties: {
                        name: { type: Type.STRING },
                        country: { type: Type.STRING },
                        description: { type: Type.STRING },
                        bestTimeToVisit: { type: Type.STRING },
                        activities: {
                            type: Type.ARRAY,
                            items: { type: Type.STRING }
                        }
                    },
                    required: ["name", "country", "description", "bestTimeToVisit", "activities"]
                }
            }
        },
        required: ["destinations"]
    };

    try {
      const response = await this.genAI.models.generateContent({
        model,
        contents: `Based on the following request, generate 3 diverse honeymoon destination ideas. Request: "${prompt}"`,
        config: {
          responseMimeType: "application/json",
          responseSchema: responseSchema,
        },
      });
      
      const jsonStr = response.text.trim();
      return JSON.parse(jsonStr);

    } catch (error) {
      console.error('Error getting honeymoon ideas:', error);
      return { error: "I'm sorry, I couldn't come up with any ideas right now. Please try rephrasing your request." };
    }
  }
}