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
    console.log('Dashboared_Profile - Initiated');
  }

  ngOnInit() {
    this.spinner.showMini();
    this.userService.getCurrentUserProfile().subscribe({
      next: res => {
        if (res) {
          console.log('Dashboared_Profile - Data fetch succeed');
          this.spinner.hideMini();
          this.user = res;
          this.user.profileImage= 'assets/logos/profile.jpg';
        }
        else {
          console.log('Dashboared - Data fetch failed - User not found');
          this.spinner.hideMini();
          this.toasterService.showError('User not Found - Log again to avoid fault data');
          this.user = this.defaultUser;
          this.user.name = 'User not found - Log again to avoid fault data';
        }
      },
      error: () => {
        console.log('Dashboared - Data fetch failed - Server error');
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
    profileImage: 'assets/logos/profile.jpg',
    contact: {
      email: 'Loading...',
      phone: 'Loading...',
      location: 'Loading...'
    },
    organization: {
      reportingTo: {
        name: 'Loading...',
        role: 'Loading...'
      },
      reportsToHim: [
        { name: 'Loading...', role: 'Loading...' }
      ]
    }
  };

  private defaultUser = {
    name: '',
    role: '',
    profileImage: 'assets/logos/profile.jpg',
    contact: {
      email: '',
      phone: '',
      location: ''
    },
    organization: {
      reportingTo: null,
      reportsToHim: []
    }
  };

  setTab(tab: string) {
    console.log('Dashboared_Profile - Set tab to :', tab);
    this.activeTab = tab;
  }

}
