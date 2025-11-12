import { Component } from '@angular/core';

@Component({
  selector: 'lib-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.css']
})
export class PageNotFoundComponent {

  constructor() {
    console.log('Page not found - Initiated');
  }

}
