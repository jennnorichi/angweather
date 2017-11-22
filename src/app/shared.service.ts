import { Injectable } from '@angular/core';
import { Http, Headers, Response } from "@angular/http";
import 'rxjs/Rx';
import { Observable } from "rxjs";

@Injectable()
export class SharedService {
	weatherSearchURL = "http://localhost/weather.php?command=search&keyword=";
	weatherDetailURL = "http://localhost/weather.php?command=location&woeid=";
 constructor(private _http: Http) { }

  findCityWeather(city) { 
        return this._http.get(this.weatherSearchURL + city)
            .map(response => {
                { return response.json() };
            })
            .catch(error => Observable.throw(error.json()));
    }


  findWeather(woeid) { 
        return this._http.get(this.weatherDetailURL + woeid)
            .map(response => {
                { return response.json() };
            })
            .catch(error => Observable.throw(error.json()));
    }

}
