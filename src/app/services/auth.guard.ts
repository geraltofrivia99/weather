import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth/auth.service';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, public router: Router) {

  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.isAuth();
  }
  isAuth() {
    const token = localStorage.getItem('x-token')
    if (this.auth.isAuthenticated || token) { 
      this.auth.isAuth().valueChanges.subscribe(({data: {user: {id}}}) => this.router.navigateByUrl(`/files/${id}`));
      return true;
    } else return false;
  }
}
