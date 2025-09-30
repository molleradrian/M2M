import { Component, ChangeDetectionStrategy, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Guest, RsvpStatus } from '../../models/guest.model';
import { GuestService } from '../../services/guest.service';

@Component({
  selector: 'app-guest-list',
  templateUrl: './guest-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, FormsModule]
})
export class GuestListComponent {
  private guestService = inject(GuestService);
  
  guests = this.guestService.guests;

  editingGuest = signal<Guest | null>(null);
  
  // Model for the form
  guestName = signal('');
  guestEmail = signal('');
  guestRsvpStatus = signal<RsvpStatus>('Pending');
  
  rsvpStatuses: RsvpStatus[] = ['Pending', 'Attending', 'Declined'];

  stats = computed(() => {
    const total = this.guests().length;
    const attending = this.guests().filter(g => g.rsvpStatus === 'Attending').length;
    const pending = this.guests().filter(g => g.rsvpStatus === 'Pending').length;
    return { total, attending, pending };
  });

  handleSubmit() {
    if (this.editingGuest()) {
      // Update existing guest
      const updatedGuest: Guest = { 
        ...this.editingGuest()!, 
        name: this.guestName(),
        email: this.guestEmail(),
        rsvpStatus: this.guestRsvpStatus()
      };
      this.guestService.updateGuest(updatedGuest);
    } else {
      // Add new guest
      this.guestService.addGuest({
        name: this.guestName(),
        email: this.guestEmail(),
        rsvpStatus: this.guestRsvpStatus()
      });
    }
    this.resetForm();
  }

  editGuest(guest: Guest) {
    this.editingGuest.set(guest);
    this.guestName.set(guest.name);
    this.guestEmail.set(guest.email);
    this.guestRsvpStatus.set(guest.rsvpStatus);
  }

  deleteGuest(guest: Guest) {
    if (confirm(`Are you sure you want to delete ${guest.name}?`)) {
      this.guestService.deleteGuest(guest.id);
    }
  }

  resetForm() {
    this.editingGuest.set(null);
    this.guestName.set('');
    this.guestEmail.set('');
    this.guestRsvpStatus.set('Pending');
  }

  getStatusClass(status: RsvpStatus) {
    switch (status) {
      case 'Attending': return 'bg-green-100 text-green-800';
      case 'Declined': return 'bg-red-100 text-red-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-stone-100 text-stone-800';
    }
  }
}
