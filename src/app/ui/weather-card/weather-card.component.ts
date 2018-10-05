import {Component, OnDestroy, OnInit, Input, ChangeDetectionStrategy, ChangeDetectorRef} from '@angular/core';
import {Router} from '@angular/router';
import {WeatherService} from '../../services/weather/weather.service';
import {UiService} from '../../services/ui/ui.service';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../redux/reducers';
import * as fromActions from '../../redux/actions';
import {share} from 'rxjs/operators';

@Component({
  selector: 'app-weather-card',
  templateUrl: './weather-card.component.html',
  styleUrls: ['./weather-card.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WeatherCardComponent implements OnInit, OnDestroy {

  @Input() city: string;
  @Input() i: number;
  onDeleteElement: boolean;

  condition: string;
  currentTemp: number;
  maxTemp: number;
  minTemp: number;
  darkMode: boolean;

  constructor(public weather: WeatherService,
              public router: Router,
              public ui: UiService,
              private cdr: ChangeDetectorRef,
              public store: Store<fromRoot.State>) {
  }

  ngOnInit() {
    this.ui.darkModeState.subscribe((isDark) => {
      this.darkMode = isDark;
    });

    this.onDeleteElement = false;
    this.weather.getWeatherState(this.city)
      .subscribe((data: string) => {
        this.condition = data;
      });

    this.weather.getCurrentTemp(this.city).subscribe((data: number) => {
      this.currentTemp = data;
    });
    this.weather.getMinTemp(this.city).subscribe((data: number) => {
      this.minTemp = data;
    });
    this.weather.getMaxTemp(this.city).subscribe((data: number) => {
      this.maxTemp = data; this.cdr.markForCheck();
    });
  }
  
  ngOnDestroy() {
  }
  
  openDetails() {
    this.router.navigateByUrl(`/details/${this.city}`);
  }
  onDelete(e) {
    e.stopPropagation();
    this.onDeleteElement = true;
    setTimeout(() => {
      this.store.dispatch(new fromActions.RemoveCities(this.city));
    }, 500);
  }
  onBtnSelectClick(e) {
    e.stopPropagation();
  }

}
