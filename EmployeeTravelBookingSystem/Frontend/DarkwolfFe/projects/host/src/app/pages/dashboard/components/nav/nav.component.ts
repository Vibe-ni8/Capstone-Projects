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
  isSettingPlateOpen = false;

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  toggleProfileMenu() {
    this.isProfileMenuOpen = !this.isProfileMenuOpen;
  }

  closeMenusIfOpen() {
    this.closeSidebarIfOpen();
    this.closeProfileMenuIfOpen();
  }
  private closeSidebarIfOpen() {
    if (this.isSidebarOpen)
      this.isSidebarOpen = false;
  }
  private closeProfileMenuIfOpen() {
    if (this.isProfileMenuOpen)
      this.isProfileMenuOpen = false;
  }

  openProfilePlate() {
    this.isProfilePlateOpen = true;
  }

  openSettingPlate() {
    this.isSettingPlateOpen = true;
  }

  closePlate() {
    this.isProfilePlateOpen = false;
    this.isSettingPlateOpen = false;
  }

  logout() {
    this.tokenService.clearToken();
    this.router.navigate(['/home/login'])
  }

}
