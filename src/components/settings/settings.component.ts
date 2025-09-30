import { Component, ChangeDetectionStrategy, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { WeddingProfileService } from '../../services/wedding-profile.service';
import { WeddingProfile } from '../../models/wedding-profile.model';

@Component({
  selector: 'app-settings',
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 class="text-2xl font-semibold text-stone-700 mb-6">Wedding Details</h2>
      
      <form [formGroup]="profileForm" (ngSubmit)="saveProfile()" class="space-y-4">
        <div>
          <label for="brideName" class="block text-sm font-medium text-stone-600">Bride's Name</label>
          <input type="text" id="brideName" formControlName="brideName"
                 class="mt-1 block w-full px-3 py-2 bg-white border border-stone-300 rounded-md shadow-sm placeholder-stone-400 focus:outline-none focus:ring-rose-500 focus:border-rose-500 sm:text-sm">
        </div>
        <div>
          <label for="groomName" class="block text-sm font-medium text-stone-600">Groom's Name</label>
          <input type="text" id="groomName" formControlName="groomName"
                 class="mt-1 block w-full px-3 py-2 bg-white border border-stone-300 rounded-md shadow-sm placeholder-stone-400 focus:outline-none focus:ring-rose-500 focus:border-rose-500 sm:text-sm">
        </div>
        <div>
          <label for="weddingDate" class="block text-sm font-medium text-stone-600">Wedding Date</label>
          <input type="date" id="weddingDate" formControlName="weddingDate"
                 class="mt-1 block w-full px-3 py-2 bg-white border border-stone-300 rounded-md shadow-sm placeholder-stone-400 focus:outline-none focus:ring-rose-500 focus:border-rose-500 sm:text-sm">
        </div>
        <div>
          <label for="venueName" class="block text-sm font-medium text-stone-600">Venue Name</label>
          <input type="text" id="venueName" formControlName="venueName"
                 class="mt-1 block w-full px-3 py-2 bg-white border border-stone-300 rounded-md shadow-sm placeholder-stone-400 focus:outline-none focus:ring-rose-500 focus:border-rose-500 sm:text-sm">
        </div>
         <div>
          <label for="venueAddress" class="block text-sm font-medium text-stone-600">Venue Address</label>
          <input type="text" id="venueAddress" formControlName="venueAddress"
                 class="mt-1 block w-full px-3 py-2 bg-white border border-stone-300 rounded-md shadow-sm placeholder-stone-400 focus:outline-none focus:ring-rose-500 focus:border-rose-500 sm:text-sm">
        </div>

        <div class="pt-4 flex justify-end items-center gap-4">
          @if (saveStatus() === 'saved') {
            <p class="text-sm text-green-600">✓ Saved successfully!</p>
          }
          <button type="submit" [disabled]="profileForm.invalid || profileForm.pristine"
                  class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-rose-600 hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500 disabled:bg-stone-400 disabled:cursor-not-allowed">
            Save Changes
          </button>
        </div>
      </form>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsComponent {
  private profileService = inject(WeddingProfileService);
  private fb = inject(FormBuilder);
  
  saveStatus = signal<'idle' | 'saved'>('idle');
  
  profileForm = this.fb.group({
      brideName: ['', Validators.required],
      groomName: ['', Validators.required],
      weddingDate: ['', Validators.required],
      venueName: ['', Validators.required],
      venueAddress: ['', Validators.required]
  });
  
  constructor() {
    this.profileForm.patchValue(this.profileService.profile());
  }

  saveProfile() {
    if (this.profileForm.invalid || this.profileForm.pristine) {
      return;
    }
    this.profileService.updateProfile(this.profileForm.value as Partial<WeddingProfile>);
    this.saveStatus.set('saved');
    this.profileForm.markAsPristine();
    
    setTimeout(() => {
      this.saveStatus.set('idle');
    }, 3000);
  }
}