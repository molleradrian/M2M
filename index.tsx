import '@angular/compiler';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter, withHashLocation } from '@angular/router';
import { provideZonelessChangeDetection } from '@angular/core';

// FIX: Import routes from app.component.ts to provide them to the application.
import { AppComponent, routes } from './src/app.component';

bootstrapApplication(AppComponent, {
  providers: [
    provideZonelessChangeDetection(),
    provideHttpClient(),
    // FIX: Add router providers to the application.
    provideRouter(routes, withHashLocation()),
  ],
}).catch((err) => console.error(err));

// AI Studio always uses an `index.tsx` file for all project types.