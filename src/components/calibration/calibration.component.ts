import { Component, ChangeDetectionStrategy, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CalibrationService } from '../../services/calibration.service';
import { Feature } from '../../models/calibration.model';

type WeddingStyle = 'Modern' | 'Traditional' | 'Rustic' | 'Vintage';
type WeddingSize = 'Intimate' | 'Medium' | 'Large';

@Component({
  selector: 'app-calibration',
  templateUrl: './calibration.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, FormsModule]
})
export class CalibrationComponent {
  private calibrationService = inject(CalibrationService);
  
  step = signal(1);

  // Step 1: Style
  selectedStyle = signal<WeddingStyle | null>(null);
  styles: { name: WeddingStyle, icon: string }[] = [
    { name: 'Modern', icon: 'M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9' },
    { name: 'Traditional', icon: 'M3.75 21v-4.5m0 4.5h16.5v-4.5m0 4.5V1.5m-16.5 15V1.5m16.5 15c0-3.314-2.24-6-5-6s-5 2.686-5 6m10 0a5.01 5.01 0 01-5-5m5 5a5.01 5.01 0 00-5-5m5 5V1.5' },
    { name: 'Rustic', icon: 'M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 00-3.7-3.7 48.678 48.678 0 00-7.324 0 4.006 4.006 0 00-3.7 3.7c-.092 1.21-.138 2.43-.138 3.662v4.286a4.006 4.006 0 003.7 3.7 48.656 48.656 0 007.324 0 4.006 4.006 0 003.7-3.7v-4.286z' },
    { name: 'Vintage', icon: 'M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25' },
  ];

  // Step 2: Size
  selectedSize = signal<WeddingSize | null>(null);
  sizes: { name: WeddingSize, range: string, icon: string }[] = [
    { name: 'Intimate', range: '< 50 guests', icon: 'M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z' },
    { name: 'Medium', range: '50-150 guests', icon: 'M18 18.72a9.094 9.094 0 00-12 0m12 0a9.094 9.094 0 01-12 0m12 0v-2.67a4.5 4.5 0 00-4.5-4.5H9a4.5 4.5 0 00-4.5 4.5v2.67m12 0A2.25 2.25 0 0115.75 21H8.25A2.25 2.25 0 016 18.72m12 0V11.25a2.25 2.25 0 00-2.25-2.25H8.25A2.25 2.25 0 006 11.25v7.47m12 0a9.094 9.094 0 00-12 0' },
    { name: 'Large', range: '> 150 guests', icon: 'M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z' }
  ];

  // Step 3: Features
  allFeatures: Feature[] = this.calibrationService.getAvailableFeatures();
  selectedFeatures = signal<{[key: string]: boolean}>({});

  constructor() {
    const enabled = this.calibrationService.calibrationData().enabledFeatures;
    const selection: {[key: string]: boolean} = {};
    for (const feature of this.allFeatures) {
      selection[feature.id] = enabled.includes(feature.id);
    }
    this.selectedFeatures.set(selection);
  }

  toggleFeatureSelection(featureId: Feature['id'], event: Event) {
    const isChecked = (event.target as HTMLInputElement).checked;
    this.selectedFeatures.update(currentSelection => ({
      ...currentSelection,
      [featureId]: isChecked
    }));
  }

  isNextDisabled = computed(() => {
    switch(this.step()) {
      case 1: return this.selectedStyle() === null;
      case 2: return this.selectedSize() === null;
      default: return false;
    }
  });

  nextStep() {
    this.step.update(s => s + 1);
  }

  prevStep() {
    this.step.update(s => s - 1);
  }

  finishCalibration() {
    const enabledFeatures = Object.entries(this.selectedFeatures())
      .filter(([_, isSelected]) => isSelected)
      .map(([featureId, _]) => featureId as Feature['id']);
      
    this.calibrationService.saveCalibration({
      weddingStyle: this.selectedStyle(),
      weddingSize: this.selectedSize(),
      enabledFeatures: enabledFeatures,
    });
    this.calibrationService.completeCalibration();
  }
}