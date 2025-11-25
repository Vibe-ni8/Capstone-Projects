import { Component } from '@angular/core';
import { LoaderService, ToasterService } from 'shared';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {

  constructor(private spinner:LoaderService, private userService:UserService, private toasterService:ToasterService) {
    console.log('Dashboard_Profile - Initiated');
  }

  ngOnInit() {
    this.spinner.showMini();
    this.userService.getCurrentUserProfile().subscribe({
      next: res => {
        if (res) {
          console.log('Dashboard_Profile - Data fetch succeed');
          this.spinner.hideMini();
          this.user = res;
          this.user.profileImage= 'assets/logos/profile.jpg';
        }
        else {
          console.log('Dashboard - Data fetch failed - User not found');
          this.spinner.hideMini();
          this.toasterService.showError('User not Found - Log again to avoid fault data');
          this.user = this.defaultUser;
          this.user.name = 'User not found - Log again to avoid fault data';
        }
      },
      error: () => {
        console.log('Dashboard - Data fetch failed - Server error');
        this.spinner.hideMini();
        this.toasterService.showError('Server Error - Log again to avoid fault data');
        this.user = this.defaultUser;
        this.user.name = 'Server error - Log again to avoid fault data';
      }
    });
  }

  activeTab: string = 'overview';

  user: any = {
    name: 'Loading...',
    role: 'Loading...',
    department: 'Loading...',
    profileImage: 'assets/logos/profile.jpg',
    contact: {
      email: 'Loading...',
      phone: 'Loading...',
      location: 'Loading...'
    },
    organization: {
      reportingTo: { name: 'Loading...', email: 'Loading...', role: 'Loading...' },
      reportsToHim: [
        { name: 'Loading...', email: 'Loading...', role: 'Loading...' }
      ],
      homeManager: { name: 'Loading...', email: 'Loading...', role: 'Loading...' },
      workManager: { name: 'Loading...', email: 'Loading...', role: 'Loading...' }
    }
  };

  private defaultUser = {
    name: null,
    role: null,
    department: null,
    profileImage: 'assets/logos/profile.jpg',
    contact: {
      email: null,
      phone: null,
      location: null
    },
    organization: {
      reportingTo: null,
      reportsToHim: [],
      homeManager: null,
      workManager: null
    }
  };

  setTab(tab: string) {
    console.log('Dashboard_Profile - Set tab to :', tab);
    this.activeTab = tab;
  }

}
