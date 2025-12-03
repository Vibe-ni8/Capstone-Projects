import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TravelService } from '../../shared/services/travel.service';
import { FormControl, NgForm } from '@angular/forms';

@Component({
  selector: 'app-new-request',
  templateUrl: './new-request.component.html',
  styleUrls: ['./new-request.component.css']
})
export class NewRequestComponent {

  constructor(private travel:TravelService, private router:Router) {
    const now = new Date();
    now.setDate(now.getDate() + 7); // add 7 days
    this.nextWeek = now.toISOString().split('T')[0]; // format YYYY-MM-DD
  }

  nextWeek: string;
  employeeId = 'emp-100'; // replace with auth
  loading=false; 

  validateDate(control: FormControl) {
    if (!control.value) return;

    const next = new Date();
    next.setDate(next.getDate() + 6);
    const inputDate = new Date(control.value);

    const errors = { ...(control.errors || {}) };

    if (inputDate < next) {
      errors['min'] = true;
      control.setErrors(errors);
    } else {
      delete errors['min'];
      control.setErrors(Object.keys(errors).length ? errors : null);
    }
  }
  
  submit(travelRequestForm : NgForm) {
    console.log(travelRequestForm);
    this.loading=true;
    console.log(travelRequestForm.value);
    this.travel.createRequest(travelRequestForm.value).subscribe(
      () => { 
        this.loading=false; 
        this.router.navigate(['/']); 
      }, 
      err=>{ this.loading=false }
    );
  }

}
