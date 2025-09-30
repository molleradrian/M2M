import { Component, ChangeDetectionStrategy, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { TraditionsService } from '../../services/traditions.service';
import { Traditions } from '../../models/traditions.model';

@Component({
  selector: 'app-traditions',
  templateUrl: './traditions.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, ReactiveFormsModule]
})
export class TraditionsComponent {
  private traditionsService = inject(TraditionsService);
  private fb = inject(FormBuilder);

  saveStatus = signal<'idle' | 'saved'>('idle');

  traditionsForm = this.fb.group({
    bouquetRecipient: [''],
    garterRecipient: ['']
  });

  constructor() {
    this.traditionsForm.patchValue(this.traditionsService.traditions());
  }

  saveTraditions() {
    if (this.traditionsForm.pristine) return;

    this.traditionsService.updateTraditions(this.traditionsForm.value as Traditions);
    this.traditionsForm.markAsPristine();
    this.saveStatus.set('saved');
    setTimeout(() => this.saveStatus.set('idle'), 3000);
  }
}