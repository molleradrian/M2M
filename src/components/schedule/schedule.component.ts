import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule]
})
export class ScheduleComponent {
  schedule = [
    { time: '3:30 PM', title: 'Guest Arrival', description: 'Guests begin to arrive and find their seats for the ceremony.', icon: 'M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z' },
    { time: '4:00 PM', title: 'The Ceremony', description: 'Olivia and Liam exchange vows and say "I do!".', icon: 'M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z' },
    { time: '5:00 PM', title: 'Cocktail Hour', description: 'Enjoy drinks and hors d\'oeuvres while the couple takes photos.', icon: 'M12.75 19.5v-.75a7.5 7.5 0 00-7.5-7.5H4.5A7.5 7.5 0 0012 19.5z M12.75 11.25v2.25c0 .414.336.75.75.75h3.75a.75.75 0 00.75-.75v-2.25M12.75 11.25L15 8.25M15 8.25L12.75 5.25M15 8.25H4.5' },
    { time: '6:00 PM', title: 'Dinner & Reception', description: 'Join us for a delicious meal, heartfelt toasts, and celebration.', icon: 'M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z M11.25 8.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0z' },
    { time: '8:00 PM', title: 'Let\'s Dance!', description: 'The dance floor opens! Get ready to show off your best moves.', icon: 'M9 9l10.5-3m0 6.553v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 11-.99-3.467l2.31-.66a2.25 2.25 0 001.632-2.163zm0 0V7.5A2.25 2.25 0 0013.5 5.25h-3A2.25 2.25 0 008.25 7.5v3.75m0 0v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 01-.99-3.467l2.31-.66A2.25 2.25 0 009 15.75z' },
    { time: '10:30 PM', title: 'Grand Send-off', description: 'Wish the happy couple farewell as they begin their new life together.', icon: 'M15.59 14.37a6 6 0 01-5.84 7.38v-4.82m5.84-2.56a12.022 12.022 0 01-11.68 0m11.68 0c1.42 0 2.73-.4 3.86-1.07m-15.54 1.07c1.13.67 2.44 1.07 3.86 1.07' }
  ];
}