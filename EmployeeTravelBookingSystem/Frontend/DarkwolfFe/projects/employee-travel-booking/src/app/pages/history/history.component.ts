import { Component } from '@angular/core';
import { TravelService } from '../../shared/services/travel.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent {

  constructor(private travel:TravelService) {}

  items:any[] = [
    {id:'23456', fromCity:'Chennai', destination:'Bangalore', travelDate:'05-11-2025', status:'approved'}
  ];
  employeeId='emp-100';

  ngOnInit() { 
    this.travel.getMyRequests(this.employeeId).subscribe((res:any)=> this.items=res); 
  }

  open(historyId:string) {
    console.log(historyId);
  }
  
}
