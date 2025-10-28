import { Component } from '@angular/core';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent {

  modules = [
    { title: 'Travel Booking', description: 'Manage and view travel bookings', icon: 'fa fa-plane' },
    { title: 'Self Service', description: 'Employee and personal services', icon: 'fa fa-user-cog' },
    { title: 'Reports', description: 'Access analytics and reports', icon: 'fa fa-chart-line' },
    { title: 'Notifications', description: 'View system alerts', icon: 'fa fa-bell' },
    { title: 'Settings', description: 'Customize your experience', icon: 'fa fa-cogs' },
  ];

  navigate(item: any) {
    console.log('Navigating to:', item.title);
  }
  
}
