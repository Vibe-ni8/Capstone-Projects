import { Component } from '@angular/core';
import { TravelService } from '../../shared/services/travel.service';

@Component({
  selector: 'app-travel-desk',
  templateUrl: './travel-desk.component.html',
  styleUrls: ['./travel-desk.component.css']
})
export class TravelDeskComponent {

  constructor(private travel:TravelService) {}

  pending:any[] = [];

  ngOnInit() { 
    this.load(); 
  }

  load() { 
    this.travel.getAllPendingForTravelDesk().subscribe((res:any)=> this.pending=res); 
  }

}
