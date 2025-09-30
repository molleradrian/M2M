import { Component, ChangeDetectionStrategy, inject, signal, AfterViewInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FamilyTreeService } from '../../services/family-tree.service';

// Make D3 and TopoJSON available to TypeScript
declare const d3: any;
declare const topojson: any;

@Component({
  selector: 'app-family-tree',
  template: `
    <div class="bg-white p-6 rounded-lg shadow-md mb-8">
      <h2 class="text-2xl font-semibold text-stone-700 mb-2 text-center">Our Families, Our World</h2>
      <p class="text-center text-stone-500 mb-8">See how our families connect and the journeys made to celebrate with us.</p>
      
      <!-- Family Trees -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 mb-8">
        <div>
          <h3 class="text-xl font-semibold text-rose-800 mb-4 border-b-2 border-rose-200 pb-2">Olivia's Family & Friends</h3>
          <ul class="font-sans">
            @for(node of oliviaFamilyTree(); track node.guest.id) {
              <li class="relative pl-6 py-1" [style.padding-left.rem]="node.depth * 1.5 + 1.5">
                <span class="absolute left-0 top-0 h-full w-4" [style.left.rem]="node.depth * 1.5">
                  <span class="absolute w-full h-1/2 border-l border-b border-stone-300" 
                        [class.border-l-transparent]="node.isLast"></span>
                  <span class="absolute top-1/2 w-4 h-px border-t border-stone-300"></span>
                </span>
                {{ node.guest.name }}
              </li>
            }
          </ul>
        </div>
        <div>
          <h3 class="text-xl font-semibold text-rose-800 mb-4 border-b-2 border-rose-200 pb-2">Liam's Family & Friends</h3>
           <ul class="font-sans">
            @for(node of liamFamilyTree(); track node.guest.id) {
              <li class="relative pl-6 py-1" [style.padding-left.rem]="node.depth * 1.5 + 1.5">
                <span class="absolute left-0 top-0 h-full w-4" [style.left.rem]="node.depth * 1.5">
                  <span class="absolute w-full h-1/2 border-l border-b border-stone-300" 
                        [class.border-l-transparent]="node.isLast"></span>
                  <span class="absolute top-1/2 w-4 h-px border-t border-stone-300"></span>
                </span>
                {{ node.guest.name }}
              </li>
            }
          </ul>
        </div>
      </div>

      <!-- Travel Map -->
      <div class="relative w-full aspect-[16/9] bg-stone-100 rounded-lg border border-stone-200 overflow-hidden">
        <svg #mapContainer class="w-full h-full"></svg>
        <div #tooltip class="absolute bg-white text-sm text-stone-800 px-3 py-2 rounded-md shadow-lg pointer-events-none opacity-0 transition-opacity"></div>
      </div>

    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule]
})
export class FamilyTreeComponent implements AfterViewInit, OnDestroy {
  private familyTreeService = inject(FamilyTreeService);

  oliviaFamilyTree = this.familyTreeService.oliviaFamilyTree;
  liamFamilyTree = this.familyTreeService.liamFamilyTree;
  travelLocations = this.familyTreeService.travelLocations;

  @ViewChild('mapContainer') private mapContainer!: ElementRef<SVGElement>;
  @ViewChild('tooltip') private tooltip!: ElementRef<HTMLDivElement>;

  private readonly cityCoordinates: { [key: string]: [number, number] } = {
    'London, UK': [-0.1278, 51.5074],
    'New York, USA': [-74.0060, 40.7128],
    'Dublin, Ireland': [-6.2603, 53.3498],
    'Sydney, Australia': [151.2093, -33.8688],
    'Rome, Italy': [12.4964, 41.9028],
    'Tokyo, Japan': [139.6917, 35.6895],
    'Paris, France': [2.3522, 48.8566],
    'Madrid, Spain': [-3.7038, 40.4168]
  };
  private readonly napaValleyCoords: [number, number] = [-122.2859, 38.2975];

  private resizeMap = () => this.drawMap();

  ngAfterViewInit(): void {
    this.drawMap();
    window.addEventListener('resize', this.resizeMap);
  }

  ngOnDestroy(): void {
    window.removeEventListener('resize', this.resizeMap);
  }

  private async drawMap(): Promise<void> {
    if (!this.mapContainer?.nativeElement) {
      return;
    }
    const width = this.mapContainer.nativeElement.clientWidth;
    const height = this.mapContainer.nativeElement.clientHeight;

    // Clear previous map for redraw
    d3.select(this.mapContainer.nativeElement).selectAll('*').remove();

    const svg = d3.select(this.mapContainer.nativeElement)
      .attr('viewBox', `0 0 ${width} ${height}`);

    const projection = d3.geoMercator()
      .scale(width / 2 / Math.PI * 0.9)
      .center([0, 30])
      .translate([width / 2, height / 2]);

    const path = d3.geoPath().projection(projection);

    const world = await d3.json('https://unpkg.com/world-atlas@2.0.2/countries-110m.json');
    const countries = topojson.feature(world, world.objects.countries);

    // Draw world map
    svg.append('g')
      .selectAll('path')
      .data(countries.features)
      .enter().append('path')
      .attr('d', path)
      .attr('fill', '#e7e5e4') // stone-200
      .attr('stroke', '#fafaf9'); // stone-50

    const napaProjected = projection(this.napaValleyCoords);
    const tooltipEl = d3.select(this.tooltip.nativeElement);

    const travelData = this.travelLocations().filter(d => this.cityCoordinates[d.location]);
    
    // Draw travel lines
    const lines = svg.append('g')
      .selectAll('path.travel-line')
      .data(travelData)
      .enter().append('path')
      .attr('d', d => {
        const from = projection(this.cityCoordinates[d.location]);
        const to = napaProjected;
        if (!from || !to) return null;
        const dx = to[0] - from[0];
        const dy = to[1] - from[1];
        const dr = Math.sqrt(dx * dx + dy * dy) * 1.5;
        return `M${from[0]},${from[1]} A${dr},${dr} 0 0,1 ${to[0]},${to[1]}`;
      })
      .attr('fill', 'none')
      .attr('stroke', '#f43f5e') // rose-500
      .attr('stroke-width', 1.5)
      .attr('stroke-opacity', 0.7);

    // Animate lines
    lines.each(function(d, i) {
      const line = d3.select(this);
      const totalLength = (line.node() as SVGPathElement)?.getTotalLength() ?? 0;
      line
        .attr('stroke-dasharray', `${totalLength} ${totalLength}`)
        .attr('stroke-dashoffset', totalLength)
        .transition()
        .delay(i * 150 + 500)
        .duration(1200)
        .ease(d3.easeCubicOut)
        .attr('stroke-dashoffset', 0);
    });
      
    // Draw location points
    svg.append('g')
      .selectAll('circle.location')
      .data(travelData)
      .enter().append('circle')
      .attr('transform', d => `translate(${projection(this.cityCoordinates[d.location])})`)
      .attr('r', 0)
      .attr('fill', '#f43f5e') // rose-500
      .attr('stroke', 'white')
      .attr('stroke-width', 1.5)
      .attr('opacity', 0)
      .on('mouseover', (event: MouseEvent, d: any) => {
        tooltipEl.style('opacity', 1)
          .html(`<b>${d.location}</b><br>${d.names.join('<br>')}`);
      })
      .on('mousemove', (event: MouseEvent) => {
        const [x, y] = d3.pointer(event, this.mapContainer.nativeElement);
        tooltipEl.style('left', `${x + 15}px`)
                 .style('top', `${y}px`);
      })
      .on('mouseout', () => {
        tooltipEl.style('opacity', 0);
      })
      .transition()
      .delay((d, i) => i * 150)
      .duration(500)
      .attr('r', 5)
      .attr('opacity', 1);

    // Napa Valley star
    if (napaProjected) {
        svg.append('path')
        .attr('d', d3.symbol().type(d3.symbolStar).size(150))
        .attr('transform', `translate(${napaProjected})`)
        .attr('fill', '#e11d48') // rose-600
        .attr('stroke', 'white')
        .attr('stroke-width', 1.5)
        .attr('opacity', 0)
        .transition()
        .delay(200)
        .duration(500)
        .attr('opacity', 1);
    }
  }
}