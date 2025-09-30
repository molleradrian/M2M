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
      } else {
        this.initializeWithSampleData();
      }
    }
  }

  private saveGuests() {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.guests()));
    }
  }
  
  private initializeWithSampleData() {
    const sampleGuests: Guest[] = [
      // Olivia's Family
      { id: 'o1', name: 'Eleanor Vance', email: 'eleanor@example.com', rsvpStatus: 'Attending', side: 'Olivia', parentId: null, traveledFrom: 'London, UK' },
      { id: 'o2', name: 'Richard Vance', email: 'richard@example.com', rsvpStatus: 'Attending', side: 'Olivia', parentId: null, traveledFrom: 'London, UK' },
      { id: 'o3', name: 'Olivia Vance', email: 'olivia@example.com', rsvpStatus: 'Attending', side: 'Olivia', parentId: 'o1' },
      { id: 'o4', name: 'James Vance', email: 'james@example.com', rsvpStatus: 'Attending', side: 'Olivia', parentId: 'o1', traveledFrom: 'New York, USA' },
      { id: 'o5', name: 'Chloe (James\'s wife)', email: 'chloe@example.com', rsvpStatus: 'Attending', side: 'Olivia', parentId: 'o4' },
      
      // Liam's Family
      { id: 'l1', name: 'Michael O\'Sullivan', email: 'michael@example.com', rsvpStatus: 'Attending', side: 'Liam', parentId: null, traveledFrom: 'Dublin, Ireland' },
      { id: 'l2', name: 'Fiona O\'Sullivan', email: 'fiona@example.com', rsvpStatus: 'Attending', side: 'Liam', parentId: null, traveledFrom: 'Dublin, Ireland' },
      { id: 'l3', name: 'Liam O\'Sullivan', email: 'liam@example.com', rsvpStatus: 'Attending', side: 'Liam', parentId: 'l1' },
      { id: 'l4', name: 'Aoife O\'Sullivan', email: 'aoife@example.com', rsvpStatus: 'Attending', side: 'Liam', parentId: 'l1', traveledFrom: 'Sydney, Australia' },

      // Friends
      { id: 'f1', name: 'Sophia Rossi', email: 'sophia@example.com', rsvpStatus: 'Attending', side: 'Olivia', parentId: null, traveledFrom: 'Rome, Italy' },
      { id: 'f2', name: 'Kenji Tanaka', email: 'kenji@example.com', rsvpStatus: 'Attending', side: 'Liam', parentId: null, traveledFrom: 'Tokyo, Japan' },
      { id: 'f3', name: 'Isabelle Dubois', email: 'isabelle@example.com', rsvpStatus: 'Declined', side: 'Olivia', parentId: null, traveledFrom: 'Paris, France' },
       { id: 'f4', name: 'Mateo Garcia', email: 'mateo@example.com', rsvpStatus: 'Attending', side: 'Liam', parentId: null, traveledFrom: 'Madrid, Spain' },
    ];
    this.guests.set(sampleGuests);
    this.saveGuests();
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