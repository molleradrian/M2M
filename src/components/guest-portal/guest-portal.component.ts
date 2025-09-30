import { Component, ChangeDetectionStrategy, input, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { GuestService } from '../../services/guest.service';
import { WeddingProfileService } from '../../services/wedding-profile.service';
import { GuestRequestService } from '../../services/guest-request.service';
import { ScheduleComponent } from '../schedule/schedule.component';
import { MenuComponent } from '../menu/menu.component';
import { GalleryComponent } from '../gallery/gallery.component';
import { GuestbookComponent } from '../guestbook/guestbook.component';

@Component({
  selector: 'app-guest-portal',
  imports: [
    CommonModule,
    ScheduleComponent,
    MenuComponent,
    GalleryComponent,
    ReactiveFormsModule,
    GuestbookComponent,
  ],
  templateUrl: './guest-portal.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GuestPortalComponent {
  guestId = input.required<string>();

  private guestService = inject(GuestService);
  private profileService = inject(WeddingProfileService);
  private guestRequestService = inject(GuestRequestService);
  private fb = inject(FormBuilder);

  guest = computed(() => this.guestService.getGuestById(this.guestId()));
  profile = this.profileService.profile;
  requestStatus = signal<'idle' | 'submitted'>('idle');

  requestForm = this.fb.group({
    type: ['Song', Validators.required],
    content: ['', [Validators.required, Validators.maxLength(200)]]
  });

  weddingDate = computed(() => {
    return new Date(this.profile().weddingDate + 'T00:00:00').toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
  });

  daysRemaining = computed(() => {
    const weddingDate = new Date(this.profile().weddingDate + 'T00:00:00');
    const today = new Date();
    const timeDiff = weddingDate.getTime() - today.getTime();
    const days = Math.ceil(timeDiff / (1000 * 3600 * 24));
    return days > 0 ? days : 0;
  });

  submitRequest() {
    if (this.requestForm.invalid || !this.guest()) return;

    this.guestRequestService.addRequest({
      guestId: this.guest()!.id,
      guestName: this.guest()!.name,
      type: this.requestForm.value.type as any,
      content: this.requestForm.value.content!,
    });
    
    this.requestStatus.set('submitted');
    this.requestForm.reset({ type: 'Song', content: ''});

    setTimeout(() => this.requestStatus.set('idle'), 4000);
  }

  getStatusClass(status: string) {
    switch (status) {
      case 'Attending': return 'bg-green-100 text-green-800';
      case 'Declined': return 'bg-red-100 text-red-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-stone-100 text-stone-800';
    }
  }
}
