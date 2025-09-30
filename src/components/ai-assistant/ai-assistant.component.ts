import { Component, ChangeDetectionStrategy, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GeminiService } from '../../services/gemini.service';
import { ChatMessage } from '../../models/chat.model';

@Component({
  selector: 'app-ai-assistant',
  templateUrl: './ai-assistant.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, FormsModule]
})
export class AiAssistantComponent {
  private geminiService = inject(GeminiService);

  userInput = signal('');
  messages = signal<ChatMessage[]>([
    { sender: 'ai', text: 'Hello! I am The Co-Ordinator, the virtual assistant for Olivia and Liam\'s wedding. How can I help you today?' }
  ]);
  isLoading = signal(false);
  
  predefinedQuestions = [
    'What is the dress code?',
    'Where is the wedding?',
    'What time does the ceremony start?',
    'Is there a gift registry?',
  ];

  async sendMessage(question?: string) {
    const messageText = question || this.userInput().trim();
    if (!messageText) return;

    // Add user message to chat
    this.messages.update(m => [...m, { sender: 'user', text: messageText }]);
    this.userInput.set('');
    this.isLoading.set(true);

    // Get AI response
    try {
      const aiResponse = await this.geminiService.getAssistance(messageText);
      this.messages.update(m => [...m, { sender: 'ai', text: aiResponse }]);
    } catch (error) {
      this.messages.update(m => [...m, { sender: 'ai', text: 'Sorry, I encountered an error. Please try again.' }]);
    } finally {
      this.isLoading.set(false);
    }
  }

  formatMessage(text: string): string {
    return text.replace(/\n/g, '<br>');
  }
}