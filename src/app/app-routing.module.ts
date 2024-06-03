import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ComicsComponent } from './comics/comics.component';
import { EscritoresComponent } from './contenidos/escritores/escritores/escritores.component';
import { EventosComponent } from './contenidos/eventos/eventos/eventos.component';
import { SeriesComponent } from './contenidos/series/series/series.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { NosotrosComponent } from './nosotros/nosotros.component';

const routes: Routes = [
  { path: 'header', component: HeaderComponent },
  { path: 'footer', component: FooterComponent },
  { path: 'comics', component: ComicsComponent },
  { path: 'series', component: SeriesComponent },
  { path: 'eventos', component: EventosComponent},
  { path: 'escritores', component: EscritoresComponent},
  { path: 'nosotros', component: NosotrosComponent},
  { path: '', redirectTo: 'comics', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }