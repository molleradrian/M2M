import { Injectable, signal } from '@angular/core';
import { SharedGalleryImage } from '../models/shared-gallery.model';

@Injectable({
  providedIn: 'root'
})
export class SharedGalleryService {
  private readonly STORAGE_KEY = 'wedding_shared_gallery';
  
  images = signal<SharedGalleryImage[]>([]);

  constructor() {
    this.loadImages();
  }

  private loadImages() {
    if (typeof localStorage !== 'undefined') {
      const imagesJson = localStorage.getItem(this.STORAGE_KEY);
      if (imagesJson) {
        const parsedImages: SharedGalleryImage[] = JSON.parse(imagesJson, (key, value) => {
          if (key === 'createdAt' && value) {
            return new Date(value);
          }
          return value;
        });
        this.images.set(parsedImages.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime()));
      }
    }
  }

  private saveImages() {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.images()));
    }
  }

  addImage(image: Omit<SharedGalleryImage, 'id' | 'createdAt'>) {
    const newImage: SharedGalleryImage = { 
        ...image, 
        id: crypto.randomUUID(),
        createdAt: new Date()
    };
    this.images.update(images => [newImage, ...images]);
    this.saveImages();
  }
}