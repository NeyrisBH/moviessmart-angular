import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ComicsComponent } from './comics/comics.component';
import { EscritoresComponent } from './contenidos/escritores/escritores/escritores.component';
import { EventosComponent } from './contenidos/eventos/eventos/eventos.component';
import { SeriesComponent } from './contenidos/series/series/series.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { NosotrosComponent } from './nosotros/nosotros.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ComicsComponent,
    NosotrosComponent,
    PageNotFoundComponent,
    SeriesComponent,
    EventosComponent,
    EscritoresComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: 'page-not-found', component: PageNotFoundComponent},
      { path: '**', component: PageNotFoundComponent}
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
