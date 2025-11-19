import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ToasterService, TokenService } from 'shared';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {

  constructor(private tokenService:TokenService, private router: Router, private toasterService:ToasterService) {
    console.log('Dashboard_Navbar - Initiated');
  }

  @Input() username: string = '';
  @Input() email: string = '';
  @Input() tabName: string | null = null;

  isSidebarOpen:boolean = false;
  isProfileMenuOpen:boolean = false;
  isProfilePlateOpen:boolean = false;
  isSettingPlateOpen:boolean = false;

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
    this.isProfileMenuOpen = false;
    this.isProfilePlateOpen = true;
  }

  openSettingPlate() {
    this.isProfileMenuOpen = false;
    this.isSettingPlateOpen = true;
  }

  closePlate() {
    this.isProfilePlateOpen = false;
    this.isSettingPlateOpen = false;
  }

  logout() {
    console.log('Dashboard_Navbar - Logout triggered');
    this.tokenService.clearToken();
    this.toasterService.showWarn('Logged Out');
    this.router.navigate(['/home/login'])
  }

}
