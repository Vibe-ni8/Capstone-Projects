import { Component } from '@angular/core';

@Component({
  selector: 'app-approval-list',
  templateUrl: './approval-list.component.html',
  styleUrls: ['./approval-list.component.css']
})
export class ApprovalListComponent {
  
  requests = [
    { destination: 'Bangalore', startDate: '2025-11-20', endDate: '2025-11-25', purpose: 'Client Meeting' },
    { destination: 'Delhi', startDate: '2025-11-28', endDate: '2025-12-02', purpose: 'Project Review' }
  ];

  approve(req: any) {
    alert(`Approved: ${req.destination}`);
  }

  reject(req: any) {
    alert(`Rejected: ${req.destination}`);
  }

}
