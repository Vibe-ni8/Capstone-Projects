import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenService } from '../services/token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {

  constructor(private tokenService:TokenService, private router:Router) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      console.log('Auth Guard - Can Activate - Initiated');
      return this.checkAccess();
  }

  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      console.log('Auth Guard - Can Activate Child - Initiated');
      return this.checkAccess();
  }

  private checkAccess(): boolean {
    const token = this.tokenService.getToken();

    // No token or expired → redirect
    if (!token || this.tokenService.isTokenExpired()) {
      this.router.navigate(['/home/login']);
      return false;
    }
    // ✅ Allowed
    return true;
  }
  
}
