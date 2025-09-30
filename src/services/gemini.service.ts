import { Injectable } from '@angular/core';
import { GoogleGenAI } from '@google/genai';

@Injectable({
  providedIn: 'root'
})
export class GeminiService {
  private genAI: GoogleGenAI;

  constructor() {
    // The instructions state to assume `process.env.API_KEY` is available.
    this.genAI = new GoogleGenAI({ apiKey: process.env.API_KEY });
  }

  async getAssistance(prompt: string): Promise<string> {
    const model = 'gemini-2.5-flash';
    const systemInstruction = `You are an extremely friendly and helpful wedding assistant for the wedding of Olivia and Liam.
      Here are the key details you must know:
      - Couple's Names: Olivia and Liam
      - Wedding Date: Saturday, October 26, 2024
      - Venue: Evergreen Gardens, 123 Blossom Lane, Napa Valley, CA
      - Ceremony Time: 4:00 PM
      - Reception Time: 6:00 PM, immediately following the ceremony at the same venue.
      - Dress Code: Formal Attire (e.g., suits for men, cocktail or evening dresses for women).
      - Gift Registry: The couple is registered at 'everafterregistry.com/olivia-liam'. They appreciate any gesture, but your presence is the greatest gift.
      - RSVP Deadline: September 15, 2024.
      - Parking: Ample free parking is available at the venue.
      - Plus Ones: Invitations will specify if a plus one is included.
      
      Your role is to answer guest questions based *only* on this information. Be polite, concise, and warm in your responses. If a question is outside the scope of the wedding (e.g., 'What is the meaning of life?'), politely decline to answer and state that you are here to help with wedding-related questions for Olivia and Liam's special day.`;
      
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
}
