import { Injectable, signal } from '@angular/core';
import { WeddingPartyMember } from '../models/wedding-party.model';

@Injectable({
  providedIn: 'root'
})
export class WeddingPartyService {
  private readonly partyData: WeddingPartyMember[] = [
    { id: 'bp1', email: 'sophia.r@example.com', name: 'Sophia Rossi', role: 'Maid of Honor', side: 'Olivia', imageUrl: 'https://picsum.photos/seed/bridesmaid1/400/400' },
    { id: 'bp2', email: 'isabelle.d@example.com', name: 'Isabelle Dubois', role: 'Bridesmaid', side: 'Olivia', imageUrl: 'https://picsum.photos/seed/bridesmaid2/400/400' },
    { id: 'bp3', email: 'aoife.os@example.com', name: 'Aoife O\'Sullivan', role: 'Bridesmaid', side: 'Olivia', imageUrl: 'https://picsum.photos/seed/bridesmaid3/400/400' },
    { id: 'bp4', email: 'kenji.t@example.com', name: 'Kenji Tanaka', role: 'Best Man', side: 'Liam', imageUrl: 'https://picsum.photos/seed/groomsman1/400/400' },
    { id: 'bp5', email: 'james.v@example.com', name: 'James Vance', role: 'Groomsman', side: 'Liam', imageUrl: 'https://picsum.photos/seed/groomsman2/400/400' },
    { id: 'bp6', email: 'mateo.g@example.com', name: 'Mateo Garcia', role: 'Groomsman', side: 'Liam', imageUrl: 'https://picsum.photos/seed/groomsman3/400/400' },
    { id: 'bp7', email: 'chloe.v@example.com', name: 'Chloe Vance', role: 'Host', side: 'Olivia', imageUrl: 'https://picsum.photos/seed/host1/400/400' },
    { id: 'bp8', email: 'richard.v@example.com', name: 'Richard Vance', role: 'MC', side: 'Liam', imageUrl: 'https://picsum.photos/seed/mc1/400/400' },
  ];
  
  weddingParty = signal<WeddingPartyMember[]>(this.partyData);

  constructor() { }

  getMemberById(id: string): WeddingPartyMember | undefined {
    return this.weddingParty().find(m => m.id === id);
  }
}
