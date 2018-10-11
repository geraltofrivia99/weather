import {NgModule} from '@angular/core';
import {ApolloModule, APOLLO_OPTIONS} from 'apollo-angular';
import {HttpLinkModule, HttpLink} from 'apollo-angular-link-http';
import {InMemoryCache} from 'apollo-cache-inmemory';
import { SubscriptionClient } from 'subscriptions-transport-ws';
import { getMainDefinition } from 'apollo-utilities';
import { split } from 'apollo-link';
import { WebSocketLink } from "apollo-link-ws";
import { setContext } from 'apollo-link-context';
import { ApolloLink, from } from 'apollo-link';
import { HttpHeaders } from '@angular/common/http';


const uri = 'http://localhost:8000/graphql'; // <-- add the URL of the GraphQL server here
const ws = new SubscriptionClient(`ws://localhost:8000/graphql`,{
  reconnect: true
});

const authMiddleware = new ApolloLink((operation, forward) => {
  // add the authorization to the headers
  // we assume `headers` as a defined instance of HttpHeaders
  const token = localStorage.getItem('x-token');
  if (!token) return forward(operation);
  console.log('idet')
  operation.setContext({
    headers: new HttpHeaders().set('authorization', localStorage.getItem('x-token') || null)
  });
  return forward(operation);
})

// const auth = setContext((_, data) => {
//   console.log(data)
//   // get the authentication token from local storage if it exists
//   const token = localStorage.getItem('x-token');
//   // return the headers to the context so httpLink can read them
//   // in this example we assume headers property exists
//   // and it is an instance of HttpHeaders
//   if (!token) {
//     return {};
//   } else {
//     // return {
//     //   headers: headers.append('Authorization', `Bearer ${token}`)
//     // };
//   }
// });

export function createApollo(httpLink: HttpLink) {
  const http = httpLink.create({uri})
  const wsClient = new WebSocketLink(ws);
  const link = split(
    // split based on operation type
    ({ query }) => {
      const { kind, operation } = getMainDefinition(query);
      return kind === 'OperationDefinition' && operation === 'subscription';
    },
    wsClient,
    http,
  ); 
  return {
    link: from([authMiddleware, link]),
    cache: new InMemoryCache(),
  };
}

@NgModule({
  exports: [ApolloModule, HttpLinkModule],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink],
    },
  ],
})
export class GraphQLModule {}

// import { NgModule } from '@angular/core';
// import { HttpClientModule, HttpClient } from '@angular/common/http';

// import { Apollo, ApolloModule } from 'apollo-angular';
// import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
// import { InMemoryCache } from 'apollo-cache-inmemory';
// import { split } from 'apollo-link';

// import { WebSocketLink } from 'apollo-link-ws';
// import { getMainDefinition } from 'apollo-utilities';

// @NgModule({
//   exports: [HttpClientModule, ApolloModule, HttpLinkModule]
// })
// export class GraphQLModule {
//   constructor(apollo: Apollo, private httpClient: HttpClient) {
//     const httpLink = new HttpLink(httpClient).create({
//       uri: 'http://localhost:8000/graphql'
//     });

//     const subscriptionLink = new WebSocketLink({
//       uri:
//         'ws://localhost:5000/',
//       options: {
//         reconnect: true,
//         connectionParams: {
//           authToken: localStorage.getItem('token') || null
//         }
//       }
//     });

//     const link = split(
//       ({ query }) => {
//         const { kind, operation } = getMainDefinition(query);
//         return kind === 'OperationDefinition' && operation === 'subscription';
//       },
//       subscriptionLink,
//       httpLink
//     );

//     apollo.create({
//       link,
//       cache: new InMemoryCache()
//     });
//   }
// }

