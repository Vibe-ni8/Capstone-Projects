import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-travel-dashboard',
  templateUrl: './travel-dashboard.component.html',
  styleUrls: ['./travel-dashboard.component.css']
})
export class TravelDashboardComponent {

  constructor(private router:Router){}
  
  open(path:string) { 
    this.router.navigate([`employeeTravelBooking${path}`]); 
  }

}
