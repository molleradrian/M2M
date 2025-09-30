import { Injectable, signal, effect } from '@angular/core';
import { Traditions } from '../models/traditions.model';

@Injectable({
  providedIn: 'root'
})
export class TraditionsService {
  private readonly STORAGE_KEY = 'wedding_traditions';

  traditions = signal<Traditions>({ bouquetRecipient: '', garterRecipient: '' });

  constructor() {
    this.loadTraditions();
    effect(() => this.saveTraditions());
  }

  private loadTraditions() {
    if (typeof localStorage !== 'undefined') {
      const traditionsJson = localStorage.getItem(this.STORAGE_KEY);
      if (traditionsJson) {
        this.traditions.set(JSON.parse(traditionsJson));
      }
    }
  }

  private saveTraditions() {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.traditions()));
    }
  }

  updateTraditions(updatedTraditions: Traditions) {
    this.traditions.set(updatedTraditions);
  }
}
