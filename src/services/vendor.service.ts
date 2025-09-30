import { Injectable, signal } from '@angular/core';
import { Vendor, VendorCategory, VendorStatus } from '../models/vendor.model';

@Injectable({
  providedIn: 'root'
})
export class VendorService {
  private readonly STORAGE_KEY = 'm2m_vendors';
  
  vendors = signal<Vendor[]>([]);

  constructor() {
    this.loadVendors();
  }

  private loadVendors() {
    if (typeof localStorage !== 'undefined') {
      const vendorsJson = localStorage.getItem(this.STORAGE_KEY);
      if (vendorsJson) {
        this.vendors.set(JSON.parse(vendorsJson));
      } else {
        this.initializeWithSampleData();
      }
    }
  }

  private saveVendors() {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.vendors()));
    }
  }
  
  private initializeWithSampleData() {
    const sampleVendors: Vendor[] = [
      { id: 'v1', name: 'Harmony Soundscapes', category: 'Sound', contactPerson: 'David Chen', phone: '555-0101', email: 'david@harmonysound.com', status: 'Booked' },
      { id: 'v2', name: 'Perfect Pitch Audio', category: 'Sound', contactPerson: 'Maria Rodriguez', phone: '555-0102', email: 'maria@perfectpitch.com', status: 'Contacted' },
      { id: 'v3', name: 'EventAmplify Pro', category: 'Sound', contactPerson: 'Tom Smith', phone: '555-0103', email: 'tom@eventamplify.com', status: 'Not Contacted' },
    ];
    this.vendors.set(sampleVendors);
    this.saveVendors();
  }

  addVendor(vendor: Omit<Vendor, 'id'>) {
    const newVendor: Vendor = { ...vendor, id: crypto.randomUUID() };
    this.vendors.update(vendors => [...vendors, newVendor]);
    this.saveVendors();
  }
  
  updateVendor(updatedVendor: Vendor) {
    this.vendors.update(vendors => 
      vendors.map(v => v.id === updatedVendor.id ? updatedVendor : v)
    );
    this.saveVendors();
  }

  deleteVendor(vendorId: string) {
    this.vendors.update(vendors => vendors.filter(v => v.id !== vendorId));
    this.saveVendors();
  }
}
