import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-donations',
  imports: [CommonModule],
  template: `
    <div class="bg-white p-6 rounded-lg shadow-md">
      <h2 class="text-2xl font-semibold text-stone-700 mb-4">Donations</h2>
      <p class="text-stone-500">This feature is not yet implemented.</p>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DonationsComponent {}
