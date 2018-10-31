import { Injectable } from '@angular/core';
import { Apollo, QueryRef } from 'apollo-angular';
import gql from 'graphql-tag';

const getUser = gql`
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

@Injectable()
export class GraphqlService {

  constructor(private apollo: Apollo) { }

  getUsers(id): QueryRef<any> {
    return this.apollo.watchQuery({
      query: getUser,
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