import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule]
})
export class GalleryComponent {
  images: string[] = Array.from({ length: 15 }, (_, i) => `https://picsum.photos/seed/wedding${i + 1}/600/400`);
  selectedImageUrl = signal<string | null>(null);

  viewImage(url: string) {
    this.selectedImageUrl.set(url);
  }

  closeModal() {
    this.selectedImageUrl.set(null);
  }
}
