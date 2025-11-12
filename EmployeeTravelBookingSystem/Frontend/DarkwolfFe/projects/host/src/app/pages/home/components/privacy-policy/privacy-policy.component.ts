import { AfterViewInit, Component } from '@angular/core';

@Component({
  selector: 'app-privacy-policy',
  templateUrl: './privacy-policy.component.html',
  styleUrls: ['./privacy-policy.component.css']
})
export class PrivacyPolicyComponent implements AfterViewInit {

  constructor() {
    console.log('Privacy policy - Initiated');
  }

  ngAfterViewInit() {
    console.log('Privacy policy - Scroll to target section');
    this.scrollTo();
  }

  scrollTo() {
    const el = document.getElementById('privacy-policy-target');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }

}
