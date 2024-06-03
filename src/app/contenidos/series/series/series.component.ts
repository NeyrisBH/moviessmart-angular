import { Component, HostListener, OnInit } from '@angular/core';
import { SeriesService } from '../series.service';

@Component({
  selector: 'app-series',
  templateUrl: './series.component.html',
  styleUrls: ['./series.component.css']
})
export class SeriesComponent implements OnInit {
  showScrollButton: boolean = false;
  series: any[] = [];
  visibleSeries: any[] = [];
  inputTitle: string = '';
  loading: boolean = true;
  pageSize: number = 12;
  currentPage: number = 1;

  constructor(private seriesService: SeriesService) { }

  ngOnInit(): void {
    this.fetchSeries();
  }

  scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(event: Event) {
    if (window.pageYOffset > 100) {
      this.showScrollButton = true;
    } else {
      this.showScrollButton = false;
    }
  }

  fetchSeries(params: any = {}): void {
    this.loading = true;
    this.seriesService.getSeries(params).subscribe(
      (series: any[]) => {
        this.series = series;
        this.updateVisibleSeries();
        this.loading = false;
      },
      (error: any) => {
        console.error('Error al obtener los series:', error);
        this.loading = false;
      }
    );
  }

  cutDescripcion(descripcion: string): string {
    return descripcion && descripcion.length > 100 ? `${descripcion.slice(0, 100)}...` : descripcion;
  }

  fetchSeriesForTitle(): void {
    const params = this.inputTitle.trim() ? { titleStartsWith: this.inputTitle } : {};
    this.fetchSeries(params);
  }

  loadMore(): void {
    this.currentPage++;
    this.updateVisibleSeries();
  }

  updateVisibleSeries(): void {
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.visibleSeries = this.series.slice(0, end);
  }

  get hasMore(): boolean {
    return this.visibleSeries.length < this.series.length;
  }
}