import { Injectable, signal } from '@angular/core';
import { Feedback } from '../models/feedback.model';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {
  private readonly STORAGE_KEY = 'wedding_feedback';
  
  feedbackEntries = signal<Feedback[]>([]);

  constructor() {
    this.loadFeedback();
  }

  private loadFeedback() {
    if (typeof localStorage !== 'undefined') {
      const feedbackJson = localStorage.getItem(this.STORAGE_KEY);
      if (feedbackJson) {
        const parsedFeedback: Feedback[] = JSON.parse(feedbackJson, (key, value) => {
          if (key === 'submittedAt' && value) {
            return new Date(value);
          }
          return value;
        });
        this.feedbackEntries.set(parsedFeedback);
      }
    }
  }

  private saveFeedback() {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.feedbackEntries()));
    }
  }

  addFeedback(entry: Omit<Feedback, 'id' | 'submittedAt'>) {
    const newFeedback: Feedback = { 
        ...entry, 
        id: crypto.randomUUID(),
        submittedAt: new Date()
    };
    this.feedbackEntries.update(entries => [...entries, newFeedback]);
    this.saveFeedback();
  }

  getFeedbackForGuest(guestId: string): Feedback | undefined {
    return this.feedbackEntries().find(f => f.guestId === guestId);
  }
}
