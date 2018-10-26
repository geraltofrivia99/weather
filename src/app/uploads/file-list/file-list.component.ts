import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth/auth.service';
import {Observable} from 'rxjs';
import { map, switchMap, filter } from 'rxjs/operators';
import { AngularFireStorage, AngularFireUploadTask } from 'angularfire2/storage';
import { Apollo, QueryRef } from 'apollo-angular';
import gql from 'graphql-tag';


// const createFile = gql`
//   mutation createFile($url: String!, $userId: Int!, $type: String!, $name: String!) {
//     createFile(url: $url, userId: $userId, type: $type, name: $name) {
//       id
//       createdAt
//       url
//       type
//     }
//   }
// `;

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
export const UPLOAD_FILE = gql`
  mutation singleUpload($file: Upload!) {
    singleUpload(file: $file) {
      filename
    }
  }
`;

@Component({
  selector: 'app-file-list',
  templateUrl: './file-list.component.html',
  styleUrls: ['./file-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FileListComponent implements OnInit {
  files: Observable<any>;
  userId;
  // Main task 
  task: AngularFireUploadTask;

  // Progress monitoring
  percentage: Observable<number>;

  snapshot: Observable<any>;

  // Download URL
  downloadURL: Observable<string>;

  // State for dropzone CSS toggling
  isHovering: boolean;
  urlSubsc;
  filesQuery: QueryRef<any>;
  constructor(public router: Router, private auth: AuthService, private storage: AngularFireStorage, private apollo: Apollo, private cdr: ChangeDetectorRef) { 
    
  }

  ngOnInit() {
    this.filesQuery = this.apollo.watchQuery({query: getuserFiles});
    this.files = this.filesQuery.valueChanges.pipe(
      map(({data})=> {
        console.log(data)
        this.userId = data.userFiles[0].id
        return data.userFiles
      })
    )
  }
  // goToFile() {
  //   this.route.navigateByUrl(`/files/${this.userId}`);
  // }
  toggleHover(event: boolean) {
    this.isHovering = event;
  }

  startUpload(event: FileList) {
   
    const file = event.item(0);
    
    console.log(event.item(0))
    this.apollo.mutate<any>({
      mutation: UPLOAD_FILE,
      variables: {
        file
      },
      refetchQueries: [{
        query: getuserFiles,
      }],
    }).subscribe((data) => console.log(data))
  }
  checkedType(type) {
    if (type.indexOf('image/') > -1) {
      return 'image'
    }
    if (type.indexOf('text/') > -1) {
      return 'text'
    }
    if (type.indexOf('audio/') > -1) {
      return 'audio'
    }
  }
  RenderText(url) {
    console.log(url)
  }
  isActive(snapshot) {
    return snapshot.state === 'running' && snapshot.bytesTransferred < snapshot.totalBytes
  }
}
 // update: (store, { data: { createFile } }) => {
              
              // const data = store.readQuery({ query: getuserFiles, variables: {userId: this.userId} });
              // // Add our channel from the mutation to the end.
              // console.log('1', data.userFiles);
              // console.log(createFile);
              // data.userFiles.push(createFile);
              // console.log('2',data.userFiles);
              // // Write the data back to the cache.
              // store.writeQuery({ query: getuserFiles, variables: {userId: this.userId}, data });
              //   },
              // startUpload(event: FileList) {
              //   // The File object
              //   const file = event.item(0);
              //   // Client-side validation example
              //   // if (file.type.split('/')[0] !== 'image') { 
              //   //   console.error('unsupported file type :( ')
              //   //   return;
              //   // }
              //   console.log(event);
              //   // The storage path
              //   const path = `${this.userId}/${new Date().getTime()}_${file.name}`;
                
              //   // Totally optional metadata
              //   const customMetadata = { app: 'My AngularFire-powered PWA!' };
            
              //   // The main task
              //   this.task = this.storage.upload(path, file, { customMetadata });
                
            
              //   // Progress monitoring
              //   this.percentage = this.task.percentageChanges();
              //   this.snapshot = this.task.snapshotChanges();
              //   this.percentage.pipe(
              //     filter(per => per === 100),
              //     switchMap(() => this.storage.ref(path).getDownloadURL()),
              //     switchMap(url => 
              //       this.apollo.mutate<any>({
              //                 mutation: createFile,
              //                 variables: {
              //                   url,
              //                   userId: this.userId,
              //                   type: "Doc",
              //                   name: file.name,
              //                 },
              //                 refetchQueries: [{
              //                   query: getuserFiles,
              //                   variables: { userId: Number(this.userId) },
              //                 }],
              //               }))
              //   ).subscribe();
              // }