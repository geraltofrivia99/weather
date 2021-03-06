import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';

import { reducers, metaReducers } from './redux/reducers';

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
// import {ChatComponent} from './chat/chat.component';
import {FileUploadComponent} from './uploads/file-upload/file-upload.component';
import {FileListComponent} from './uploads/file-list/file-list.component';
import {MainPageComponent} from './pages/main-page/main-page.component';
import {NavbarComponent} from './navbar/navbar.component';
import {DialogContentExample, DialogContentExampleDialog} from './navbar/modals/modal.add_directuser';
import {RenderTextComponent} from './uploads/file-list/render-text/render-text.component';
// import {ImageFileComponent} from './chat/image-file/image-file.component';
// import {FileModalComponent} from './chat/file-modal/file-modal.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {FileService} from './services/files/file.service';
import {AudioComponent} from './ui/audio/audio.component';


import { AuthService } from './services/auth/auth.service';
import { GraphQLModule } from './graphql.module';
import {AuthGuard} from './services/auth.guard';

import {AngularFireModule} from 'angularfire2';
import {AngularFireDatabaseModule} from 'angularfire2/database';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { DropZoneDirective } from './uploads/drop-zone.directive';
import {FileSizePipe} from './uploads/file-size.pipe';
import {GraphqlService} from './services/graphql/graphql.service';

import {MaterialModule} from './material/material.module';
// import { DraggableModule } from './draggable/draggable.module';
import {DndModule} from '@beyerleinf/ngx-dnd';

export const config = {
  apiKey: "AIzaSyCPnJ7Uwq1d13lAdD3gxuj37gCcGPpEWQA",
    authDomain: "filestore-3f322.firebaseapp.com",
    databaseURL: "https://filestore-3f322.firebaseio.com",
    projectId: "filestore-3f322",
    storageBucket: "filestore-3f322.appspot.com",
    messagingSenderId: "646237054398"
}


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
    // ChatComponent,
    DropZoneDirective,
    FileUploadComponent,
    FileSizePipe,
    FileListComponent,
    MainPageComponent,
    DialogContentExample,
    DialogContentExampleDialog,
    RenderTextComponent,
    // ImageFileComponent,
    // FileModalComponent,
    AudioComponent,
    NavbarComponent,
    ProfileComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    EffectsModule.forRoot([WeatherEffects]),
    StoreDevtoolsModule.instrument({
      maxAge: 5
    }),
    BrowserAnimationsModule,
    MaterialModule,
    NgbModule,
    GraphQLModule,
    AngularFireModule.initializeApp(config),
    AngularFireDatabaseModule,
    AngularFireStorageModule,
    DndModule.forRoot(),
    // DraggableModule
  ],
  entryComponents: [DialogContentExample, DialogContentExampleDialog],
  providers: [
    WeatherService,
    UiService,
    AuthService,
    AuthGuard,
    FileService,
    GraphqlService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
