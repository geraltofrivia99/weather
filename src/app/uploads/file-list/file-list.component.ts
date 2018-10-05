import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-file-list',
  templateUrl: './file-list.component.html',
  styleUrls: ['./file-list.component.css']
})
export class FileListComponent implements OnInit {

  constructor(public router: Router) { }

  ngOnInit() {
  }
  // openDetails() {
  //   this.router.navigateByUrl(`/details/${}`);
  // }
}
