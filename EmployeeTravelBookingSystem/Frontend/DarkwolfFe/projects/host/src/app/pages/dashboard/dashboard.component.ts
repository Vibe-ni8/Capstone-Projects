import { Component, ViewChild } from '@angular/core';
import { NavComponent } from './components/nav/nav.component';
import { UserService } from './services/user.service';
import { LoaderService, ToasterService } from 'shared';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  constructor(private userService:UserService, private spinner:LoaderService, 
    private toasterService:ToasterService, private router: Router, private route: ActivatedRoute) {
      console.log('Dashboared - Initiated');
      this.SetupPage();
  }

  username:string = 'Loading...';
  email:string = 'Loading...';
  currentTab: string | null = null;

  SetupPage() {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        let child = this.route.firstChild;

        child?.data.subscribe(data => {
          console.log("Dashboard - Active Child Route Tab:", data['tab']);
          this.currentTab = data['tab'];
        });
      });
  }
  
  ngOnInit() {
    this.spinner.show();
    this.userService.getCurrentUser().subscribe({
      next: res => {
        if (typeof res !== 'boolean') {
          console.log('Dashboared - Data fetch succeed');
          this.spinner.hide();
          this.username = res.name;
          this.email = res.email;
        }
        else {
          console.log('Dashboared - Data fetch failed - User not found');
          this.spinner.hide();
          this.toasterService.showError('User not Found - Log again to avoid fault data');
          this.username = 'User not Found';
          this.email = 'Log again to avoid fault data';
        }
      },
      error: () => {
        console.log('Dashboared - Data fetch failed - Server error');
        this.spinner.hide();
        this.toasterService.showError('Server Error - Log again to avoid fault data');
        this.username = 'Server Error';
        this.email = 'Log again to avoid fault data';
      }
    });
  }

  ngAfterViewInit() {
    console.log('Dashboared - Scroll to target section');
    this.scrollTo();
  }

  scrollTo() {
    const el = document.getElementById('nav-target');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }

  @ViewChild(NavComponent) navComponent!: NavComponent;

  closeMenus() {
    this.navComponent.closeMenusIfOpen();
  }

}
