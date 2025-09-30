export interface SharedGalleryImage {
  id: string;
  guestId: string;
  guestName: string;
  imageDataUrl: string; // base64 data URL
  createdAt: Date;
}