import { Component, ChangeDetectionStrategy, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { VendorDiscoveryService } from '../../services/vendor-discovery.service';
import { DiscoveredVendor, VendorCategory } from '../../models/vendor-discovery.model';

@Component({
  selector: 'app-vendor-discovery',
  imports: [CommonModule, FormsModule],
  templateUrl: './vendor-discovery.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VendorDiscoveryComponent implements OnInit {
  private vendorDiscoveryService = inject(VendorDiscoveryService);

  searchQuery = signal('');
  categoryFilter = signal<VendorCategory | 'All'>('All');
  
  vendors = signal<DiscoveredVendor[]>([]);
  isLoading = signal(false);
  invoiceStatus = signal<{[vendorId: string]: 'idle' | 'requested'}>({});

  categories: VendorCategory[] = ['Photography', 'Catering', 'Florist', 'Venue', 'Transport', 'Sound', 'Other'];

  ngOnInit() {
    this.search();
  }

  async search() {
    this.isLoading.set(true);
    const results = await this.vendorDiscoveryService.searchVendors(this.searchQuery(), this.categoryFilter());
    this.vendors.set(results);
    this.isLoading.set(false);
  }

  requestInvoice(vendor: DiscoveredVendor) {
    this.invoiceStatus.update(s => ({ ...s, [vendor.id]: 'requested' }));
    // In a real app, this would trigger a backend service call.
    alert(`An invoice request has been sent to ${vendor.name}.`);
  }
}