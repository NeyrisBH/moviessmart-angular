import { Component, HostListener, OnInit } from '@angular/core';
import { EscritoresService } from '../escritores.service';

@Component({
  selector: 'app-escritores',
  templateUrl: './escritores.component.html',
  styleUrls: ['./escritores.component.css']
})
export class EscritoresComponent implements OnInit {
  showScrollButton: boolean = false;
  escritores: any[] = [];
  visibleEscritores: any[] = [];
  inputTitle: string = '';
  loading: boolean = true;
  pageSize: number = 12;
  currentPage: number = 1;

  constructor(private escritoresService: EscritoresService) { }

  ngOnInit(): void {
    this.fetchEscritores();
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

  fetchEscritores(params: any = {}): void {
    this.loading = true;
    this.escritoresService.getEscritores(params).subscribe(
      (escritores: any[]) => {
        this.escritores = escritores;
        this.updateVisibleEscritores();
        this.loading = false;
      },
      (error: any) => {
        console.error('Error al obtener los escritores:', error);
        this.loading = false;
      }
    );
  }

  cutDescripcion(descripcion: string): string {
    return descripcion && descripcion.length > 100 ? `${descripcion.slice(0, 100)}...` : descripcion;
  }

  loadMore(): void {
    this.currentPage++;
    this.updateVisibleEscritores();
  }

  updateVisibleEscritores(): void {
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.visibleEscritores = this.escritores.slice(0, end);
  }

  get hasMore(): boolean {
    return this.visibleEscritores.length < this.escritores.length;
  }
}