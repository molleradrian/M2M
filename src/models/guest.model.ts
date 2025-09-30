export type RsvpStatus = 'Pending' | 'Attending' | 'Declined';

export interface Guest {
  id: string;
  name: string;
  email: string;
  rsvpStatus: RsvpStatus;
  side?: 'Olivia' | 'Liam';
  parentId?: string | null;
  traveledFrom?: string; // e.g., "City, Country"
}