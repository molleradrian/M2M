import { Component, ChangeDetectionStrategy, inject, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { GuestbookService } from '../../services/guestbook.service';
import { Guest } from '../../models/guest.model';

@Component({
  selector: 'app-guestbook',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './guestbook.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GuestbookComponent {
  guest = input.required<Guest>();
  private guestbookService = inject(GuestbookService);
  private fb = inject(FormBuilder);

  messages = this.guestbookService.messages;
  
  messageForm = this.fb.group({
    message: ['', [Validators.required, Validators.maxLength(500)]]
  });

  submitMessage() {
    if (this.messageForm.invalid) return;
    const currentGuest = this.guest();
    if (!currentGuest) return;

    this.guestbookService.addMessage({
      guestId: currentGuest.id,
      guestName: currentGuest.name,
      message: this.messageForm.value.message!,
    });
    
    this.messageForm.reset();
  }
}
