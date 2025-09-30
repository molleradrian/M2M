import { Injectable, signal } from '@angular/core';
import { Subscription } from '../models/subscription.model';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {
  subscription = signal<Subscription>({
    plan: 'Free',
    status: 'Active',
    endDate: null
  });
  // In a real app, this would manage user subscriptions with a backend service.
}
