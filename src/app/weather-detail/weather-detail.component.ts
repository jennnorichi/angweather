import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { SharedService } from "./../shared.service";
import { Weather } from "./../weather";

@Component({
  selector: 'app-weather-detail',
  templateUrl: './weather-detail.component.html',
  styles: []
})
export class WeatherDetailComponent implements OnInit {
woeId = "";
cityWeather = [];
showLoader = true;
  constructor(private activatedRoute: ActivatedRoute, private _sharedService: SharedService) {}

  ngOnInit() {
	  this.activatedRoute.params.subscribe((params: Params) => {
	        this.woeId = params['woeid'];
	        console.log(this.woeId);

	        /**
	        * Send the request here for the full details of the Weather for particular woeId
	        */
	        this._sharedService.findWeather(this.woeId)
                          .subscribe(
                          lstresult => {
                            this.showLoader = false;
                            var woeIdInt = lstresult["woeid"];
                            var city = lstresult["title"];
							for (let weatherData of lstresult.consolidated_weather) {

	                            var newDate = new Date(weatherData["applicable_date"]);
	                            this.cityWeather.push(new Weather(woeIdInt, city, weatherData["min_temp"]
	                            , weatherData["max_temp"]
	                            , weatherData["the_temp"]
	                            , weatherData["weather_state_abbr"], newDate));
                            }
                          },
                          error => {
                              console.log("Error. The findCityWeather result JSON value is as follows:");
                              console.log(error);
                          }
                          ); 
	      });
  }

}
