import { Injectable } from '@angular/core';
import { DiscoveredVendor, VendorCategory } from '../models/vendor-discovery.model';

@Injectable({
  providedIn: 'root'
})
export class VendorDiscoveryService {

  private allVendors: DiscoveredVendor[] = [
    { id: 'd1', name: 'Lens & Love Photography', category: 'Photography', location: 'Napa Valley, CA', rating: 4.9, reviewCount: 120, imageUrl: 'https://picsum.photos/seed/photovendor/400/300', phone: '555-1111', website: 'lensandlove.com' },
    { id: 'd2', name: 'Evergreen Catering', category: 'Catering', location: 'Sonoma, CA', rating: 4.8, reviewCount: 88, imageUrl: 'https://picsum.photos/seed/catervendor/400/300', phone: '555-2222', website: 'evergreencatering.com' },
    { id: 'd3', name: 'Petal Perfect Florists', category: 'Florist', location: 'Napa Valley, CA', rating: 5.0, reviewCount: 95, imageUrl: 'https://picsum.photos/seed/floristvendor/400/300', phone: '555-3333', website: 'petalperfect.com' },
    { id: 'd4', name: 'Napa Valley Charters', category: 'Transport', location: 'Napa Valley, CA', rating: 4.7, reviewCount: 54, imageUrl: 'https://picsum.photos/seed/transvendor/400/300', phone: '555-4444', website: 'napacharters.com' },
    { id: 'd5', name: 'Starlight Sound & DJ', category: 'Sound', location: 'San Francisco, CA', rating: 4.9, reviewCount: 210, imageUrl: 'https://picsum.photos/seed/soundvendor/400/300', phone: '555-5555', website: 'starlightsound.com' },
    { id: 'd6', name: 'Vineyard Views Estate', category: 'Venue', location: 'St. Helena, CA', rating: 4.9, reviewCount: 76, imageUrl: 'https://picsum.photos/seed/venuevendor/400/300', phone: '555-6666', website: 'vineyardviews.com' },
    { id: 'd7', name: 'Candid Moments Photo', category: 'Photography', location: 'Sonoma, CA', rating: 4.7, reviewCount: 98, imageUrl: 'https://picsum.photos/seed/photovendor2/400/300', phone: '555-7777', website: 'candidmoments.com' },
    { id: 'd8', name: 'Gourmet Gatherings', category: 'Catering', location: 'Napa Valley, CA', rating: 4.9, reviewCount: 150, imageUrl: 'https://picsum.photos/seed/catervendor2/400/300', phone: '555-8888', website: 'gourmetgatherings.com' },
  ];

  constructor() { }

  async searchVendors(query: string, category: VendorCategory | 'All'): Promise<DiscoveredVendor[]> {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));

    let results = this.allVendors;

    if (category !== 'All') {
      results = results.filter(v => v.category === category);
    }

    if (query) {
      const lowerQuery = query.toLowerCase();
      results = results.filter(v => 
        v.name.toLowerCase().includes(lowerQuery) ||
        v.location.toLowerCase().includes(lowerQuery)
      );
    }

    return results;
  }
}
