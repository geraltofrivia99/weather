import { Injectable } from '@angular/core';
import { Apollo, QueryRef } from 'apollo-angular';
import gql from 'graphql-tag';

const GET_USER = gql`
  query getUser($id: ID!) {
    user(id: $id) {
      id
      username
      directMessageMembers{
        username
        id
      }
    }
  }
`;
const GET_PROFILE = gql`
  query geMe {
    me {
      id
      username
      email
      role
      files {
        id
        size
      }
    }
  }
`;
export const SUBSCRIPTION_MESSAGE = gql`
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

@Injectable()
export class GraphqlService {

  constructor(private apollo: Apollo) { }

  getUsers(id): QueryRef<any> {
    return this.apollo.watchQuery({
      query: GET_USER,
      variables: {
        id
      }
    });
  }
  getMe(): QueryRef<any> {
    return this.apollo.watchQuery({
      query: GET_PROFILE
    });
  }
}