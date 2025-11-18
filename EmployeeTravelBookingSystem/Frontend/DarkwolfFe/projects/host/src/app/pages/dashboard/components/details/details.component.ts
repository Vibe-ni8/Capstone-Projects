import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent {

  constructor(private router:Router) {
    console.log('Dashboard_Details - Initiated');
    this.scrollTo();
  }

  modules = [
    { title: 'Travel Booking', description: 'Manage and view travel bookings', icon: 'fa fa-plane' },
    { title: 'Self Service', description: 'Employee and personal services', icon: 'fa fa-user-cog' },
    { title: 'Reports', description: 'Access analytics and reports', icon: 'fa fa-chart-line' },
    { title: 'Notifications', description: 'View system alerts', icon: 'fa fa-bell' },
    { title: 'Settings', description: 'Customize your experience', icon: 'fa fa-cogs' },
  ];

  navigate(item: any) {
    console.log('Navigating to:', item.title);
    switch (item.title)
    {
      case 'Travel Booking': this.router.navigate(['/employeetravelbooking']); break;
      case 'Self Service': this.router.navigate(['/dashboard/self-service']); this.scrollTo(); break;
      case 'Reports': this.router.navigate(['/dashboard/reports']); this.scrollTo(); break;
      case 'Notifications': this.router.navigate(['/dashboard/notifications']); this.scrollTo(); break;
      case 'Settings': this.router.navigate(['/dashboard/settings']); this.scrollTo(); break;
    }
  }

  scrollTo() {
    const el = document.getElementById('nav-target');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }
  
}
