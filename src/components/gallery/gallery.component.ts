import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-gallery',
  imports: [CommonModule, NgOptimizedImage],
  template: `
    <div class="bg-white p-6 rounded-lg shadow-md">
      <h2 class="text-2xl font-semibold text-stone-700 mb-4">Our Gallery</h2>
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        @for (image of images; track image.seed) {
          <div class="aspect-square bg-stone-100 rounded-lg overflow-hidden group">
            <img [ngSrc]="'https://picsum.photos/seed/' + image.seed + '/600/600'" 
                 alt="Wedding gallery image" 
                 width="600"
                 height="600"
                 class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 ease-in-out">
          </div>
        }
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GalleryComponent {
  images = [
    { seed: 'olivia-liam-1' }, { seed: 'olivia-liam-2' }, { seed: 'olivia-liam-3' },
    { seed: 'olivia-liam-4' }, { seed: 'olivia-liam-5' }, { seed: 'olivia-liam-6' },
    { seed: 'olivia-liam-7' }, { seed: 'olivia-liam-8' }, { seed: 'olivia-liam-9' },
    { seed: 'olivia-liam-10' }, { seed: 'olivia-liam-11' }, { seed: 'olivia-liam-12' },
  ];
}
