import { Injectable, signal, effect } from '@angular/core';
import { WeddingProfile } from '../models/wedding-profile.model';

@Injectable({
  providedIn: 'root'
})
export class WeddingProfileService {
  private readonly STORAGE_KEY = 'wedding_profile';

  profile = signal<WeddingProfile>(this.loadProfile());

  constructor() {
    effect(() => this.saveProfile());
  }

  private loadProfile(): WeddingProfile {
    if (typeof localStorage !== 'undefined') {
      const profileJson = localStorage.getItem(this.STORAGE_KEY);
      if (profileJson) {
        return JSON.parse(profileJson);
      }
    }
    // Default profile
    return {
      brideName: 'Olivia',
      groomName: 'Liam',
      weddingDate: '2024-10-26',
      venueName: 'Evergreen Gardens',
      venueAddress: '123 Blossom Lane, Napa Valley, CA'
    };
  }

  private saveProfile() {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.profile()));
    }
  }

  updateProfile(newProfile: Partial<WeddingProfile>) {
    this.profile.update(current => ({ ...current, ...newProfile }));
  }
}
