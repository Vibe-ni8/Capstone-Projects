import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PageRoutingModule } from './page-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NavComponent } from './dashboard/components/nav/nav.component';
import { DetailsComponent } from './dashboard/components/details/details.component';
import { ProfileComponent } from './dashboard/components/profile/profile.component';


@NgModule({
  declarations: [
    DashboardComponent, 
    NavComponent,
    DetailsComponent,
    ProfileComponent
  ],
  imports: [
    CommonModule,
    PageRoutingModule
  ]
})
export class PageModule { }
