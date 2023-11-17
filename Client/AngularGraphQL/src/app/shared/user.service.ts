import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import gql from 'graphql-tag'
import {GET_USERS,CREATE_USER,UPDATE_USER,GET_USE_BY_ID,DELETE_USER} from '../shared/query.graphql'
import {User} from '../model/user'

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private apollo: Apollo) {}

  getUsers(): Observable<User[]> {
    return this.apollo
      .query<any>({
        query: GET_USERS, // Replace with your actual GraphQL query
        fetchPolicy: 'network-only', // Add this line
      })
      .pipe(
        map((result) => result.data.getAllUsers) // Adjust based on your GraphQL schema
      );
  }

  // getUsers(): Observable<User[]> {
  //   return this.apollo.watchQuery({
  //     query: GET_USERS,
  //   }).valueChanges.pipe(
  //     map((result:any) => result.data.getAllUsers) // Adjust based on your GraphQL schema
  //   );
  // }

  getUserById(id:string): Observable<User> {
    return this.apollo
      .query<any>({
        query: GET_USE_BY_ID, // Replace with your actual GraphQL query
        variables:{
          id:id
        }
      })   
      .pipe(
        map((result) => result.data.getUserById[0]) // Adjust based on your GraphQL schema
      );
  }

    createUser(input: User): Observable<any> {
    return this.apollo
      .mutate({
        mutation: CREATE_USER,
        variables: {
          firstName:input.firstName,
          lastName:input.lastName,
          email:input.email,
          username:input.username,
          password:input.password,
          mobile:input.mobile,
          state:input.state,
          city:input.city
        },
        refetchQueries: [{ query: GET_USERS }],
      })
      .pipe();
  }


  updateUser(input: User): Observable<any> {
    return this.apollo
      .mutate({
        mutation: UPDATE_USER,
        variables: {
          id:input.id,
          firstName:input.firstName,
          lastName:input.lastName,
          email:input.email,
          username:input.username,
          password:input.password,
          mobile:input.mobile,
          state:input.state,
          city:input.city
        },
        refetchQueries: [{ query: GET_USERS }],
      })
      .pipe();
  }

  deleteUser(id:string): Observable<any> {
    return this.apollo
      .mutate({
        mutation: DELETE_USER,
        variables: {
          id:id
        },
        refetchQueries: [{ query: GET_USERS }],
      })
      .pipe();
  }
}