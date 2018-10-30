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
}