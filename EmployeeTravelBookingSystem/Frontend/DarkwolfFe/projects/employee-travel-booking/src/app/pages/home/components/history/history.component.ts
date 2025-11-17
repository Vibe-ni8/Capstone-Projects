import { Component } from '@angular/core';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent {
  history = [
    { destination: 'Chennai', startDate: '2025-10-10', endDate: '2025-10-15', status: 'Approved' },
    { destination: 'Mumbai', startDate: '2025-09-05', endDate: '2025-09-09', status: 'Rejected' },
  ];
}
