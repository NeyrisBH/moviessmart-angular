import { Component, HostListener, OnInit } from '@angular/core';
import { ComicsService } from './comics.service';

@Component({
  selector: 'app-comics',
  templateUrl: './comics.component.html',
  styleUrls: ['./comics.component.css']
})
export class ComicsComponent implements OnInit {
  showScrollButton: boolean = false;
  comics: any[] = [];
  visibleComics: any[] = [];
  inputTitle: string = '';
  loading: boolean = true;
  pageSize: number = 12;
  currentPage: number = 1;

  constructor(private comicsService: ComicsService) { }

  ngOnInit(): void {
    this.fetchComics();
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

  fetchComics(params: any = {}): void {
    this.loading = true;
    this.comicsService.getComics(params).subscribe(
      (comics: any[]) => {
        this.comics = comics;
        this.updateVisibleComics();
        this.loading = false;
      },
      (error: any) => {
        console.error('Error al obtener los cómics:', error);
        this.loading = false;
      }
    );
  }

  cutDescripcion(descripcion: string): string {
    return descripcion && descripcion.length > 100 ? `${descripcion.slice(0, 100)}...` : descripcion;
  }

  fetchComicsForTitle(): void {
    const params = this.inputTitle.trim() ? { titleStartsWith: this.inputTitle } : {};
    this.fetchComics(params);
  }

  loadMore(): void {
    this.currentPage++;
    this.updateVisibleComics();
  }

  updateVisibleComics(): void {
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.visibleComics = this.comics.slice(0, end);
  }

  get hasMore(): boolean {
    return this.visibleComics.length < this.comics.length;
  }
}