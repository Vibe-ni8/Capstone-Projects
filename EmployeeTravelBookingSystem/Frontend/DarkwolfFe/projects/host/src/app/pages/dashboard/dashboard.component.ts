import { Component, ElementRef, ViewChild, ViewChildren } from '@angular/core';
import { NavComponent } from './components/nav/nav.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  @ViewChild(NavComponent) navComponent!: NavComponent;

  closeSidebar() {
    this.navComponent.closeSidebarIfOpen();
  }

}
