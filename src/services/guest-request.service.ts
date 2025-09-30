import { Injectable, signal } from '@angular/core';
import { GuestRequest } from '../models/guest-request.model';

@Injectable({
  providedIn: 'root'
})
export class GuestRequestService {
  private readonly STORAGE_KEY = 'wedding_guest_requests';
  
  requests = signal<GuestRequest[]>([]);

  constructor() {
    this.loadRequests();
  }

  private loadRequests() {
    if (typeof localStorage !== 'undefined') {
      const requestsJson = localStorage.getItem(this.STORAGE_KEY);
      if (requestsJson) {
        const parsed: GuestRequest[] = JSON.parse(requestsJson, (key, value) => {
          if (key === 'createdAt' && value) {
            return new Date(value);
          }
          return value;
        });
        this.requests.set(parsed.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime()));
      }
    }
  }

  private saveRequests() {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.requests()));
    }
  }

  addRequest(request: Omit<GuestRequest, 'id' | 'createdAt' | 'status'>) {
    const newRequest: GuestRequest = { 
        ...request, 
        id: crypto.randomUUID(),
        createdAt: new Date(),
        status: 'Pending'
    };
    this.requests.update(reqs => [newRequest, ...reqs]);
    this.saveRequests();
  }

  updateRequestStatus(requestId: string, status: GuestRequest['status']) {
    this.requests.update(reqs => 
      reqs.map(r => r.id === requestId ? { ...r, status } : r)
    );
    this.saveRequests();
  }
}