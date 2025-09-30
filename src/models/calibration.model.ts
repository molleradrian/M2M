export interface Feature {
  id: 'dashboard' | 'guest-list' | 'schedule' | 'gallery' | 'vendors' | 'seating-chart' | 'ai-assistant' | 'honeymoon-planner' | 'family-tree' | 'invite-links' | 'bridal-party-links' | 'bridal-party' | 'menu' | 'traditions' | 'donations' | 'upgrade' | 'settings';
  name: string;
  description: string;
  icon: string;
}

export interface CalibrationData {
  weddingStyle: 'Modern' | 'Traditional' | 'Rustic' | 'Vintage' | null;
  weddingSize: 'Intimate' | 'Medium' | 'Large' | null;
  enabledFeatures: Feature['id'][];
}
