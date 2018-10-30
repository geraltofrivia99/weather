import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import {GraphqlService} from '../services/graphql/graphql.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavbarComponent implements OnInit {
  sideMenuShow: boolean = false;
  userId: number = +localStorage.getItem('userId');
  user: any;

  constructor(private gql: GraphqlService, private cdr: ChangeDetectorRef) {}
    ngOnInit() {
      this.user = this.gql.getUsers(this.userId).valueChanges.subscribe(({data: {user}}) => {this.user = user; this.cdr.markForCheck()});
    }
   
    openSideMenu() {
      this.sideMenuShow = !this.sideMenuShow
    }
    
  }
  