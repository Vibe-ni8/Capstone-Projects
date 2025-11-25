import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TravelService } from '../../shared/services/travel.service';

@Component({
  selector: 'app-booking-details',
  templateUrl: './booking-details.component.html',
  styleUrls: ['./booking-details.component.css']
})
export class BookingDetailsComponent {

  constructor(private route:ActivatedRoute, private travel:TravelService, private router:Router) { }

  id=''; item:any={}; booking:any={};

  ngOnInit() { 
    this.id = this.route.snapshot.params['id']; this.travel.getById(this.id).subscribe((res:any)=> this.item=res ); 
  }

  save() { 
    this.travel.updateBooking(this.id, this.booking).subscribe(()=> this.router.navigate(['/traveldesk'])); 
  }

}
