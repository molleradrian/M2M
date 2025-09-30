import { Injectable, signal } from '@angular/core';
import { ThankYouNote } from '../models/thank-you-note.model';

@Injectable({
  providedIn: 'root'
})
export class ThankYouNoteService {
  private readonly STORAGE_KEY = 'wedding_thank_you_notes';
  
  notes = signal<ThankYouNote[]>([]);

  constructor() {
    this.loadNotes();
  }

  private loadNotes() {
    if (typeof localStorage !== 'undefined') {
      const notesJson = localStorage.getItem(this.STORAGE_KEY);
      if (notesJson) {
        const parsedNotes: ThankYouNote[] = JSON.parse(notesJson, (key, value) => {
          if (key === 'sentAt' && value) {
            return new Date(value);
          }
          return value;
        });
        this.notes.set(parsedNotes);
      }
    }
  }

  private saveNotes() {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.notes()));
    }
  }

  addNote(note: Omit<ThankYouNote, 'id' | 'sentAt'>) {
    const newNote: ThankYouNote = { 
        ...note, 
        id: crypto.randomUUID(),
        sentAt: new Date()
    };
    this.notes.update(notes => [...notes, newNote]);
    this.saveNotes();
  }

  getNoteForGuest(guestId: string): ThankYouNote | undefined {
    return this.notes().find(n => n.guestId === guestId);
  }
}
