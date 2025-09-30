export type RequestType = 'Song' | 'Dietary' | 'Other';

export interface GuestRequest {
  id: string;
  guestId: string;
  guestName: string;
  type: RequestType;
  content: string;
  createdAt: Date;
  status: 'Pending' | 'Acknowledged' | 'Completed';
}