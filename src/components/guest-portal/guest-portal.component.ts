import { Component, ChangeDetectionStrategy, input, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GuestService } from '../../services/guest.service';
import { RsvpStatus } from '../../models/guest.model';
import { ScheduleComponent } from '../schedule/schedule.component';
import { GalleryComponent } from '../gallery/gallery.component';

@Component({
  selector: 'app-guest-portal',
  template: `
    @if (guest(); as currentGuest) {
      <div class="min-h-screen bg-stone-50 text-stone-800 p-4 sm:p-6 lg:p-8">
        <div class="max-w-4xl mx-auto">
          <header class="text-center mb-12">
            <h1 class="text-4xl font-serif text-stone-700">Olivia & Liam's Wedding</h1>
            <p class="text-lg text-stone-500 mt-2">Welcome, {{ currentGuest.name }}!</p>
          </header>

          <div class="bg-white p-6 rounded-lg shadow-md mb-8">
            <h2 class="text-2xl font-semibold text-stone-700 mb-4">Your Invitation</h2>
            <p class="mb-4">We are so excited to invite you to celebrate our special day with us. Please let us know if you can make it by updating your RSVP status below.</p>
            
            <div class="flex items-center justify-center space-x-4">
              <button 
                (click)="updateRsvp('Attending')"
                [class]="'px-6 py-2 rounded-md font-semibold transition ' + (currentGuest.rsvpStatus === 'Attending' ? 'bg-green-500 text-white shadow-lg' : 'bg-green-100 text-green-800 hover:bg-green-200')">
                Joyfully Attending
              </button>
              <button 
                (click)="updateRsvp('Declined')"
                [class]="'px-6 py-2 rounded-md font-semibold transition ' + (currentGuest.rsvpStatus === 'Declined' ? 'bg-red-500 text-white shadow-lg' : 'bg-red-100 text-red-800 hover:bg-red-200')">
                Regretfully Decline
              </button>
            </div>

            @if (currentGuest.rsvpStatus === 'Attending') {
              <p class="text-center mt-4 text-green-700 font-medium">Thank you! We can't wait to see you there!</p>
            }
            @if (currentGuest.rsvpStatus === 'Declined') {
              <p class="text-center mt-4 text-red-700 font-medium">We're so sorry you can't make it. You will be missed!</p>
            }
          </div>
          
          <div class="mb-8">
            <app-schedule></app-schedule>
          </div>

          <div>
            <app-gallery></app-gallery>
          </div>

          <footer class="text-center mt-12 text-stone-500">
            <p>Saturday, October 26, 2024</p>
            <p>Evergreen Gardens, Napa Valley, CA</p>
          </footer>
        </div>
      </div>
    } @else {
      <div class="flex items-center justify-center h-screen bg-stone-50">
        <div class="text-center">
          <h2 class="text-2xl font-semibold text-stone-700 mb-4">Invitation Not Found</h2>
          <p class="text-stone-500">We couldn't find an invitation with this link. Please check the link or contact the couple.</p>
        </div>
      </div>
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, ScheduleComponent, GalleryComponent]
})
export class GuestPortalComponent {
  guestId = input.required<string>();
  
  private guestService = inject(GuestService);

  guest = computed(() => this.guestService.getGuestById(this.guestId()));

  updateRsvp(status: RsvpStatus) {
    const currentGuest = this.guest();
    if (currentGuest) {
      this.guestService.updateGuest({ ...currentGuest, rsvpStatus: status });
    }
  }
}
