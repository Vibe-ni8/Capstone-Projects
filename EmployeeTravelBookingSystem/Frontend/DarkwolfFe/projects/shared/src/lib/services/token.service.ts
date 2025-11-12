import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { 
    let token = this.getToken();
    if (token)
      this.decodedToken = jwtDecode(token);
  } 

  private decodedToken: any;

  public setToken(token: string) {
    localStorage.setItem('authToken', token);
    this.decodedToken = jwtDecode(token);
  }

  public getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  public clearToken() {
    this.decodedToken = null;
    localStorage.removeItem('authToken')
  }

  public isTokenExpired(): boolean {
    if (!this.decodedToken) return true;

    const exp = this.decodedToken.exp;
    if (!exp) return false; // some tokens may not have expiry

    const now = Math.floor(Date.now() / 1000);
    return exp < now;
  }

  public getCurrentUserId(): string | null {
    if (this.decodedToken)
    {
      return this.decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"];
    }
    return null;
  }

  public getCurrentUserRole(): string | null {
    if (this.decodedToken)
    {
      return this.decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
    }
    return null;
  }

}
