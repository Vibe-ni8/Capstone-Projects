import { Component } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {

  activeTab: string = 'overview';

  user = {
    name: 'John Doe',
    role: 'Software Engineer',
    profileImage: 'assets/logos/profile.jpg',
    contact: {
      email: 'john.doe@example.com',
      phone: '+91 98765 43210',
      location: 'Bangalore, India'
    },
    organization: {
      reportingTo: {
        name: 'Sarah Johnson',
        role: 'Project Manager'
      },
      reportsToHim: [
        { name: 'Emily Carter', role: 'UI Developer' },
        { name: 'Michael Lee', role: 'QA Engineer' },
        { name: 'Aarav Patel', role: 'Intern' }
      ]
    }
  };

  setTab(tab: string) {
    this.activeTab = tab;
  }

}
