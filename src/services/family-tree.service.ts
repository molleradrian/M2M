import { Injectable, computed, inject } from '@angular/core';
import { GuestService } from './guest.service';
import { Guest } from '../models/guest.model';

export interface TreeNode extends Guest {
  children: TreeNode[];
}

export interface FlatTreeNode {
  guest: Guest;
  depth: number;
  isLast: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class FamilyTreeService {
  private guestService = inject(GuestService);

  private attendingGuests = computed(() => 
    this.guestService.guests().filter(g => g.rsvpStatus === 'Attending')
  );

  private trees = computed(() => {
    const guests = this.attendingGuests();
    const guestsById = new Map(guests.map(g => [g.id, { ...g, children: [] } as TreeNode]));
    const roots: { olivia: TreeNode[], liam: TreeNode[] } = { olivia: [], liam: [] };

    for (const guest of guestsById.values()) {
      if (guest.parentId && guestsById.has(guest.parentId)) {
        guestsById.get(guest.parentId)!.children.push(guest);
      } else {
        if (guest.side === 'Olivia') {
          roots.olivia.push(guest);
        } else if (guest.side === 'Liam') {
          roots.liam.push(guest);
        }
      }
    }
    return roots;
  });

  oliviaFamilyTree = computed(() => this.flattenTree(this.trees().olivia));
  liamFamilyTree = computed(() => this.flattenTree(this.trees().liam));

  travelLocations = computed(() => {
    const locations = new Map<string, string[]>();
    for (const guest of this.attendingGuests()) {
      if (guest.traveledFrom) {
        if (!locations.has(guest.traveledFrom)) {
          locations.set(guest.traveledFrom, []);
        }
        locations.get(guest.traveledFrom)!.push(guest.name);
      }
    }
    return Array.from(locations.entries()).map(([location, names]) => ({ location, names }));
  });

  private flattenTree(nodes: TreeNode[]): FlatTreeNode[] {
    const flatList: FlatTreeNode[] = [];
    const traverse = (node: TreeNode, depth: number, isLastInBranch: boolean) => {
      flatList.push({ guest: node, depth, isLast: isLastInBranch });
      node.children.forEach((child, index) => {
        traverse(child, depth + 1, index === node.children.length - 1);
      });
    };
    nodes.forEach((node, index) => traverse(node, 0, index === nodes.length - 1));
    return flatList;
  }
}