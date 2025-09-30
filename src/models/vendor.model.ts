export type VendorCategory = 'Sound' | 'Photography' | 'Catering' | 'Venue' | 'Florist' | 'Other';
export type VendorStatus = 'Not Contacted' | 'Contacted' | 'Booked' | 'Paid';

export interface Vendor {
  id: string;
  name: string;
  category: VendorCategory;
  contactPerson: string;
  phone: string;
  email: string;
  status: VendorStatus;
}
