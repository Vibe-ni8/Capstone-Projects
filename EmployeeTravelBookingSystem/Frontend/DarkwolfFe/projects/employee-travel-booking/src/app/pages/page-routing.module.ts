import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { RequestFormComponent } from './home/components/request-form/request-form.component';
import { ApprovalListComponent } from './home/components/approval-list/approval-list.component';
import { HistoryComponent } from './home/components/history/history.component';

const routes: Routes = [
  {path:'', redirectTo:'home', pathMatch:'full'},
  {
    path: 'home',
    component: HomeComponent,
    children: [
      { path: '', redirectTo: 'request', pathMatch: 'full' },
      { path: 'request', component: RequestFormComponent },
      { path: 'approvals', component: ApprovalListComponent },
      { path: 'history', component: HistoryComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PageRoutingModule { }
