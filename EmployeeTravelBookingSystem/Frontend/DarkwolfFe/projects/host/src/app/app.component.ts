import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
  <div class="page">
    <router-outlet></router-outlet>
  </div>
  `,
  styles: [
    `.page {
      width: 100%;
      height: 100%;
      background-color: black;
      color: white;
      border-radius: 5px;
    }`
  ]
})
export class AppComponent {

}
