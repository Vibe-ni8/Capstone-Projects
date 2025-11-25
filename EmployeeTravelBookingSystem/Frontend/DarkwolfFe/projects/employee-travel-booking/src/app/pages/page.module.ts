import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { PageRoutingModule } from './page-routing.module';

import { TravelDashboardComponent } from './travel-dashboard/travel-dashboard.component';
import { NewRequestComponent } from './new-request/new-request.component';
import { ApprovalsComponent } from './approvals/approvals.component';
import { TravelDeskComponent } from './travel-desk/travel-desk.component';
import { BookingDetailsComponent } from './booking-details/booking-details.component';
import { HistoryComponent } from './history/history.component';


@NgModule({
  declarations: [
    TravelDashboardComponent, NewRequestComponent, ApprovalsComponent, 
    TravelDeskComponent, BookingDetailsComponent, HistoryComponent
  ],
  imports: [
    CommonModule,
    PageRoutingModule,
    FormsModule
  ]
})
export class PageModule { }
