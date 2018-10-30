import { Component, OnInit } from '@angular/core';
import { Observable, interval } from 'rxjs';
import { map } from 'rxjs/operators';
import { Apollo, QueryRef } from 'apollo-angular';
import gql from 'graphql-tag';
import {Router} from '@angular/router';



@Component({
  selector: 'file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit{
  sortableList: Number[] = [1,2,3,4,5,6]
  constructor() { }

  ngOnInit () {
    
  }
 

}