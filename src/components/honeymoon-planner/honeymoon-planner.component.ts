import { Component, ChangeDetectionStrategy, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GeminiService } from '../../services/gemini.service';

@Component({
  selector: 'app-honeymoon-planner',
  templateUrl: './honeymoon-planner.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, FormsModule]
})
export class HoneymoonPlannerComponent {
  private geminiService = inject(GeminiService);

  prompt = signal('A relaxing and romantic beach vacation with great food.');
  ideas = signal<any[] | null>(null);
  isLoading = signal(false);
  error = signal<string | null>(null);
  
  async getIdeas() {
    if (!this.prompt().trim()) return;

    this.isLoading.set(true);
    this.error.set(null);
    this.ideas.set(null);

    try {
      const response = await this.geminiService.getHoneymoonIdeas(this.prompt());
      if (response.error) {
        this.error.set(response.error);
      } else {
        this.ideas.set(response.destinations);
      }
    } catch (e) {
      console.error(e);
      this.error.set('An unexpected error occurred. Please try again.');
    } finally {
      this.isLoading.set(false);
    }
  }
}
