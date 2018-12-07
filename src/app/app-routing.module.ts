import {NgModule} from '@angular/core';
import {RouterModule, Routes, PreloadAllModules} from '@angular/router';
import {HomeComponent} from './pages/home/home.component';
import {DetailsComponent} from './pages/details/details.component';
import {AddComponent} from './pages/add/add.component';
import {LoginComponent} from './pages/login/login.component';
import {SignupComponent} from './pages/signup/signup.component';
// import {ChatComponent} from './chat/chat.component';
import {AuthGuard} from './services/auth.guard';
import {MainPageComponent} from './pages/main-page/main-page.component';
import {FileListComponent} from './uploads/file-list/file-list.component';
import {FileUploadComponent} from './uploads/file-upload/file-upload.component';
import {ProfileComponent} from './pages/profile/profile.component';


const routes: Routes = [
  {
  path: '',
  component: MainPageComponent,
  canActivate: [AuthGuard], 
  children: [
    { path: '', component: LoginComponent },
    { path: 'signup', component: SignupComponent },
  ]
  },
  // {
  //   path: 'files/:id',
  //   component: FileListComponent,
    
  // },
  {
    path: 'home',
    component: HomeComponent,
    children: [
      {
        path: 'profile',
        component: ProfileComponent,
        data: { animation: 'hero' }
      },
      {
        path: 'files',
        component: FileListComponent,
        data: { animation: 'heroes' }
      },
      {
        path: 'chat/:id',
        data: { animation: 'hero' },
        loadChildren: './chat/chat.module#ChatModule',
      },
    ]
  },
  {path: 'details/:city', component: DetailsComponent},
  {path: 'add', component: AddComponent},
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'upload', component: FileUploadComponent},
  { path: '**', component: MainPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
