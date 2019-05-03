import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {WeatherService} from '../../services/weather/weather.service';
import {UiService} from '../../services/ui/ui.service';

@Component({
  selector: 'app-weather-card',
  templateUrl: './weather-card.component.html',
  styleUrls: ['./weather-card.component.css']
})
export class WeatherCardComponent implements OnInit, OnDestroy {

  condition: string;
  currentTemp: number;
  maxTemp: number;
  minTemp: number;
  humidity: number;
  darkMode: boolean;
  curtemp: any;
  curname: string;
  name:string;
  curmin:any;
  curmax:any;
  curcond:any;

  constructor(public weather: WeatherService,
              public router: Router,
              public ui: UiService) {
  }

  ngOnInit() {
   
    this.ui.darkModeState.subscribe((isDark) => {
      this.darkMode = isDark;
    });

    this.weather.getWeatherState('bangalore')
      .subscribe((data: string) => {
        console.log(data);
        this.curcond = localStorage.getItem('curcond');
        if(this.curcond) {
          this.condition = this.curcond;
        } else {
          this.condition = data;
        }
        
      });

    this.weather.getCurrentTemp('Bangalore').subscribe((data: number) => {
      this.curtemp = localStorage.getItem('curtemp');
      if(this.curtemp) {
        this.currentTemp = this.curtemp;
      }else {
        this.currentTemp = data;
      }   
    });
    this.weather.getMinTemp('Bangalore').subscribe((data: number) => {
      this.curmin = localStorage.getItem('curmin');
      if(this.curmin) {
        this.minTemp = this.curmin;
      } else {
        this.minTemp = data;
      }
      
    });
    this.weather.getMaxTemp('Bangalore').subscribe((data: number) => {
      this.curmax = localStorage.getItem('curmax');
      if(this.curmax){
        this.maxTemp = this.curmax;
      }else {
        this.maxTemp = data;
      }

    });
    this.weather.getCurrentHum('bangalore').subscribe((data: number) => {
      this.humidity = data;
    });

    this.weather.getWeatherName('bangalore').subscribe((data: string) => {
      this.curname = localStorage.getItem('curname');
      if(this.curname) {
        this.name  = this.curname;
      }else {
      this.name = data;
      }
    });
  }

  ngOnDestroy() {

  }

  openDetails() {
    this.router.navigateByUrl('/details/bangalore');
  }

  

}
