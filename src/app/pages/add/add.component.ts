import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as fromRoot from '../../redux/reducers';
import * as fromActions from '../../redux/actions';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddComponent implements OnInit {

  city: string = " ";
  cities: Observable<string[]>;

  constructor(private store: Store<fromRoot.State>) {
    this.cities = store.select(fromRoot.getCities);
    
  }

  ngOnInit() {
  }
  addCity() {
    this.store.dispatch(new fromActions.AddCities(this.city));
    this.city = "";
  }
  
}
