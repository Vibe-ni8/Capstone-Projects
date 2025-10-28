import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PageRoutingModule } from './page-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NavComponent } from './dashboard/components/nav/nav.component';
import { DetailsComponent } from './dashboard/components/details/details.component';


@NgModule({
  declarations: [
    DashboardComponent, 
    NavComponent,
    DetailsComponent
  ],
  imports: [
    CommonModule,
    PageRoutingModule
  ]
})
export class PageModule { }
