import { Injectable, signal } from '@angular/core';
import { Donation } from '../models/donation.model';

@Injectable({
  providedIn: 'root'
})
export class DonationService {
  donations = signal<Donation[]>([]);
  // In a real app, this service would interact with a backend to process donations.
}
