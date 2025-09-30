import { Component, ChangeDetectionStrategy, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GuestService } from '../../services/guest.service';
import { Guest } from '../../models/guest.model';

@Component({
  selector: 'app-invite-links',
  templateUrl: './invite-links.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
})
export class InviteLinksComponent {
  private guestService = inject(GuestService);
  guests = this.guestService.guests;
  
  copiedLinkId = signal<string | null>(null);

  getInviteLink(guestId: string): string {
    const baseUrl = window.location.origin + window.location.pathname;
    return `${baseUrl}#/guest/${guestId}`;
  }

  getPlannerViewLink(guestId: string): string {
    const baseUrl = window.location.origin + window.location.pathname;
    return `${baseUrl}#/guest/${guestId}?as=planner`;
  }

  openPlannerView(guestId: string) {
    window.open(this.getPlannerViewLink(guestId), '_blank');
  }

  copyLink(guest: Guest) {
    const link = this.getInviteLink(guest.id);
    navigator.clipboard.writeText(link).then(() => {
      this.copiedLinkId.set(guest.id);
      setTimeout(() => {
        if (this.copiedLinkId() === guest.id) {
            this.copiedLinkId.set(null);
        }
      }, 2000);
    }).catch(err => {
      console.error('Failed to copy link: ', err);
    });
  }
}
