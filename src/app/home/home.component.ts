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
  noResultsFound = false;
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
        this.noResultsFound = false;
		    this._sharedService.findWeather(cityId)
            .subscribe(
            lstresult => {
              this.showLoader = false;
              
                              var newDate = new Date(lstresult["consolidated_weather"][0]["applicable_date"]);
            	this.cityWeather.push(new Weather(lstresult["woeid"], lstresult["title"], lstresult["consolidated_weather"][0]["min_temp"]
            	, lstresult["consolidated_weather"][0]["max_temp"]
            	, lstresult["consolidated_weather"][0]["the_temp"]
            	, lstresult["consolidated_weather"][0]["weather_state_abbr"], newDate));
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
          this.noResultsFound = false;
          this.showLoader = true;
          this.cityWeather = [];
          this.showSearchData = true;
          this._sharedService.findCityWeather(this.id_city)
          .subscribe(
            lstresult => {
              console.log(lstresult);
              if(lstresult.length > 0){
                this._sharedService.findWeather(lstresult[0]["woeid"])
                            .subscribe(
                            lstresult => {
                              this.showLoader = false;
                                var newDate = new Date(lstresult["consolidated_weather"][0]["applicable_date"]);
                              this.cityWeather.push(new Weather(lstresult["woeid"],lstresult["title"], lstresult["consolidated_weather"][0]["min_temp"]
                              , lstresult["consolidated_weather"][0]["max_temp"]
                              , lstresult["consolidated_weather"][0]["the_temp"]
                              , lstresult["consolidated_weather"][0]["weather_state_abbr"], newDate));
                            },
                            error => {
                                console.log("Error. The findCityWeather result JSON value is as follows:");
                                console.log(error);
                            }
                            ); 
                }else{
                              this.showLoader = false;
                  this.noResultsFound = true;
                }
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
      this.noResultsFound = false;  
    }
}
