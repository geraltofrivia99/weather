import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';

import { reducers, metaReducers } from './redux/reducers';
import { effects } from './redux/effects';
import { WeatherEffects } from './redux/effects/weather.effects'

import {HomeComponent} from './pages/home/home.component';
import {DetailsComponent} from './pages/details/details.component';
import {WeatherService} from './services/weather/weather.service';
import {HttpClientModule} from '@angular/common/http';
import {WeatherCardComponent} from './ui/weather-card/weather-card.component';
import {AddCardComponent} from './ui/add-card/add-card.component';
import {AddComponent} from './pages/add/add.component';
import {LoginComponent} from './pages/login/login.component';
import {SignupComponent} from './pages/signup/signup.component';
import {UiService} from './services/ui/ui.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DetailsComponent,
    WeatherCardComponent,
    AddCardComponent,
    AddComponent,
    LoginComponent,
    SignupComponent,
    AddCardComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    EffectsModule.forRoot([WeatherEffects]),
    StoreDevtoolsModule.instrument({
      maxAge: 5
    }),
    BrowserAnimationsModule,
    MatInputModule,
    MatButtonModule,
    MatSlideToggleModule,
    MatIconModule,
    MatMenuModule
  ],
  providers: [
    WeatherService,
    UiService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
