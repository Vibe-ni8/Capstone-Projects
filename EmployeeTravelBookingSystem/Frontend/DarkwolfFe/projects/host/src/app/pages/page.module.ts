import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PageRoutingModule } from './page-routing.module';

import { DetailsComponent } from '@host/app/pages/dashboard/components/details/details.component';


@NgModule({
  declarations: [
    DetailsComponent
  ],
  imports: [
    CommonModule, PageRoutingModule
  ]
})
export class PageModule { }
