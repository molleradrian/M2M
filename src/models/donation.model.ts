export interface Donation {
  id: string;
  donorName: string;
  amount: number;
  message?: string;
  donatedAt: Date;
}
