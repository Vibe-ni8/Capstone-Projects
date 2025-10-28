import { AfterViewInit, Component } from '@angular/core';

@Component({
  selector: 'app-terms-of-service',
  templateUrl: './terms-of-service.component.html',
  styleUrls: ['./terms-of-service.component.css']
})
export class TermsOfServiceComponent implements AfterViewInit {

  ngAfterViewInit() {
    this.scrollTo();
  }

  scrollTo() {
    const el = document.getElementById('terms-of-service-target');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }

}
