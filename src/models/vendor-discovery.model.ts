export type VendorCategory = 'Sound' | 'Photography' | 'Catering' | 'Venue' | 'Florist' | 'Transport' | 'Other';

export interface DiscoveredVendor {
  id: string;
  name: string;
  category: VendorCategory;
  location: string;
  rating: number;
  reviewCount: number;
  imageUrl: string;
  phone: string;
  website: string;
}