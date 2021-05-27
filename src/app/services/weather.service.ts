import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  APIkey: string = '062b62f809cee705692067e817919d04'
  URI: string = '';
  UNIT: string = 'metric'
  constructor(private httpClient:HttpClient) {
    this.URI = `https://api.openweathermap.org/data/2.5/weather?appid=${this.APIkey}&`

   }

   setUnit (unit:string){
    this.UNIT = unit;
   }  

   getUnit(){
    if (this.UNIT == "metric"){
      return "°C"
    }
    else if (this.UNIT == "imperial"){
      return "°F"
    }
    return "K"
   }

   getWeatherByCityName (cityName:string, countryCode:string){ 
    if (cityName && !countryCode){
      return this.httpClient.get(`${this.URI}q=${cityName}&units=${this.UNIT}`)
    }
    return this.httpClient.get(`${this.URI}q=${cityName},${countryCode}&units=${this.UNIT}`)
  }
  
   getWeatherByCoords (lat:number, lon:number){
     return this.httpClient.get(`${this.URI}lat=${lat}&lon=${lon}&units=metric`)
   }
}
