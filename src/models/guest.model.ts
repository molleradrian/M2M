export type RsvpStatus = 'Pending' | 'Attending' | 'Declined';

export interface Guest {
  id: string;
  name: string;
  email: string;
  rsvpStatus: RsvpStatus;
}
