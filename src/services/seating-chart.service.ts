import { Injectable, signal, computed, inject } from '@angular/core';
import { SeatingTable, SeatingAssignment } from '../models/seating-chart.model';
import { GuestService } from './guest.service';

@Injectable({
  providedIn: 'root'
})
export class SeatingChartService {
  private guestService = inject(GuestService);
  private readonly TABLE_STORAGE_KEY = 'm2m_seating_tables';
  private readonly ASSIGNMENT_STORAGE_KEY = 'm2m_seating_assignments';
  
  tables = signal<SeatingTable[]>(this.loadTables());
  assignments = signal<SeatingAssignment>(this.loadAssignments());

  attendingGuests = computed(() => this.guestService.guests().filter(g => g.rsvpStatus === 'Attending'));

  assignedGuestIds = computed(() => {
    const assignedIds = new Set<string>();
    Object.values(this.assignments()).forEach(guestIds => {
      // FIX: Cast `guestIds` to `string[]` because `Object.values()` on an object with
      // an index signature returns `unknown[]`, so we must assert the correct type.
      (guestIds as string[]).forEach(id => assignedIds.add(id));
    });
    return assignedIds;
  });

  unassignedGuests = computed(() => {
    const assignedIds = this.assignedGuestIds();
    return this.attendingGuests().filter(g => !assignedIds.has(g.id));
  });

  constructor() { }

  private loadTables(): SeatingTable[] {
    if (typeof localStorage !== 'undefined') {
      const tablesJson = localStorage.getItem(this.TABLE_STORAGE_KEY);
      if (tablesJson) return JSON.parse(tablesJson);
    }
    return Array.from({ length: 10 }, (_, i) => ({
      id: `table-${i + 1}`,
      name: `Table ${i + 1}`,
      capacity: 8,
      shape: 'round'
    }));
  }

  private loadAssignments(): SeatingAssignment {
     if (typeof localStorage !== 'undefined') {
      const assignmentsJson = localStorage.getItem(this.ASSIGNMENT_STORAGE_KEY);
      if (assignmentsJson) return JSON.parse(assignmentsJson);
    }
    return {};
  }

  private saveState() {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(this.TABLE_STORAGE_KEY, JSON.stringify(this.tables()));
      localStorage.setItem(this.ASSIGNMENT_STORAGE_KEY, JSON.stringify(this.assignments()));
    }
  }
  
  assignGuestToTable(guestId: string, tableId: string) {
    this.assignments.update(current => {
      const newAssignments = { ...current };
      // Remove from any previous table first
      for (const tId in newAssignments) {
        newAssignments[tId] = newAssignments[tId].filter(gId => gId !== guestId);
      }

      // Add to new table
      if (!newAssignments[tableId]) {
        newAssignments[tableId] = [];
      }
      const table = this.tables().find(t => t.id === tableId);
      if (table && newAssignments[tableId].length < table.capacity) {
        newAssignments[tableId].push(guestId);
      }
      return newAssignments;
    });
    this.saveState();
  }

  unassignGuest(guestId: string) {
     this.assignments.update(current => {
      const newAssignments = { ...current };
      for (const tId in newAssignments) {
        newAssignments[tId] = newAssignments[tId].filter(gId => gId !== guestId);
      }
      return newAssignments;
    });
    this.saveState();
  }
}
