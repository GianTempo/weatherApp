import { Component, OnInit } from '@angular/core';
import { WeatherService } from "./services/weather.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  constructor(private weather:WeatherService){

  }

  currentWeather:any;
  currentDegreeUnit:string = '°C'

  ngOnInit(){
    navigator.geolocation.getCurrentPosition(position => {
      this.weather.getWeatherByCoords(position.coords.latitude, position.coords.longitude).subscribe(
        res => { this.currentWeather = res }
      )
    })

  }

  getWeather(cityName:string, countryCode:string){
    this.weather.getWeatherByCityName(cityName, countryCode).subscribe(
      res => { this.currentWeather = res }
    )}

  submitLocation(cityName:HTMLInputElement, countryCode:HTMLInputElement, degreeUnit:HTMLSelectElement){
    this.weather.setUnit(degreeUnit.value)
    this.currentDegreeUnit = this.weather.getUnit()
    this.getWeather(cityName.value,countryCode.value)
    //Set values to empty
    cityName.value = ''
    countryCode.value = ''
    cityName.focus()
    return false
  }

}
