import { Component, ChangeDetectionStrategy, signal, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ScheduleComponent } from './components/schedule/schedule.component';
import { GalleryComponent } from './components/gallery/gallery.component';
import { AiAssistantComponent } from './components/ai-assistant/ai-assistant.component';
import { GuestListComponent } from './components/guest-list/guest-list.component';
import { InviteLinksComponent } from './components/invite-links/invite-links.component';
import { GuestPortalComponent } from './components/guest-portal/guest-portal.component';

type View = 'dashboard' | 'schedule' | 'gallery' | 'assistant' | 'guest-list' | 'invite-links';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    DashboardComponent,
    ScheduleComponent,
    GalleryComponent,
    AiAssistantComponent,
    GuestListComponent,
    InviteLinksComponent,
    GuestPortalComponent,
  ]
})
export class AppComponent implements OnInit, OnDestroy {
  selectedView = signal<View>('dashboard');
  viewMode = signal<'planner' | 'guest'>('planner');
  guestId = signal<string | null>(null);

  constructor() {
    this.handleHashChange(); // Check initial hash on load
  }

  ngOnInit() {
    window.addEventListener('hashchange', this.handleHashChange);
  }

  ngOnDestroy() {
    window.removeEventListener('hashchange', this.handleHashChange);
  }

  private handleHashChange = () => {
    const hash = window.location.hash;
    const guestMatch = hash.match(/^#\/guest\/(.+)$/);

    if (guestMatch && guestMatch[1]) {
      this.guestId.set(guestMatch[1]);
      this.viewMode.set('guest');
    } else {
      this.guestId.set(null);
      this.viewMode.set('planner');
    }
  };

  changeView(view: View) {
    this.selectedView.set(view);
  }

  navItems = {
    dashboard: { label: 'Dashboard', icon: 'M4.5 12a7.5 7.5 0 0015 0m-15 0a7.5 7.5 0 1115 0m-15 0H3m16.5 0H21m-1.5 0H12m-8.457 3.97a7.486 7.486 0 011.07-3.638 7.486 7.486 0 013.64-1.069m-4.71 4.707a7.487 7.487 0 013.638-1.07 7.487 7.487 0 011.069 3.638M12 4.5V3m0 18v-1.5m-8.457-3.97A7.487 7.487 0 014.5 12m15 0a7.487 7.487 0 01-1.069 3.638m-3.64 1.07a7.487 7.487 0 01-3.638-1.07m4.71-4.707a7.486 7.486 0 01-1.07 3.638 7.486 7.486 0 01-3.64 1.069m4.71-4.707a7.487 7.487 0 01-3.638 1.07 7.487 7.487 0 01-1.069-3.638M4.5 12a7.487 7.487 0 011.069-3.638m3.64-1.07a7.487 7.487 0 013.638 1.07m-4.71 4.707a7.486 7.486 0 011.07-3.638 7.486 7.486 0 013.64-1.069' },
    schedule: { label: 'Schedule', icon: 'M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0h18M-4.5 12.75h1.5' },
    gallery: { label: 'Gallery', icon: 'M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z' },
    'guest-list': { label: 'Guest List', icon: 'M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z' },
    'invite-links': { label: 'Invite Links', icon: 'M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244' },
    assistant: { label: 'AI Helper', icon: 'M8.625 9.75a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m3.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M16.5 21a4.5 4.5 0 00-9 0h9zm-3.375-4.5a.75.75 0 00-1.5 0v.75c0 .414.336.75.75.75h.75c.414 0 .75-.336.75-.75v-.75zm-4.5 0a.75.75 0 00-1.5 0v.75c0 .414.336.75.75.75h.75c.414 0 .75-.336.75-.75v-.75S10.5 15 10.5 15z M5.25 5.25a3 3 0 00-3 3v3a3 3 0 003 3h13.5a3 3 0 003-3v-3a3 3 0 00-3-3H5.25z' }
  };
}