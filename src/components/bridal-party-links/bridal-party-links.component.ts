import { Component, ChangeDetectionStrategy, inject, signal } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { WeddingPartyService } from '../../services/wedding-party.service';
import { WeddingPartyMember } from '../../models/wedding-party.model';

@Component({
  selector: 'app-bridal-party-links',
  templateUrl: './bridal-party-links.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, NgOptimizedImage],
})
export class BridalPartyLinksComponent {
  private weddingPartyService = inject(WeddingPartyService);
  members = this.weddingPartyService.weddingParty;
  
  copiedLinkId = signal<string | null>(null);

  getPortalLink(memberId: string): string {
    const baseUrl = window.location.origin + window.location.pathname;
    return `${baseUrl}#/bridal-party/${memberId}`;
  }

  copyLink(member: WeddingPartyMember) {
    const link = this.getPortalLink(member.id);
    navigator.clipboard.writeText(link).then(() => {
      this.copiedLinkId.set(member.id);
      setTimeout(() => {
        if (this.copiedLinkId() === member.id) {
            this.copiedLinkId.set(null);
        }
      }, 2000);
    }).catch(err => {
      console.error('Failed to copy link: ', err);
    });
  }
}
