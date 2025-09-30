import { Component, ChangeDetectionStrategy, input, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeddingPartyService } from '../../services/wedding-party.service';
import { BridalPartyItineraryService } from '../../services/bridal-party-itinerary.service';

@Component({
  selector: 'app-bridal-party-portal',
  templateUrl: './bridal-party-portal.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule]
})
export class BridalPartyPortalComponent {
  memberId = input.required<string>();
  
  private weddingPartyService = inject(WeddingPartyService);
  private itineraryService = inject(BridalPartyItineraryService);

  member = computed(() => this.weddingPartyService.getMemberById(this.memberId()));
  itinerary = computed(() => {
    const role = this.member()?.role;
    return role ? this.itineraryService.getItineraryForRole(role) : [];
  });
}
