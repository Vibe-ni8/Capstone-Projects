import { Component, OnInit } from '@angular/core';
import { ThemeService } from 'shared';

@Component({
  selector: 'app-root',
  template: `
  <div class="page">
    <lib-loader></lib-loader>
    <lib-toaster></lib-toaster>
    <router-outlet></router-outlet>
  </div>
  `,
  styles: [
    `.page {
      width: 100%;
      height: 100%;
      background-color: var(--bg-color);
      color: var(--text-color);
      border-radius: 5px;
    }`
  ]
})
export class AppComponent implements OnInit {

  constructor(private themeService: ThemeService) {
  }

  ngOnInit() {
    // Initialize based on user preference or system setting
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    this.themeService.setTheme(savedTheme);
  }

}
