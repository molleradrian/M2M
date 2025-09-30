import { Component, ChangeDetectionStrategy, signal, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

interface TrackedPerson {
  name: string;
  role: string;
  location: string;
  coords: { top: number; left: number };
  heartRate?: number;
  stressLevel?: 'Low' | 'Medium' | 'High';
}

@Component({
  selector: 'app-live-tracking',
  imports: [CommonModule],
  templateUrl: './live-tracking.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LiveTrackingComponent implements OnInit, OnDestroy {
  private updateInterval: any;

  trackedPeople = signal<TrackedPerson[]>([
    { name: 'Olivia', role: 'Bride', location: 'Bridal Suite', coords: { top: 25, left: 30 }, heartRate: 85, stressLevel: 'Low' },
    { name: 'Liam', role: 'Groom', location: 'Groom\'s Suite', coords: { top: 60, left: 20 }, heartRate: 78, stressLevel: 'Low' },
    { name: 'Sophia', role: 'Maid of Honor', location: 'Bridal Suite', coords: { top: 28, left: 35 } },
    { name: 'Kenji', role: 'Best Man', location: 'Groom\'s Suite', coords: { top: 63, left: 25 } },
  ]);

  ngOnInit() {
    this.updateInterval = setInterval(() => this.simulateUpdates(), 3000);
  }

  ngOnDestroy() {
    if (this.updateInterval) {
      clearInterval(this.updateInterval);
    }
  }

  private simulateUpdates() {
    this.trackedPeople.update(people => 
      people.map(person => {
        const newPerson = { ...person };
        // Simulate small movements
        newPerson.coords.top += Math.random() * 2 - 1;
        newPerson.coords.left += Math.random() * 2 - 1;

        // Simulate metric changes for the couple
        if (newPerson.heartRate) {
          newPerson.heartRate += Math.floor(Math.random() * 6 - 3);
          if (newPerson.heartRate > 110) newPerson.stressLevel = 'High';
          else if (newPerson.heartRate > 90) newPerson.stressLevel = 'Medium';
          else newPerson.stressLevel = 'Low';
        }
        return newPerson;
      })
    );
  }

  getStressClass(level: TrackedPerson['stressLevel']) {
    switch (level) {
      case 'High': return 'text-red-500';
      case 'Medium': return 'text-amber-500';
      case 'Low': return 'text-green-500';
      default: return 'text-stone-500';
    }
  }
}