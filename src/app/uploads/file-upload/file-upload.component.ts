import { Component, OnInit } from '@angular/core';
import { AngularFireStorage, AngularFireUploadTask } from 'angularfire2/storage';
import { Observable, interval } from 'rxjs';
import { map } from 'rxjs/operators';
import { Apollo, QueryRef } from 'apollo-angular';
import gql from 'graphql-tag';
import {Router} from '@angular/router';

const addFile = gql`
  mutation createFile($url: String!, $userId: Int!, $type: String!, $name: String!) {
    createFile(url: $url, userId: $userId, type: $type, name: $name) {
      id
      createdAt
      url
      type
    }
  }
`;
const getuserFiles = gql`
  query userFiles($userId: Int!) {
    userFiles(userId:$userId) {
      id
      url
      type
      name
    }
  }
`;
const getFiles = gql`
  query files {
    files {
      id
      url
      type
      name
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
  selector: 'file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit{
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
  constructor(private storage: AngularFireStorage, private apollo: Apollo, private route: Router) { }

  ngOnInit () {
    this.userId = localStorage.getItem('userId');
  }
  toggleHover(event: boolean) {
    this.isHovering = event;
  }


  startUpload(event: FileList) {
    // The File object
    const file = event.item(0);
    // Client-side validation example
    // if (file.type.split('/')[0] !== 'image') { 
    //   console.error('unsupported file type :( ')
    //   return;
    // }
    console.log(event.item(0))
    this.apollo.mutate<any>({
                mutation: UPLOAD_FILE,
                variables: {
                  file
                },
              })
              .subscribe((data) => console.log(data))
    
    // The storage path
    // const path = `${this.userId}/${new Date().getTime()}_${file.name}`;
    
    // // Totally optional metadata
    // const customMetadata = { app: 'My AngularFire-powered PWA!' };

    // // The main task
    // this.task = this.storage.upload(path, file, { customMetadata });
    

    // Progress monitoring
    // this.percentage = this.task.percentageChanges();
    // this.snapshot = this.task.snapshotChanges();
    
    // The file's download URL
    // this.downloadURL = this.storage.ref(path).getDownloadURL();
    // this.task.percentageChanges().subscribe(data => {
    //   if (data === 100) {
    //     this.downloadURL = this.storage.ref(path).getDownloadURL();
    //     this.urlSubsc = this.storage.ref(path).getDownloadURL().subscribe(data => {
    //       if (typeof data === 'string') {
    //         this.apollo.mutate<any>({
    //           mutation: addFile,
    //           variables: {
    //             url: data,
    //             userId: Number(this.userId),
    //             type: "Doc",
    //             name: file.name
    //           },
    //           update: (store, { data: { createFile } }) => {
    //             // Read the data from the cache for this query.
    //             const data = store.readQuery({query: getFiles });
    //             // Add our channel from the mutation to the end.
    //             console.log(data);
    //             console.log(createFile);
    //             // data.messages.edges.splice(0,0,createMessage);
    //             // console.log(data.messages);
    //             // Write the data back to the cache.
    //             store.writeQuery({ query: getFiles, data });
        
    //           },
    //         })
    //         .subscribe()
    //       }
    //     })
        // this.downloadURL.subscribe(data => console.log(data));
        // this.apollo.mutate<any>({
        //   mutation: addFile,
        //   variables: {
        //     url: this.downloadURL,
        //     userId: Number(this.userId),
        //     type: "Doc"
        //   },
        //   update: (store, { data: { createMessage } }) => {
        //     // Read the data from the cache for this query.
        //     const data = store.readQuery({query: getMessages });
        //     // Add our channel from the mutation to the end.
        //     console.log(data.messages);
        //     console.log(createMessage);
        //     data.messages.edges.splice(0,0,createMessage);
        //     // console.log(data.messages);
        //     // Write the data back to the cache.
        //     store.writeQuery({ query: getMessages, data });
    
            
        //   },
        // })
        // .subscribe()
    //   }
    // })
    // this.downloadURL.subscribe(data => console.log(data));
  }
  
  // Determines if the upload task is active
  isActive(snapshot) {
    return snapshot.state === 'running' && snapshot.bytesTransferred < snapshot.totalBytes
  }

}