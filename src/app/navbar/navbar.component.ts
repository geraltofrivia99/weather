import { Component, OnInit } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  sideMenuShow: boolean = false;

  constructor() {}
    ngOnInit() {
      
    }
   
    openSideMenu() {
      this.sideMenuShow = !this.sideMenuShow
    }
    
  }
  