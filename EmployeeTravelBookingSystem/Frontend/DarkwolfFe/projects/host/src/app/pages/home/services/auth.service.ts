import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, tap, throwError } from 'rxjs'
import {ForgotPasswordRequest, LoginRequest, ResetPasswordRequest} from '@host/app/core/models/RequestModels';
import { TokenService } from 'shared';

@Injectable()
export class AuthService {

  private baseUrl = 'https://localhost:7070';

  constructor(private http:HttpClient, private tokenService:TokenService) {}

  login(requestData : LoginRequest) : Observable<boolean | any> {
    return this.http.post<{token:string}|{message:string}>(`${this.baseUrl}/api/auth/token`, requestData).pipe(
      tap(res => {
        if ('token' in res) this.tokenService.setToken(res.token);
      }),
      map(() => {
        return true;
      }),
      catchError(err => {
        switch (err.status)
        {
          case 400:
          case 401: return of(false);
        }
        return throwError(() => err.error);
      })
    );
  }

  forgotPassword(requestData: ForgotPasswordRequest) : Observable<boolean | any> {
    return this.http.post<{message:string}>(`${this.baseUrl}/api/auth/password/forgot`, requestData).pipe(
      map(() => {
        return true;
      }),
      catchError(err => {
        switch (err.status)
        {
          case 400:
          case 401: return of(false);
        }
        return throwError(() => err.error);
      })
    );
  }

  resetPassword(requestData: ResetPasswordRequest) : Observable<boolean | any> {
    return this.http.post<{message:string}>(`${this.baseUrl}/api/auth/password/reset`, requestData).pipe(
      map(() => {
        return true;
      }),
      catchError(err => {
        switch (err.status)
        {
          case 400:
          case 401: return of(false);
        }
        return throwError(() => err.error);
      })
    );
  }
}
