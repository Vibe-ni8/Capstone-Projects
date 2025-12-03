import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TravelDashboardComponent } from './travel-dashboard/travel-dashboard.component';
import { NewRequestComponent } from './new-request/new-request.component';
import { ApprovalsComponent } from './approvals/approvals.component';
import { TravelDeskComponent } from './travel-desk/travel-desk.component';
import { BookingDetailsComponent } from './booking-details/booking-details.component';
import { HistoryComponent } from './history/history.component';

const routes: Routes = [
  {path:'', redirectTo:'dashboard', pathMatch:'full'},
  { path: 'dashboard', component: TravelDashboardComponent },
  { path: 'new', component: NewRequestComponent },
  { path: 'approvals', component: ApprovalsComponent },
  { path: 'history', component: HistoryComponent },
  { path: 'traveldesk', component: TravelDeskComponent },
  { path: 'booking/:id', component: BookingDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PageRoutingModule { }
