import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material';
// import {FormBuilder, FormGroup} from '@angular/forms';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {startWith, map, switchMap, filter} from 'rxjs/operators';
import {AuthService} from '../../services/auth/auth.service';
import { Router, ActivatedRoute } from '@angular/router';

/**
 * @title Dialog with header, scrollable content and actions
 */

interface User {
  username: string,
  id: number
}

@Component({
  selector: 'adddialog-component',
  templateUrl: 'addDialog.button.html',
  styleUrls: ['addDialog.button.css'],
})
export class DialogContentExample implements OnInit{
  inputvalue = "hello";

  constructor(public dialog: MatDialog, public router: Router) {}

  ngOnInit() {
    
  }
  
  openDialog() {
    const dialogRef = this.dialog.open(DialogContentExampleDialog);

    dialogRef.afterClosed().subscribe(id => {
      this.router.navigateByUrl(`/chat/${id}`)
    });
  }
}

@Component({
  selector: 'modal-add-direct-message',
  templateUrl: 'modal-add-direct-message.html',
})
export class DialogContentExampleDialog implements OnInit {
  myControl = new FormControl();
  options = [];
  filteredOptions: Observable<string[]>;
  proxyValue: any;
  id;

  constructor(public dialog: MatDialog, public as: AuthService) {}

  ngOnInit() {
    this.as.getUsers().valueChanges.pipe(
      map(({data: {users}}) => users.map(user => this.options.push(user))),
    ).subscribe();

    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map((project:User) => project && typeof project === 'object' ? project.username : project),
      map(value => this._filter(value))
    );
  }
  private _filter(value) {
    return value ? this.options.filter(s => s.username.toLowerCase().indexOf(value.toLowerCase()) === 0)
    : this.options;
  }
  getName(value?) {
    const id = value;
    // const this.filteredOptions = 'can't be accessed'
    return value.name || null;
  }
  onSelectionChanged(event$) {
    this.id = event$.option.value.id;
    this.proxyValue = event$.option.value.username;
  }
}