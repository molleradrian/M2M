import { Component, ChangeDetectionStrategy, signal, computed, inject, effect } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { WeddingProfileService } from '../../services/wedding-profile.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, NgOptimizedImage]
})
export class DashboardComponent {
  private profileService = inject(WeddingProfileService);
  profile = this.profileService.profile;
  
  daysRemaining = signal(0);
  
  constructor() {
    effect(() => this.calculateDaysRemaining());
  }
  
  private calculateDaysRemaining() {
    const weddingDate = new Date(this.profile().weddingDate + 'T00:00:00');
    const today = new Date();
    const timeDiff = weddingDate.getTime() - today.getTime();
    const days = Math.ceil(timeDiff / (1000 * 3600 * 24));
    this.daysRemaining.set(days > 0 ? days : 0);
  }

  stats = [
    { label: 'Invited Guests', value: 150, icon: 'M18 18.72a9.094 9.094 0 00-12 0m12 0a9.094 9.094 0 01-12 0m12 0v-2.67a4.5 4.5 0 00-4.5-4.5H9a4.5 4.5 0 00-4.5 4.5v2.67m12 0A2.25 2.25 0 0115.75 21H8.25A2.25 2.25 0 016 18.72m12 0V11.25a2.25 2.25 0 00-2.25-2.25H8.25A2.25 2.25 0 006 11.25v7.47m12 0a9.094 9.094 0 00-12 0' },
    { label: 'Attending', value: 128, icon: 'M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
    { label: 'Pending RSVP', value: 22, icon: 'M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z' },
  ];
}