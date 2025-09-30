import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GuestRequestService } from '../../services/guest-request.service';
import { GuestRequest } from '../../models/guest-request.model';

@Component({
  selector: 'app-guest-requests',
  imports: [CommonModule],
  templateUrl: './guest-requests.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GuestRequestsComponent {
  private requestService = inject(GuestRequestService);
  requests = this.requestService.requests;

  updateStatus(request: GuestRequest, event: Event) {
    const newStatus = (event.target as HTMLSelectElement).value as GuestRequest['status'];
    this.requestService.updateRequestStatus(request.id, newStatus);
  }

  getStatusClass(status: GuestRequest['status']) {
    switch (status) {
      case 'Completed': return 'bg-green-100 text-green-800';
      case 'Acknowledged': return 'bg-blue-100 text-blue-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-stone-100 text-stone-800';
    }
  }

  getIconForType(type: GuestRequest['type']) {
    switch (type) {
      case 'Song': return 'M9 9l10.5-3m0 6.553v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 11-.99-3.467l2.31-.66a2.25 2.25 0 001.632-2.163zm0 0V7.5A2.25 2.25 0 0013.5 5.25h-3A2.25 2.25 0 008.25 7.5v3.75m0 0v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 01-.99-3.467l2.31-.66A2.25 2.25 0 009 15.75z';
      case 'Dietary': return 'M5.25 8.25h13.5m-13.5 4.5h13.5m-13.5 4.5h13.5M3 3h18a2.25 2.25 0 012.25 2.25v13.5A2.25 2.25 0 0121 21H3a2.25 2.25 0 01-2.25-2.25V5.25A2.25 2.25 0 013 3z';
      case 'Other': return 'M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z';
    }
  }
}