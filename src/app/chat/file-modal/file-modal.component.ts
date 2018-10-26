import { Component, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';
import { Apollo, QueryRef } from 'apollo-angular';
import gql from 'graphql-tag';
import {Observable, of, Subscription} from 'rxjs';
import {switchMap} from 'rxjs/operators';
import {FileService} from '../../services/files/file.service';
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

export class FileModalComponent implements OnInit, OnDestroy {
  files: Subscription;
  filesQuery: QueryRef<any>;
  images:Array<object> = [];
  musics:Array<object> = [];
  documents:Array<object> = [];
  choosenFile: object;

  constructor(private apollo: Apollo, private modalService: NgbModal, private fs: FileService) { }

  ngOnInit() {
    this.filesQuery = this.apollo.watchQuery({query: getuserFiles});
        this.files = this.filesQuery.valueChanges.pipe(
          switchMap(({data: {userFiles}}) => userFiles.filter(f => {
            if (f.type.indexOf('image/') > -1) {
              this.images = [...this.images, f]
            }
            if (f.type.indexOf('audio/') > -1) {
              this.musics = [...this.musics, f]
            }
            if (f.type.indexOf('text/') > -1) {
              this.documents = [...this.documents, f]
            }
          }))
        ).subscribe()
      }
  openVerticallyCentered(content) {
    this.modalService.open(content, { centered: true }).result.then(() => {
      this.fs.setChoosenFile(this.choosenFile);
    },
    () => {
      console.log('close');
    });
  }
  ngOnDestroy() {
    this.files.unsubscribe();
  }
}
