import { Injectable, signal } from '@angular/core';
import { GuestbookEntry } from '../models/guestbook.model';

@Injectable({
  providedIn: 'root'
})
export class GuestbookService {
  private readonly STORAGE_KEY = 'wedding_guestbook';
  
  messages = signal<GuestbookEntry[]>([]);

  constructor() {
    this.loadMessages();
  }

  private loadMessages() {
    if (typeof localStorage !== 'undefined') {
      const messagesJson = localStorage.getItem(this.STORAGE_KEY);
      if (messagesJson) {
        const parsedMessages: GuestbookEntry[] = JSON.parse(messagesJson, (key, value) => {
          if (key === 'createdAt' && value) {
            return new Date(value);
          }
          return value;
        });
        // Sort by date, newest first
        this.messages.set(parsedMessages.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime()));
      }
    }
  }

  private saveMessages() {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.messages()));
    }
  }

  addMessage(entry: Omit<GuestbookEntry, 'id' | 'createdAt'>) {
    const newEntry: GuestbookEntry = { 
        ...entry, 
        id: crypto.randomUUID(),
        createdAt: new Date()
    };
    this.messages.update(messages => [newEntry, ...messages]); // Prepend new message
    this.saveMessages();
  }
}
