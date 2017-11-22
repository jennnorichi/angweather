import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header.component';
import { WeatherComponent } from './weather/weather.component';

import { CONST_ROUTING } from './app.routing';
import { HomeComponent } from './home/home.component';

import { SharedService } from "./shared.service";
import { WeatherDetailComponent } from './weather-detail/weather-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    WeatherComponent,
    HomeComponent,
    WeatherDetailComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    CONST_ROUTING
  ],
  providers: [SharedService],
  bootstrap: [AppComponent]
})
export class AppModule { }
