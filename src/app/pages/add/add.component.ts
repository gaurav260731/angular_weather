import {Component, OnInit} from '@angular/core';
import { FormsModule } from '@angular/forms';
import {Router} from '@angular/router';
import {WeatherService} from '../../services/weather/weather.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})

export class AddComponent implements OnInit {

  city_name:string;
  condition: string;
  minTemp:any;
  curtemp:any;
  maxTemp:any;

  constructor(public weather:WeatherService, public router:Router) {
  }

  ngOnInit() {
    
  }

  city() {
    this.weather.getWeatherState(this.city_name)
    .subscribe((data: string) => {
      this.condition = data;
      localStorage.setItem('curcond', this.condition);
    });

    localStorage.setItem('curname',this.city_name);
    this.weather.getCurrentTemp(this.city_name).subscribe((data: number) => {
      this.curtemp = data;
      localStorage.setItem('curtemp', this.curtemp);  
    });
    this.weather.getMinTemp(this.city_name).subscribe((data: number) => {
      this.minTemp = data;
      localStorage.setItem('curmin', this.minTemp);
    });
    this.weather.getMaxTemp(this.city_name).subscribe((data: number) => {
      this.maxTemp = data;
      localStorage.setItem('curmax', this.maxTemp);
    });
    
    this.openDetails()
  }

  openDetails() {
    this.router.navigateByUrl('/details/'+this.city_name);
  }

}
