import { Injectable, signal, effect } from '@angular/core';
import { CalibrationData, Feature } from '../models/calibration.model';

@Injectable({
  providedIn: 'root'
})
export class CalibrationService {
  private readonly CALIBRATION_DATA_KEY = 'wedding_calibration_data';
  private readonly CALIBRATION_COMPLETE_KEY = 'wedding_calibration_complete';

  private availableFeatures: Feature[] = [
    { id: 'dashboard', name: 'Dashboard', description: 'Overview of your wedding planning progress.', icon: 'M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-1.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25A2.25 2.25 0 015.25 3h4.5a2.25 2.25 0 012.25 2.25v.75M15 5.25v.75a2.25 2.25 0 002.25 2.25h.75a2.25 2.25 0 002.25-2.25v-.75' },
    { id: 'guest-list', name: 'Guest List', description: 'Manage your guest list, RSVPs, and contact information.', icon: 'M18 18.72a9.094 9.094 0 00-12 0m12 0a9.094 9.094 0 01-12 0m12 0v-2.67a4.5 4.5 0 00-4.5-4.5H9a4.5 4.5 0 00-4.5 4.5v2.67' },
    { id: 'invite-links', name: 'Guest Invites', description: 'Generate unique invitation links for your guests.', icon: 'M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244' },
    { id: 'schedule', name: 'Schedule', description: 'Plan the timeline for your wedding day.', icon: 'M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0h18' },
    { id: 'gallery', name: 'Gallery', description: 'Share photos with your guests.', icon: 'M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z' },
    { id: 'vendors', name: 'Vendors', description: 'Keep track of your wedding vendors and contacts.', icon: 'M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z' },
    { id: 'seating-chart', name: 'Seating Chart', description: 'Arrange seating for your guests at the reception.', icon: 'M13.5 16.875h3.375m0 0h3.375m-3.375 0V13.5m0 3.375v3.375M6 10.5h2.25a2.25 2.25 0 002.25-2.25V6a2.25 2.25 0 00-2.25-2.25H6A2.25 2.25 0 003.75 6v2.25A2.25 2.25 0 006 10.5zm0 9.75h2.25a2.25 2.25 0 002.25-2.25v-1.5a2.25 2.25 0 00-2.25-2.25H6a2.25 2.25 0 00-2.25 2.25v1.5A2.25 2.25 0 006 20.25zm10.5-9.75h2.25a2.25 2.25 0 002.25-2.25V6a2.25 2.25 0 00-2.25-2.25h-2.25a2.25 2.25 0 00-2.25 2.25v2.25a2.25 2.25 0 002.25 2.25z' },
    { id: 'ai-assistant', name: 'AI Assistant', description: 'Get help with planning from your personal AI assistant.', icon: 'M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z' },
    { id: 'honeymoon-planner', name: 'Honeymoon AI', description: 'Use AI to get ideas and plan your honeymoon.', icon: 'M12.75 3.03v.568c0 .343.146.66.401.89A5.98 5.98 0 0121 8.25c0 2.848-2.083 5.216-4.894 5.666a.752.752 0 01-.401.89v.568A7.5 7.5 0 0022.5 8.25a7.5 7.5 0 00-9.75-5.22zM3 13.918l.81-1.62a.75.75 0 011.34 0l.81 1.62a.75.75 0 001.34 0l.81-1.62a.75.75 0 011.34 0l.81 1.62m-1.5-2.168l.81-1.62a.75.75 0 011.34 0l.81 1.62a.75.75 0 001.34 0l.81-1.62a.75.75 0 011.34 0l.81 1.62M3 21l.81-1.62a.75.75 0 011.34 0l.81 1.62a.75.75 0 001.34 0l.81-1.62a.75.75 0 011.34 0l.81 1.62' },
    { id: 'family-tree', name: 'Family Tree', description: 'Visualize your family connections.', icon: 'M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z' },
    { id: 'bridal-party', name: 'Bridal Party', description: 'Manage your bridal party members.', icon: 'M16.5 12a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zm0 0c0 1.657 1.007 3 2.25 3S21 13.657 21 12a9 9 0 10-2.636 6.364M16.5 12V8.25' },
    { id: 'bridal-party-links', name: 'Bridal Party Invites', description: 'Generate unique links for bridal party members.', icon: 'M10.5 6a7.5 7.5 0 100 15 7.5 7.5 0 000-15zM5.25 9a.75.75 0 000 1.5h9a.75.75 0 000-1.5h-9z' },
    { id: 'menu', name: 'Menu', description: 'Plan your wedding menu.', icon: 'M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5' },
    { id: 'traditions', name: 'Traditions', description: 'Manage wedding traditions like bouquet and garter toss.', icon: 'M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z' },
  ];

  isCalibrated = signal<boolean>(false);
  calibrationData = signal<CalibrationData>(this.loadCalibrationData());

  constructor() {
    this.loadIsCalibrated();
    
    // Save calibration data to localStorage whenever it changes
    effect(() => {
      this.saveCalibrationData();
    });
  }

  private loadCalibrationData(): CalibrationData {
    if (typeof localStorage !== 'undefined') {
      const dataJson = localStorage.getItem(this.CALIBRATION_DATA_KEY);
      if (dataJson) {
        return JSON.parse(dataJson);
      }
    }
    return {
      weddingStyle: null,
      weddingSize: null,
      enabledFeatures: this.availableFeatures.map(f => f.id) // Enable all by default
    };
  }

  private saveCalibrationData() {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(this.CALIBRATION_DATA_KEY, JSON.stringify(this.calibrationData()));
    }
  }

  private loadIsCalibrated() {
    if (typeof localStorage !== 'undefined') {
      const isComplete = localStorage.getItem(this.CALIBRATION_COMPLETE_KEY);
      this.isCalibrated.set(isComplete === 'true');
    }
  }

  getAvailableFeatures(): Feature[] {
    return this.availableFeatures;
  }

  saveCalibration(data: Partial<CalibrationData>) {
    this.calibrationData.update(current => ({...current, ...data}));
  }

  completeCalibration() {
    this.isCalibrated.set(true);
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(this.CALIBRATION_COMPLETE_KEY, 'true');
    }
  }

  isFeatureEnabled(featureId: Feature['id']): boolean {
    return this.calibrationData().enabledFeatures.includes(featureId);
  }
}
