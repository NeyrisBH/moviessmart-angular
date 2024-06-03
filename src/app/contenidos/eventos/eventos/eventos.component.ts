import { Component, HostListener, OnInit } from '@angular/core';
import { EventosService } from '../eventos.service';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.css']
})
export class EventosComponent implements OnInit {
  showScrollButton: boolean = false;
  eventos: any[] = [];
  visibleEventos: any[] = [];
  inputTitle: string = '';
  loading: boolean = true;
  pageSize: number = 12;
  currentPage: number = 1;

  constructor(private eventosService: EventosService) { }

  ngOnInit(): void {
    this.fetchEventos();
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

  fetchEventos(params: any = {}): void {
    this.loading = true;
    this.eventosService.getEventos(params).subscribe(
      (eventos: any[]) => {
        this.eventos = eventos;
        this.updateVisibleEventos();
        this.loading = false;
      },
      (error: any) => {
        console.error('Error al obtener los eventos:', error);
        this.loading = false;
      }
    );
  }

  cutDescripcion(descripcion: string): string {
    return descripcion && descripcion.length > 100 ? `${descripcion.slice(0, 100)}...` : descripcion;
  }

  fetchEventosForTitle(): void {
    const params = this.inputTitle.trim() ? { nameStartsWith: this.inputTitle } : {};
    this.fetchEventos(params);
  }

  loadMore(): void {
    this.currentPage++;
    this.updateVisibleEventos();
  }

  updateVisibleEventos(): void {
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.visibleEventos = this.eventos.slice(0, end);
  }

  get hasMore(): boolean {
    return this.visibleEventos.length < this.eventos.length;
  }
}