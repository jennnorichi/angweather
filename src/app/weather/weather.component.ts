import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.css']
})
export class WeatherComponent implements OnInit {
	
	@Input()
  cityName: string = "";

	@Input()
  temperature: string = "";

	@Input()
  minTemperature: string = "";

	@Input()
  maxTemperature: string = "";

	@Input()
  weatherIcon: string = "";

  constructor() { }

  ngOnInit() {
  }

}
