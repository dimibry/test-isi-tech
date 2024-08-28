import { Injectable } from '@angular/core';
import * as data from '../../users.json';
import { User, UsersResponse } from "../models/user.interface";
import { delay, Observable, of, throwError } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor() { }

  getUsers(): Observable<UsersResponse> {
    // emulate get users
    return of(data as UsersResponse).pipe(delay(500))
  }

  addUser(user: User): Observable<User> {
    return of(user).pipe(delay(500));

    // *** ATTENTION - if you want to emulate server side error ***
    return throwError(() => ({
      status: 0,
      errors: {
        email: 'Email already exists.',
        password: 'Password too long.'
      }
    })).pipe(delay(500));
  }

  updateUser(user: User) {
    // emulate put request
    return of(user).pipe(delay(500));

    // *** ATTENTION - if you want to emulate server side error ***
    return throwError(() => ({
      status: 0,
      errors: {
        email: 'Email already exists.',
      }
    })).pipe(delay(500));
  }

  deleteUser(user: User): Observable<{ status: number }> {
    // in real world scenario we pass userId here
    return of({ status: 1 }).pipe(delay(500));

    // *** ATTENTION - if you want to emulate server side error ***
    return throwError(() => ({
      status: 0,
      message: 'User didn\'t find in database.'
    })).pipe(delay(500));
  }
}
