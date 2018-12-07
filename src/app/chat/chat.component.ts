import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, ViewChild, ElementRef, AfterViewChecked, OnDestroy } from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {map, switchMap} from 'rxjs/operators';
import { Observable, Subscriber } from 'rxjs';
import { Apollo, QueryRef, Subscription } from 'apollo-angular';
import gql from 'graphql-tag';
import {FormControl, Validators} from '@angular/forms';
import {Router, ActivatedRoute, NavigationEnd} from '@angular/router';
import {FileService} from '../services/files/file.service';
// import {SubscriptionService} from '../../subscription.service';


const getDirectMessages= gql`
query getDirectMessages($otherUserId: Int!) {
  directMessages(otherUserId: $otherUserId) {
    id
    receiverId
    createdAt
    text
    sender {
      id
      username
    }
    url
    filetype
    fileUT {
      url
      type
    }
  }
}
`;

const addNewDirMessage = gql`
  mutation createDirectMessage($receiverId:Int!, $text: String, $file: Upload, $fileUT: SFile) {
    createDirectMessage(receiverId: $receiverId, text: $text, file: $file, fileUT: $fileUT) 
  }
`;

const document = gql`
subscription newDirectMessage($userId: Int!) {
  newDirectMessage(userId: $userId) {
    id
    receiverId
    createdAt
    text
    sender {
      id
      username
    }
    url
    filetype
    fileUT {
      url
      type
    }
  }
}
`;

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatComponent implements OnInit, AfterViewChecked, OnDestroy {
  navigationSubscription;
  localUrl;
  fileMessage: File;
  userId;
  reciverId;
  data: Observable<any>;
  dataQuery: QueryRef<any>;
  isHovering: boolean;
  message = new FormControl({value:'', disabled: false});
  choosenFileSubscriber;
  choosenFile: object;
  @ViewChild('scrollContainer') private myScrollContainer: ElementRef;

  constructor(private apollo: Apollo, private cdr: ChangeDetectorRef, private route: ActivatedRoute, private router: Router, private fs: FileService) { 
    this.navigationSubscription = this.router.events.subscribe((e: any) => {
      if (e instanceof NavigationEnd) {
        this.initialiseInvites();
      }
    });
    route.params.pipe(
      map(p => {
        this.reciverId = p.id;
        this.dataQuery = apollo.watchQuery({
        query: getDirectMessages,
        variables: {
          otherUserId: +p.id
        }
      })
    }),
    ).subscribe();
    this.data = this.dataQuery.valueChanges.pipe(map(({data}) => data.directMessages));
  }
  
  ngOnInit() {
    console.log('Init chat');
  }

  toggleHover(event: boolean) {
    this.isHovering = event;
  }

  async startUpload(event) {
    this.fileMessage = await event.item(0);
      this.apollo.mutate<any>({
        mutation: addNewDirMessage,
        variables: {
          receiverId: +this.reciverId,
          file: this.fileMessage || null,
        },
      }).subscribe()
    this.fileMessage = null;
  }
  ngAfterViewChecked() {        
    this.scrollToBottom();        
} 
  initialiseInvites() {
    this.userId = localStorage.getItem('userId');
    this.scrollToBottom();
    this.reciverId = this.route.snapshot.params.id;
    this.dataQuery = this.apollo.watchQuery({
      query: getDirectMessages,
      variables: {
        otherUserId: +this.reciverId
      }
    })
    this.data = this.dataQuery.valueChanges.pipe(map(({data}) => data.directMessages));
    this.subscribeToNewMessages();
    this.choosenFileSubscriber = this.fs.getFile().subscribe((file: any) => this.choosenFile = {url: file.url, type: file.type});
  }
  subscribeToNewMessages() {
    this.dataQuery.subscribeToMore({
      document,
      variables: {
        userId: +this.reciverId,
      },
      updateQuery: (prev, {subscriptionData}) => {
        if (!subscriptionData) {
          return prev;
        }
        console.log(prev)
        console.log(subscriptionData)
        console.log('message')
        return {
          ...prev,
          directMessages: [
            subscriptionData.data.newDirectMessage, ...prev.directMessages, 
          ]
        }
      }  
    })
  }
 
  onClickk(e) {
    e.preventDefault();
    
    console.log(this.choosenFile);
    this.apollo.mutate<any>({
      mutation: addNewDirMessage,
      variables: {
        text: this.message.value,
        receiverId: +this.reciverId,
        file: this.fileMessage || null,
        fileUT: this.choosenFile,
      },
    }).subscribe()
    
    this.message.setValue('');
    this.fileMessage = null;
    this.choosenFile = null;
  }
  scrollToBottom(): void {
    try {
        this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch(err) { }                 
}

  ngOnDestroy() {
    if (this.navigationSubscription) {  
      this.navigationSubscription.unsubscribe();
    }
    this.choosenFileSubscriber.unsubscribe();
  }
}
