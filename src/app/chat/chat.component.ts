import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, ViewChild, ElementRef, AfterViewChecked, OnDestroy } from '@angular/core';
import {map, switchMap} from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Apollo, QueryRef } from 'apollo-angular';
import gql from 'graphql-tag';
import {FormControl, Validators} from '@angular/forms';
import {Router, ActivatedRoute, NavigationEnd} from '@angular/router';
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
  }
}
`;

const addNewDirMessage = gql`
  mutation createDirectMessage($receiverId:Int!, $text: String!) {
    createDirectMessage(receiverId: $receiverId, text: $text) 
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

  userId;
  reciverId;
  data: Observable<any>;
  dataQuery: QueryRef<any>;
  message = new FormControl({value:'', disabled: false});
  @ViewChild('scrollContainer') private myScrollContainer: ElementRef;

  constructor(private apollo: Apollo, private cdr: ChangeDetectorRef, private route: ActivatedRoute, private router: Router) { 
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
    ).subscribe()
    this.data = this.dataQuery.valueChanges.pipe(map(({data}) => data.directMessages));
  }
  
  ngOnInit() {
    console.log('Init chat')
    
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
  this.data.subscribe(() => this.cdr.markForCheck());
  this.subscribeToNewMessages();
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
    console.log(this.message.value, this.reciverId);
    this.apollo.mutate<any>({
      mutation: addNewDirMessage,
      variables: {
        text: this.message.value,
        receiverId: +this.reciverId
      },
    }).subscribe()
  
    this.message.setValue('');
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
}
}
