import { Component, ChangeDetectionStrategy, input, computed, inject, signal, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GuestService } from '../../services/guest.service';
import { RsvpStatus } from '../../models/guest.model';
import { ScheduleComponent } from '../schedule/schedule.component';
import { GalleryComponent } from '../gallery/gallery.component';
import { GuestbookService } from '../../services/guestbook.service';
import { SharedGalleryService } from '../../services/shared-gallery.service';
import { FamilyTreeComponent } from '../family-tree/family-tree.component';
import { ThankYouNoteService } from '../../services/thank-you-note.service';
import { FeedbackService } from '../../services/feedback.service';

@Component({
  selector: 'app-guest-portal',
  templateUrl: './guest-portal.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, FormsModule, ScheduleComponent, GalleryComponent, FamilyTreeComponent]
})
export class GuestPortalComponent {
  guestId = input.required<string>();
  isPlannerView = input<boolean>(false);
  
  private guestService = inject(GuestService);
  private guestbookService = inject(GuestbookService);
  private sharedGalleryService = inject(SharedGalleryService);
  private thankYouNoteService = inject(ThankYouNoteService);
  private feedbackService = inject(FeedbackService);

  guest = computed(() => this.guestService.getGuestById(this.guestId()));
  guestbookMessages = this.guestbookService.messages;
  newMessage = signal('');
  
  sharedImages = this.sharedGalleryService.images;
  isUploading = signal(false);
  selectedFile = signal<File | null>(null);
  previewUrl = signal<string | null>(null);
  selectedSharedImageUrl = signal<string | null>(null);

  traveledFrom = signal('');
  travelInfoSaved = signal(false);

  thankYouNote = signal('');
  sentNote = computed(() => this.thankYouNoteService.getNoteForGuest(this.guestId()));
  
  feedbackText = signal('');
  submittedFeedback = computed(() => this.feedbackService.getFeedbackForGuest(this.guestId()));
  isAfterWedding = signal(new Date() > new Date('2024-10-26T23:59:59'));

  constructor() {
    effect(() => {
      this.traveledFrom.set(this.guest()?.traveledFrom ?? '');
    });
  }

  weddingDetails = [
    {
      title: 'Dress Code',
      description: 'Formal Attire. Think suits for men and cocktail or evening dresses for women.',
      icon: 'M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.898 20.562L16.25 22.5l-.648-1.938a3.375 3.375 0 00-2.456-2.456L11.25 18l1.938-.648a3.375 3.375 0 002.456-2.456L16.25 13l.648 1.938a3.375 3.375 0 002.456 2.456L21 18l-1.938.648a3.375 3.375 0 00-2.456 2.456z'
    },
    {
      title: 'Parking',
      description: 'Ample free parking is available for all guests at the venue.',
      icon: 'M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.125-.504 1.125-1.125V14.25m-17.25 4.5v-1.875a3.375 3.375 0 013.375-3.375h9.75a3.375 3.375 0 013.375 3.375v1.875m-16.5-12.75h9.75a1.125 1.125 0 011.125 1.125V9.75M8.25 21h8.25'
    }
  ];

  updateRsvp(status: RsvpStatus) {
    const currentGuest = this.guest();
    if (currentGuest) {
      this.guestService.updateGuest({ ...currentGuest, rsvpStatus: status });
    }
  }

  updateTravelInfo() {
    const currentGuest = this.guest();
    if (currentGuest) {
      this.guestService.updateGuest({ ...currentGuest, traveledFrom: this.traveledFrom().trim() });
      this.travelInfoSaved.set(true);
      setTimeout(() => this.travelInfoSaved.set(false), 2000);
    }
  }

  addMessage() {
    const message = this.newMessage().trim();
    const currentGuest = this.guest();
    if (message && currentGuest) {
      this.guestbookService.addMessage({
        guestId: currentGuest.id,
        guestName: currentGuest.name,
        message: message,
      });
      this.newMessage.set('');
    }
  }
  
  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      this.selectedFile.set(file);

      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.previewUrl.set(e.target.result);
      };
      reader.readAsDataURL(file);
      
      input.value = '';
    }
  }

  cancelUpload() {
    this.selectedFile.set(null);
    this.previewUrl.set(null);
  }

  uploadPhoto() {
    const file = this.selectedFile();
    if (!file) return;

    const reader = new FileReader();
    this.isUploading.set(true);

    reader.onload = (e: any) => {
      const currentGuest = this.guest();
      if (currentGuest) {
        this.sharedGalleryService.addImage({
          guestId: currentGuest.id,
          guestName: currentGuest.name,
          imageDataUrl: e.target.result,
        });
      }
      this.isUploading.set(false);
      this.cancelUpload();
    };
    
    reader.onerror = error => {
      console.error('Error reading file:', error);
      this.isUploading.set(false);
    };

    reader.readAsDataURL(file);
  }

  viewSharedImage(url: string) {
    this.selectedSharedImageUrl.set(url);
  }

  closeSharedImageModal() {
    this.selectedSharedImageUrl.set(null);
  }

  sendThankYouNote() {
    const note = this.thankYouNote().trim();
    const currentGuest = this.guest();
    if (note && currentGuest) {
      this.thankYouNoteService.addNote({
        guestId: currentGuest.id,
        note: note,
      });
      this.thankYouNote.set('');
    }
  }

  submitFeedback() {
    const message = this.feedbackText().trim();
    const currentGuest = this.guest();
    if (message && currentGuest) {
      this.feedbackService.addFeedback({
        guestId: currentGuest.id,
        guestName: currentGuest.name,
        message: message,
      });
      this.feedbackText.set('');
    }
  }
}
