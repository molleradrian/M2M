import { Component, ChangeDetectionStrategy, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Guest, RsvpStatus } from '../../models/guest.model';
import { GuestService } from '../../services/guest.service';

@Component({
  selector: 'app-guest-list',
  templateUrl: './guest-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, ReactiveFormsModule]
})
export class GuestListComponent {
  private guestService = inject(GuestService);
  private fb = inject(FormBuilder);
  
  guests = this.guestService.guests;
  editingGuest = signal<Guest | null>(null);
  rsvpStatuses: RsvpStatus[] = ['Pending', 'Attending', 'Declined'];

  guestForm = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    rsvpStatus: ['Pending' as RsvpStatus, Validators.required]
  });

  stats = computed(() => {
    const total = this.guests().length;
    const attending = this.guests().filter(g => g.rsvpStatus === 'Attending').length;
    const pending = this.guests().filter(g => g.rsvpStatus === 'Pending').length;
    return { total, attending, pending };
  });

  handleSubmit() {
    if (this.guestForm.invalid) return;

    if (this.editingGuest()) {
      const updatedGuest: Guest = { 
        ...this.editingGuest()!, 
        ...(this.guestForm.value as Partial<Guest>)
      };
      this.guestService.updateGuest(updatedGuest);
    } else {
      this.guestService.addGuest(this.guestForm.value as Omit<Guest, 'id'>);
    }
    this.resetForm();
  }

  editGuest(guest: Guest) {
    this.editingGuest.set(guest);
    this.guestForm.patchValue({
      name: guest.name,
      email: guest.email,
      rsvpStatus: guest.rsvpStatus
    });
  }

  deleteGuest(guest: Guest) {
    if (confirm(`Are you sure you want to delete ${guest.name}?`)) {
      this.guestService.deleteGuest(guest.id);
    }
  }

  resetForm() {
    this.editingGuest.set(null);
    this.guestForm.reset({
      name: '',
      email: '',
      rsvpStatus: 'Pending'
    });
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