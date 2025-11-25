import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, of, tap, throwError } from 'rxjs';
import { UserInfo, UserProfile } from '@host/app/core/models/ResponseModels';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = 'https://localhost:7070';

  constructor(private http:HttpClient,  private router:Router) { }

  getCurrentUser() : Observable<boolean | UserInfo> {
    return this.http.get<UserInfo>(`${this.baseUrl}/api/user/current/info`).pipe(
      tap(res => {
        console.log('User Service - Fetched: Current Logged User info', res);
      }),
      catchError(err => {
        switch (err.status)
        {
          case 401: this.router.navigate(['/home/login']); return of(false);
          case 404: return of(false);
        }
        return throwError(() => err.error);
      })
    );
  }

  getCurrentUserProfile() : Observable<boolean | UserProfile> {
    return this.http.get<UserProfile>(`${this.baseUrl}/api/user/current/info/all`).pipe(
      tap(res => {
        console.log('User Service - Fetched: Current Logged User profile info', res);
      }),
      catchError(err => {
        switch (err.status)
        {
          case 401: this.router.navigate(['/un-authorized']); return of(false);
          case 404: return of(false);
        }
        return throwError(() => err.error);
      })
    );
  }
}
