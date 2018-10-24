import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Apollo, QueryRef } from 'apollo-angular';
import gql from 'graphql-tag';
import {Observable} from 'rxjs';
import { map, switchMap, filter } from 'rxjs/operators';
import {FormControl} from '@angular/forms';
import {TooltipPosition} from '@angular/material';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

const getuserFiles = gql`
  query userFiles {
    userFiles {
      id
      url
      type
      filename
      createdAt
      user {
        id
      }
    }
  }
`;

@Component({
  selector: 'app-file-modal',
  templateUrl: './file-modal.component.html',
  styleUrls: ['./file-modal.component.css'],
  encapsulation: ViewEncapsulation.None,
})

export class FileModalComponent implements OnInit {
  files;
  filesQuery: QueryRef<any>;
  positionOptions: TooltipPosition[] = ['below', 'above', 'left', 'right'];
  position = new FormControl(this.positionOptions[0]);
  constructor(private apollo: Apollo, private modalService: NgbModal) { }

  ngOnInit() {
    this.filesQuery = this.apollo.watchQuery({query: getuserFiles});
        this.files = this.filesQuery.valueChanges.pipe(
          map(({data}) => console.log(data.userFiles))).subscribe()
      }
  openVerticallyCentered(content) {
    this.modalService.open(content, { centered: true });
  }
}
