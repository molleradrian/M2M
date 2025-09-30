import { Injectable } from '@angular/core';
import { ItineraryItem } from '../models/itinerary.model';

@Injectable({
  providedIn: 'root'
})
export class BridalPartyItineraryService {

  private itineraries: { [role: string]: ItineraryItem[] } = {
    'Maid of Honor': [
      { time: '9:00 AM', title: 'Bridal Suite Prep', description: 'Arrive at the bridal suite. Help Olivia get ready and manage mimosas!', location: 'Evergreen Gardens - Bridal Suite', icon: 'M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z' },
      { time: '1:00 PM', title: 'First Look Photos', description: 'Assist with Olivia\'s dress and be ready for photos with the bride.', location: 'Rose Garden', icon: 'M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.776 48.776 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z' },
      { time: '3:45 PM', title: 'Ceremony Line-up', description: 'Hold Olivia\'s bouquet. Walk down the aisle before the bride.', location: 'Ceremony Area', icon: 'M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z' },
      { time: '6:30 PM', title: 'Maid of Honor Speech', description: 'Give your heartfelt toast to the happy couple.', location: 'Reception Hall', icon: 'M12.75 19.5v-.75a7.5 7.5 0 00-7.5-7.5H4.5A7.5 7.5 0 0012 19.5z M12.75 11.25v2.25c0 .414.336.75.75.75h3.75a.75.75 0 00.75-.75v-2.25M12.75 11.25L15 8.25M15 8.25L12.75 5.25M15 8.25H4.5' },
    ],
    'Best Man': [
      { time: '10:00 AM', title: 'Groom Prep', description: 'Meet Liam at his suite. Make sure he eats and doesn\'t forget the rings!', location: 'Evergreen Gardens - Groom\'s Suite', icon: 'M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z' },
      { time: '1:30 PM', title: 'Groomsmen Photos', description: 'Round up the groomsmen for pre-ceremony photos.', location: 'Oak Tree Grove', icon: 'M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.776 48.776 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z' },
      { time: '3:45 PM', title: 'Ceremony Line-up', description: 'Stand with Liam at the altar. You have the rings!', location: 'Ceremony Area', icon: 'M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z' },
      { time: '6:45 PM', title: 'Best Man Speech', description: 'Deliver your toast and share a story or two about Liam.', location: 'Reception Hall', icon: 'M12.75 19.5v-.75a7.5 7.5 0 00-7.5-7.5H4.5A7.5 7.5 0 0012 19.5z M12.75 11.25v2.25c0 .414.336.75.75.75h3.75a.75.75 0 00.75-.75v-2.25M12.75 11.25L15 8.25M15 8.25L12.75 5.25M15 8.25H4.5' },
    ],
    'Bridesmaid': [
      { time: '9:00 AM', title: 'Bridal Suite Prep', description: 'Arrive at the bridal suite for hair, makeup, and celebrations with Olivia.', location: 'Evergreen Gardens - Bridal Suite', icon: 'M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z' },
      { time: '2:00 PM', title: 'Bridal Party Photos', description: 'Time for photos with the full bridal party.', location: 'Rose Garden', icon: 'M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.776 48.776 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z' },
      { time: '3:45 PM', title: 'Ceremony Line-up', description: 'Get ready for your walk down the aisle.', location: 'Ceremony Area', icon: 'M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z' },
    ],
    'Groomsman': [
       { time: '10:00 AM', title: 'Groom Prep', description: 'Join Liam and the groomsmen for some pre-wedding fun.', location: 'Evergreen Gardens - Groom\'s Suite', icon: 'M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z' },
       { time: '1:30 PM', title: 'Groomsmen Photos', description: 'Ready for your close-up! Group photos with Liam and the guys.', location: 'Oak Tree Grove', icon: 'M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.776 48.776 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z' },
       { time: '3:45 PM', title: 'Ceremony Line-up', description: 'Time to take your places for the ceremony.', location: 'Ceremony Area', icon: 'M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z' },
    ],
    'Host': [
       { time: '3:15 PM', title: 'Guest Greeting', description: 'Welcome guests as they arrive, guide them to their seats, and hand out programs.', location: 'Ceremony Entrance', icon: 'M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z' },
       { time: '5:00 PM', title: 'Cocktail Hour Guidance', description: 'Direct guests to the cocktail hour location and inform them about drinks and appetizers.', location: 'Patio Area', icon: 'M12.75 19.5v-.75a7.5 7.5 0 00-7.5-7.5H4.5A7.5 7.5 0 0012 19.5z M12.75 11.25v2.25c0 .414.336.75.75.75h3.75a.75.75 0 00.75-.75v-2.25M12.75 11.25L15 8.25M15 8.25L12.75 5.25M15 8.25H4.5' },
    ],
     'MC': [
       { time: '6:00 PM', title: 'Reception Grand Entrance', description: 'Announce the wedding party and the happy couple as they enter the reception.', location: 'Reception Hall', icon: 'M9 9l10.5-3m0 6.553v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 11-.99-3.467l2.31-.66a2.25 2.25 0 001.632-2.163zm0 0V7.5A2.25 2.25 0 0013.5 5.25h-3A2.25 2.25 0 008.25 7.5v3.75m0 0v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 01-.99-3.467l2.31-.66A2.25 2.25 0 009 15.75z' },
       { time: 'Throughout Reception', title: 'Keep the Party Flowing', description: 'Announce key events: speeches, cake cutting, first dance, bouquet/garter toss.', location: 'Reception Hall', icon: 'M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z M11.25 8.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0z' },
    ],
  };

  constructor() { }

  getItineraryForRole(role: string): ItineraryItem[] {
    return this.itineraries[role] || [];
  }
}
