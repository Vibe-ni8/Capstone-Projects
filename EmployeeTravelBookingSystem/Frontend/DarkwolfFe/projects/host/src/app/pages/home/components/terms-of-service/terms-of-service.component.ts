import { AfterViewInit, Component } from '@angular/core';

@Component({
  selector: 'app-terms-of-service',
  templateUrl: './terms-of-service.component.html',
  styleUrls: ['./terms-of-service.component.css']
})
export class TermsOfServiceComponent implements AfterViewInit {

  constructor() {
    console.log('Terms of service - Initiated');
  }

  ngAfterViewInit() {
    console.log('Terms of service - Scroll to target section');
    this.scrollTo();
  }

  scrollTo() {
    const el = document.getElementById('terms-of-service-target');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }

}
