import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from 'shared';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {

  constructor(private tokenService:TokenService, private router: Router) {}

  isSidebarOpen = false;
  isProfileMenuOpen = false;

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  toggleProfileMenu() {
    this.isProfileMenuOpen = !this.isProfileMenuOpen;
  }
  
  logout() {
    this.tokenService.clearToken();
    this.router.navigate(['./home/login'])
  }
}
