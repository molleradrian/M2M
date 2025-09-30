import { Component, ChangeDetectionStrategy, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SeatingChartService } from '../../services/seating-chart.service';
import { GuestService } from '../../services/guest.service';

@Component({
  selector: 'app-seating-chart',
  templateUrl: './seating-chart.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule]
})
export class SeatingChartComponent {
  private seatingService = inject(SeatingChartService);
  private guestService = inject(GuestService);

  tables = this.seatingService.tables;
  assignments = this.seatingService.assignments;
  unassignedGuests = this.seatingService.unassignedGuests;

  dragOverTableId = signal<string | null>(null);

  getGuestById = this.guestService.getGuestById.bind(this.guestService);

  onDragStart(event: DragEvent, guestId: string) {
    event.dataTransfer?.setData('text/plain', guestId);
  }

  onDragOver(event: DragEvent) {
    event.preventDefault(); // Necessary to allow drop
  }

  onDragEnterTable(tableId: string) {
    this.dragOverTableId.set(tableId);
  }

  onDragLeaveTable() {
    this.dragOverTableId.set(null);
  }

  onDropOnTable(event: DragEvent, tableId: string) {
    event.preventDefault();
    const guestId = event.dataTransfer?.getData('text/plain');
    if (guestId) {
      this.seatingService.assignGuestToTable(guestId, tableId);
    }
    this.dragOverTableId.set(null);
  }

  onDropOnUnassigned(event: DragEvent) {
    event.preventDefault();
    const guestId = event.dataTransfer?.getData('text/plain');
    if (guestId) {
      this.seatingService.unassignGuest(guestId);
    }
  }
}