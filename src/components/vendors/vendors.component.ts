import { Component, ChangeDetectionStrategy, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Vendor, VendorCategory, VendorStatus } from '../../models/vendor.model';
import { VendorService } from '../../services/vendor.service';

@Component({
  selector: 'app-vendors',
  templateUrl: './vendors.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, ReactiveFormsModule, RouterLink]
})
export class VendorsComponent {
  private vendorService = inject(VendorService);
  private fb = inject(FormBuilder);
  
  vendors = this.vendorService.vendors;

  editingVendor = signal<Vendor | null>(null);
  
  categories: VendorCategory[] = ['Sound', 'Photography', 'Catering', 'Venue', 'Florist', 'Other'];
  statuses: VendorStatus[] = ['Not Contacted', 'Contacted', 'Booked', 'Paid'];

  vendorForm = this.fb.group({
    name: ['', Validators.required],
    category: ['Sound' as VendorCategory, Validators.required],
    contactPerson: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phone: [''],
    status: ['Not Contacted' as VendorStatus, Validators.required],
  });

  handleSubmit() {
    if (this.vendorForm.invalid) return;

    if (this.editingVendor()) {
      const updatedVendor: Vendor = { 
        ...this.editingVendor()!, 
        ...(this.vendorForm.value as Partial<Vendor>)
      };
      this.vendorService.updateVendor(updatedVendor);
    } else {
      this.vendorService.addVendor(this.vendorForm.value as Omit<Vendor, 'id'>);
    }
    this.resetForm();
  }

  editVendor(vendor: Vendor) {
    this.editingVendor.set(vendor);
    this.vendorForm.patchValue({
      name: vendor.name,
      category: vendor.category,
      contactPerson: vendor.contactPerson,
      email: vendor.email,
      phone: vendor.phone,
      status: vendor.status
    });
  }

  deleteVendor(vendor: Vendor) {
    if (confirm(`Are you sure you want to delete ${vendor.name}?`)) {
      this.vendorService.deleteVendor(vendor.id);
    }
  }

  resetForm() {
    this.editingVendor.set(null);
    this.vendorForm.reset({
      name: '',
      category: 'Sound',
      contactPerson: '',
      email: '',
      phone: '',
      status: 'Not Contacted'
    });
  }

  getStatusClass(status: VendorStatus) {
    switch (status) {
      case 'Booked': return 'bg-green-100 text-green-800';
      case 'Paid': return 'bg-blue-100 text-blue-800';
      case 'Contacted': return 'bg-yellow-100 text-yellow-800';
      case 'Not Contacted': return 'bg-stone-200 text-stone-700';
      default: return 'bg-stone-100 text-stone-800';
    }
  }
}
