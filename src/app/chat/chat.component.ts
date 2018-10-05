import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import {map} from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Apollo, QueryRef } from 'apollo-angular';
import gql from 'graphql-tag';
import {FormControl, Validators} from '@angular/forms';
// import {SubscriptionService} from '../../subscription.service';


const getUsers = gql`
  query getUsers {
    users {
      id
      username
    }
  }
`;
const getMessages= gql`
query getMessages {
  messages {
    edges {
      id
      text
      createdAt
      user {
        id
        username
      }
    }
  }
}
`;
const addMessage = gql`
  mutation createMessage($text: String!, $userId: Int!) {
    createMessage(text: $text, userId: $userId) {
      id
      createdAt
      text
    }
  }
`;
const document = gql`
subscription {
  messageCreated {
    message {
      id
      text
      createdAt
      user {
        id
        username
      }
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
export class ChatComponent implements OnInit, AfterViewChecked {
  userId;
  data: Observable<any>;
  dataQuery: QueryRef<any>;
  message = new FormControl({value:'', disabled: false});
  @ViewChild('scrollContainer') private myScrollContainer: ElementRef;

  constructor(private apollo: Apollo, private cdr: ChangeDetectorRef) { 
    this.dataQuery = apollo.watchQuery({
      query: getMessages,
    });
    this.data = this.dataQuery.valueChanges.pipe(map(({data}) => data.messages.edges)); 
  }
  
  ngOnInit() {
    this.userId = localStorage.getItem('userId');
    this.subscribeToNewMessages();
    this.scrollToBottom();
  }
  ngAfterViewChecked() {        
    this.scrollToBottom();        
} 
  subscribeToNewMessages() {
    this.dataQuery.subscribeToMore({
      document,
      updateQuery: (prev, {subscriptionData}) => {
        if (!subscriptionData) {
          return prev;
        }
        return {
          ...prev,
          messages: {
            ...prev.messages, edges: [subscriptionData.data.messageCreated.message, ...prev.messages.edges,]
          }
        }
      }  
    })
  }
  onClickk(e) {
    e.preventDefault();
    this.apollo.mutate<any>({
      mutation: addMessage,
      variables: {
        text: this.message.value,
        userId: Number(this.userId)
      },
      // update: (store, { data: { createMessage } }) => {
      //   // Read the data from the cache for this query.
      //   const data = store.readQuery({query: getMessages });
      //   // Add our channel from the mutation to the end.
      //   console.log(data.messages);
      //   console.log(createMessage);
      //   data.messages.edges.splice(0,0,createMessage);
      //   // console.log(data.messages);
      //   // Write the data back to the cache.
      //   store.writeQuery({ query: getMessages, data });

        
      // },
    })
    .subscribe()
    // this.data.subscribe(data => console.log(data))
    this.message.setValue('');
  }
  scrollToBottom(): void {
    try {
        this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch(err) { }                 
}

}
