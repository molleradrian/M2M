import { Injectable, signal } from '@angular/core';
import { Guest } from '../models/guest.model';

@Injectable({
  providedIn: 'root'
})
export class GuestService {
  private readonly STORAGE_KEY = 'wedding_guest_list';
  
  guests = signal<Guest[]>([]);

  constructor() {
    this.loadGuests();
  }

  private loadGuests() {
    if (typeof localStorage !== 'undefined') {
      const guestsJson = localStorage.getItem(this.STORAGE_KEY);
      if (guestsJson) {
        this.guests.set(JSON.parse(guestsJson));
      }
    }
  }

  private saveGuests() {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.guests()));
    }
  }

  addGuest(guest: Omit<Guest, 'id'>) {
    const newGuest: Guest = { ...guest, id: crypto.randomUUID() };
    this.guests.update(guests => [...guests, newGuest]);
    this.saveGuests();
  }
  
  updateGuest(updatedGuest: Guest) {
    this.guests.update(guests => 
      guests.map(g => g.id === updatedGuest.id ? updatedGuest : g)
    );
    this.saveGuests();
  }

  deleteGuest(guestId: string) {
    this.guests.update(guests => guests.filter(g => g.id !== guestId));
    this.saveGuests();
  }

  getGuestById(id: string): Guest | undefined {
    return this.guests().find(g => g.id === id);
  }
}