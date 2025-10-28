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
  isProfilePlateOpen = false;

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  closeSidebarIfOpen() {
    if (this.isSidebarOpen)
      this.isSidebarOpen = false;
  }

  toggleProfileMenu() {
    this.isProfileMenuOpen = !this.isProfileMenuOpen;
  }

  openProfilePlate() {
    this.isProfilePlateOpen = true;
  }

  closeProfilePlate() {
    this.isProfilePlateOpen = false;
  }

  onOverlayClick(event: MouseEvent) {
    // Prevent click inside panel from closing it
    event.stopPropagation();
  }

  logout() {
    this.tokenService.clearToken();
    this.router.navigate(['/home/login'])
  }

}
