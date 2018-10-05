import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as fromRoot from '../../redux/reducers';
import * as fromActions from '../../redux/actions';
import {WeatherService} from '../../services/weather/weather.service';


@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddComponent implements OnInit {

  city: string = "";
  cities: Observable<string[]>;
  error: string = "";

  constructor(private store: Store<fromRoot.State>, private cdr: ChangeDetectorRef, private ws: WeatherService) {
    this.cities = store.select(fromRoot.getCities);
    
  }

  ngOnInit() {
  }
  addCity() {
    if (this.city.length > 1) {
      this.ws.postCity(this.city).subscribe(data => {
        if (data.success) {
          this.store.dispatch(new fromActions.AddCities(this.city));
          this.city = "";
        } else {
          this.error = data.message;
          this.city = "";
        }
      })
    } 
    }
  
}
