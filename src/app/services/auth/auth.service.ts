import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {BehaviorSubject, Observable, ReplaySubject} from 'rxjs';
import { Apollo, QueryRef } from 'apollo-angular';
import { Router, ActivatedRoute } from '@angular/router';
import gql from 'graphql-tag';

interface myData {
  success: boolean,
  message: string,
  token?: string
}
const LoggedIn = gql`
  mutation signIn($login: String!, $password: String!) {
    signIn(login: $login, password: $password) {
      ok
      token
      refreshToken
      user{
        id
        username
      }
      errors {
        path
        message
      }
    }
  }
`;
const getUser = gql`
  query getUser($id: ID!) {
    user(id: $id) {
      id
      username
    }
  }
`;
const getUsers = gql`
  query getUsers {
    users {
      id
      username
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
      createdAt
    }
  }
`;

@Injectable()
export class AuthService {
  // private _isAuthenticated = new BehaviorSubject<boolean>(false);
  private _isAuthenticated: boolean = false;
  token;
  private userId: string = null;
  constructor(private http: HttpClient, private apollo: Apollo, private route: ActivatedRoute,
    private router: Router,) { }

  get isAuthenticated(): boolean {
    return this._isAuthenticated;
  }
  
  // saveUserData(id: string, token: string) {

  //   localStorage.setItem(, id);
  //   localStorage.setItem(, token);
  //   this.setUserId(id);
  // }
  setUserId(id: string) {
    this.userId = id;
    localStorage.setItem('userId', id);
    this._isAuthenticated = true;
  }

  LoginStart(login, password) {
    console.log(login, password)
    return this.apollo.mutate<any>({
      mutation: LoggedIn,
      variables: {
        login,
        password
      },
    })
  }
  isAuth() {
    const id = localStorage.getItem('userId');
    return this.apollo.watchQuery<any>({
      query: getUser,
      variables: {
        id: id
      }
    })
  }

  registerUser(user) {
    const { email, password } = user;
    return this.http.post<myData>('/api/login', {
      email,
      password,
    })
  }
  cons(payload){
    return console.log(payload.email);
  }

  getUserFiles(userId): QueryRef<any> {
    return this.apollo.watchQuery({
      query: getuserFiles,
      variables: {
        userId: Number(userId)
      }
    });
  }
  getUsers(): QueryRef<any> {
    return this.apollo.watchQuery({
      query: getUsers,
    });
  }
  getTextFromFile(url) {
    return this.http.get('http://localhost:8000/files/hello.txt', {responseType: 'text'})
  }
}