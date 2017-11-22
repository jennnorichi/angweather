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

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    WeatherComponent,
    HomeComponent
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
