import { Component } from '@angular/core';
import { TravelService } from '../../shared/services/travel.service';

@Component({
  selector: 'app-approvals',
  templateUrl: './approvals.component.html',
  styleUrls: ['./approvals.component.css']
})
export class ApprovalsComponent {

  constructor(private travel:TravelService) {}

  pending:any[] = [];
  managerId = 'mgr-100';

  ngOnInit() { 
    this.load(); 
  }

  load() { 
    this.travel.getPendingApprovals(this.managerId).subscribe((res:any)=> this.pending=res ); 
  }

  approve(req:any) { 
    this.travel.approve(req.id, { managerId:this.managerId }).subscribe(()=>this.load()); 
  }

  reject(req:any) { 
    this.travel.reject(req.id, { managerId:this.managerId, reason:'Rejected' }).subscribe(()=>this.load()); 
  }
}
