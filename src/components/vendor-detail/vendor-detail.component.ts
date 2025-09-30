import { Component, ChangeDetectionStrategy, inject, input, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { VendorService } from '../../services/vendor.service';
import { Vendor, VendorCategory, VendorStatus } from '../../models/vendor.model';
import { VendorTasksComponent } from '../vendor-tasks/vendor-tasks.component';

@Component({
  selector: 'app-vendor-detail',
  imports: [CommonModule, RouterLink, VendorTasksComponent],
  templateUrl: './vendor-detail.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VendorDetailComponent {
  id = input.required<string>();

  private vendorService = inject(VendorService);
  
  vendor = computed(() => this.vendorService.vendors().find(v => v.id === this.id()));

  getStatusClass(status: VendorStatus | undefined): string {
    switch (status) {
      case 'Booked': return 'bg-green-100 text-green-800';
      case 'Paid': return 'bg-blue-100 text-blue-800';
      case 'Contacted': return 'bg-yellow-100 text-yellow-800';
      case 'Not Contacted': return 'bg-stone-200 text-stone-700';
      default: return 'bg-stone-100 text-stone-800';
    }
  }

  getCategoryIcon(category: VendorCategory | undefined): string {
    switch (category) {
        case 'Sound': return 'M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.5 4.5m0 0l4.5 4.5M11.25 12.75l4.5-4.5m-4.5 4.5l-4.5-4.5';
        case 'Photography': return 'M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.776 48.776 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z';
        case 'Catering': return 'M5.25 8.25h13.5m-13.5 4.5h13.5m-13.5 4.5h13.5M3 3h18a2.25 2.25 0 012.25 2.25v13.5A2.25 2.25 0 0121 21H3a2.25 2.25 0 01-2.25-2.25V5.25A2.25 2.25 0 013 3z';
        case 'Venue': return 'M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205l3 1m-3-1l-1.5.545m0 0l-1.5-.545m0 0l-1.5.545m0 0l-1.5-.545M6.75 7.364L3 9m0 0l1.5.545M4.5 9.545l1.5.545M4.5 12l1.5.545M4.5 14.455l1.5.545';
        case 'Florist': return 'M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.83-5.83M11.42 15.17l-4.5-4.5M11.42 15.17l-1.06-1.061a1.5 1.5 0 010-2.121l2.12-2.121a1.5 1.5 0 012.12 0l1.061 1.06M11.42 15.17l-2.12-2.121M17.25 21a2.652 2.652 0 002.75-2.75M17.25 21L21 17.25';
        case 'Other': return 'M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5';
        default: return 'M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z';
    }
  }
}
