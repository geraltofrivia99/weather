import {Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {WeatherService} from '../../services/weather/weather.service';
import {interval, fromEvent, from, of, Subject, Observable, zip, pipe, ReplaySubject, BehaviorSubject} from 'rxjs';
import {map, take, bufferCount, audit, buffer, auditTime, pluck, takeUntil, defaultIfEmpty,exhaust,first,mergeMap, mergeAll} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
// import Visibility from 'visibilityjs';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DetailsComponent implements OnInit {

  city: string;
  state: string;
  temp: number;
  hum: number;
  wind: number;

  today: string;

  day1Name: string;
  day1State: string;
  day1Temp: number;


  day2Name: string;
  day2State: string;
  day2Temp: number;

  day3Name: string;
  day3State: string;
  day3Temp: number;

  day4Name: string;
  day4State: string;
  day4Temp: number;

  day5Name: string;
  day5State: string;
  day5Temp: number;
  test: Subject<any> = new Subject();
  constructor(public activeRouter: ActivatedRoute, public weather: WeatherService, public http: HttpClient, private cdr: ChangeDetectorRef) {
    // interval(1000)
    //   .pipe(
    //   take(5),
    //   map(x => x + "!!!"),
    //   bufferCount(3),
    //   ).subscribe(console.log)
    // console.log(Obs$)
  }

  ngOnInit() {
    const todayNumberInWeek = new Date().getDay();
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    this.today = days[todayNumberInWeek];

    // const mySubject = new BehaviorSubject(2);
    
    //   mySubject.subscribe(x => {
    //     console.log('От первого sub:', x);
    //   });
    //   mySubject.next(5);
    //   mySubject.subscribe(x => {
    //     console.log('от второго sub:', x);
    //   });
    const obs = interval(1000).pipe(
    take(3),
    map((v) => Date.now()))

    obs.subscribe(v => console.log(this.test.next([v])));

    this.activeRouter.paramMap.subscribe((route: any) => {

      this.city = route.params.city;
      this.weather.getWeatherState(this.city).subscribe((state) => this.state = state);
      this.weather.getCurrentTemp(this.city).subscribe((temperature) => this.temp = temperature);
      this.weather.getCurrentHum(this.city).subscribe((humidity) => this.hum = humidity);
      this.weather.getCurrentWind(this.city).subscribe((windspeed) => this.wind = windspeed);
      this.getCurrentTemp2().subscribe((x) => console.log(x));
      this.weather.getForecast(this.city).subscribe((data: any) => {
        console.log(data);
        
        for (let i = 0; i < data.length; i++) {
          const date = new Date(data[i].dt_txt).getDay();
          console.log(days[date]);
          if (((date === todayNumberInWeek + 1) || (todayNumberInWeek === 6 && date === 0)) && !this.day1Name) {
            this.day1Name = days[date];
            this.day1State = data[i].weather[0].main;
            this.day1Temp = Math.round(data[i].main.temp);

          } else if (!!this.day1Name && !this.day2Name && days[date] !== this.day1Name) {
            this.day2Name = days[date];
            this.day2State = data[i].weather[0].main;
            this.day2Temp = Math.round(data[i].main.temp);

          } else if (!!this.day2Name && !this.day3Name && days[date] !== this.day2Name) {
            this.day3Name = days[date];
            this.day3State = data[i].weather[0].main;
            this.day3Temp = Math.round(data[i].main.temp);

          } else if (!!this.day3Name && !this.day4Name && days[date] !== this.day3Name) {
            this.day4Name = days[date];
            this.day4State = data[i].weather[0].main;
            this.day4Temp = Math.round(data[i].main.temp);

          } else if (!!this.day4Name && !this.day5Name && days[date] !== this.day4Name) {
            this.day5Name = days[date];
            this.day5State = data[i].weather[0].main;
            this.day5Temp = Math.round(data[i].main.temp);

          }
        }
      });

    });

  }
  getCurrentTemp2(): Subject<number> {
    const dataSubject = new Subject<number>();
    this.http.get(
      `https://api.openweathermap.org/data/2.5/weather?q=Moscow&units=metric&APPID=878e70c1c24efa3ede345ff0a2f09363`)
      .subscribe((weather: any) => {
        dataSubject.next(Math.round(Number(weather.main.temp)));
      });
      
    return dataSubject;
  }
  // getCurrentTemp3() {
  //   this.http.get(
  //     `https://api.openweathermap.org/data/2.5/weather?q=Moscow&units=metric&APPID=878e70c1c24efa3ede345ff0a2f09363`)
  //     .subscribe((data: any) => console.log(data.main.temp))
  // }
  // getCurrentTemp2 = async () => {
  //   const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=Moscow&units=metric&APPID=878e70c1c24efa3ede345ff0a2f09363`);
  //   const hello = await response.json();
  //   return (hello.main.temp)
  // };
  
}

