import { Component, OnInit } from '@angular/core';
import { SharedService } from "./../shared.service";

import { Weather } from "./../weather";
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.css']
})
export class HomeComponent implements OnInit {

  id_city = "";
  showLoader = true;
  showSearchData = false;
  cities = [];
  cityWeather = [];
  constructor(private _sharedService: SharedService) { 
    this.cities=['2344116','638242','44418','565346','560743','9807']
  }

  ngOnInit() {
    this.findWeather();
  }
	findWeather() { 
		for (let cityId of this.cities) {
		    this._sharedService.findWeather(cityId)
            .subscribe(
            lstresult => {
              this.showLoader = false;
            	this.cityWeather.push(new Weather(lstresult["title"], lstresult["consolidated_weather"][0]["min_temp"]
            	, lstresult["consolidated_weather"][0]["max_temp"]
            	, lstresult["consolidated_weather"][0]["the_temp"]
            	, lstresult["consolidated_weather"][0]["weather_state_abbr"]));
            },
            error => {
                console.log("Error. The findCityWeather result JSON value is as follows:");
                console.log(error);
            }
            ); 
		}
        
    }

    searchCityWeather(){
      if(this.id_city != ""){
          this.showLoader = true;
          this.cityWeather = [];
          this.showSearchData = true;
          this._sharedService.findCityWeather(this.id_city)
          .subscribe(
            lstresult => {
              console.log(lstresult);

              this._sharedService.findWeather(lstresult[0]["woeid"])
                          .subscribe(
                          lstresult => {
                            this.showLoader = false;
                            this.cityWeather.push(new Weather(lstresult["title"], lstresult["consolidated_weather"][0]["min_temp"]
                            , lstresult["consolidated_weather"][0]["max_temp"]
                            , lstresult["consolidated_weather"][0]["the_temp"]
                            , lstresult["consolidated_weather"][0]["weather_state_abbr"]));
                          },
                          error => {
                              console.log("Error. The findCityWeather result JSON value is as follows:");
                              console.log(error);
                          }
                          ); 
              console.log(lstresult);
            },
            error => {
                console.log("Error. The findCityWeather result JSON value is as follows:");
                console.log(error);
            }
        );
      }
    }

    clearCitySearch(){
    
      this.id_city = "";
      this.showLoader = true;
      this.cityWeather = [];
      this.showSearchData = false;          
      this.findWeather();
    }
}
