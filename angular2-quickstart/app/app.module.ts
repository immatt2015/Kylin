import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';

// Router
import { routing } from './app.routing';

// Components
import { AppComponent }        from './components/app.component';
import { HeroesComponent }     from './components/heroes.component';
import { HeroDetailComponent } from './components/hero-detail.component';
import { DashboardComponent }  from './components/dashboard.component';

// Service
import { HeroService } from './hero.service';

@NgModule({
    imports:      [ BrowserModule, FormsModule, routing ],
    declarations: [ AppComponent, HeroesComponent, HeroDetailComponent, DashboardComponent ],
    providers:    [ HeroService ],
    bootstrap:    [ AppComponent ]
})
export class AppModule { }