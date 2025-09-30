import { Component, ChangeDetectionStrategy, inject, computed } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { WeddingPartyService } from '../../services/wedding-party.service';

@Component({
  selector: 'app-wedding-party',
  templateUrl: './wedding-party.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, NgOptimizedImage]
})
export class WeddingPartyComponent {
  private weddingPartyService = inject(WeddingPartyService);
  
  bridesmaids = computed(() => this.weddingPartyService.weddingParty().filter(m => m.side === 'Olivia' && (m.role === 'Maid of Honor' || m.role === 'Bridesmaid')));
  groomsmen = computed(() => this.weddingPartyService.weddingParty().filter(m => m.side === 'Liam' && (m.role === 'Best Man' || m.role === 'Groomsman')));
  hostsAndMcs = computed(() => this.weddingPartyService.weddingParty().filter(m => m.role === 'Host' || m.role === 'MC'));
}