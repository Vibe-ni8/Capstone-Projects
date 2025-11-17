import { Component } from '@angular/core';

@Component({
  selector: 'app-request-form',
  templateUrl: './request-form.component.html',
  styleUrls: ['./request-form.component.css']
})
export class RequestFormComponent {

  request = {
    destination: '',
    startDate: '',
    endDate: '',
    purpose: ''
  };

  submitRequest() {
    console.log('Travel Request Submitted:', this.request);
    alert('Travel request sent to your reporting manager for approval.');
  }
  
}
