import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TravelService } from '../../shared/services/travel.service';

@Component({
  selector: 'app-new-request',
  templateUrl: './new-request.component.html',
  styleUrls: ['./new-request.component.css']
})
export class NewRequestComponent {

  constructor(private travel:TravelService, private router:Router) {}

  model:any = { travelType:'Domestic', mode:'Flight', accommodationRequired:false };
  employeeId = 'emp-100'; // replace with auth
  loading=false; 
  msg='';
  
  submit() {
    this.loading=true;
    const payload = { ...this.model, employeeId:this.employeeId, status:'PendingRM', createdAt:new Date().toISOString() };
    this.travel.createRequest(payload).subscribe(()=>{ this.loading=false; this.router.navigate(['/']); }, err=>{ this.loading=false; this.msg='Error'; });
  }

}
