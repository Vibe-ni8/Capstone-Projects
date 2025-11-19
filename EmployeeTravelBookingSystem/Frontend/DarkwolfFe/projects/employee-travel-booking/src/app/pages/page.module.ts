import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PageRoutingModule } from './page-routing.module';
import { HomeComponent } from './home/home.component';
import { RequestFormComponent } from './home/components/request-form/request-form.component';
import { ApprovalListComponent } from './home/components/approval-list/approval-list.component';
import { HistoryComponent } from './home/components/history/history.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    HomeComponent,
    RequestFormComponent,
    ApprovalListComponent,
    HistoryComponent
  ],
  imports: [
    CommonModule,
    PageRoutingModule,
    FormsModule
  ]
})
export class PageModule { }
