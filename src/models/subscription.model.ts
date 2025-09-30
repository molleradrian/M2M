export interface Subscription {
  plan: 'Free' | 'Pro' | 'Premium';
  status: 'Active' | 'Canceled' | 'Expired';
  endDate: Date | null;
}
