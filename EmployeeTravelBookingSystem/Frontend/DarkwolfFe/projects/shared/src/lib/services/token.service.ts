import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { } 

  public setToken(token: string) {
    localStorage.setItem('authToken', token);
  }

  public getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  public clearToken() {
    localStorage.removeItem('authToken')
  }
}
