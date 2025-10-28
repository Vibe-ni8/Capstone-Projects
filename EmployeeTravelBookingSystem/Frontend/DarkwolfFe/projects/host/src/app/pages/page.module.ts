import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PageRoutingModule } from './page-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NavComponent } from './dashboard/components/nav/nav.component';
import { DetailsComponent } from './dashboard/components/details/details.component';
import { ProfileComponent } from './dashboard/components/profile/profile.component';
import { SettingsComponent } from './dashboard/components/settings/settings.component';


@NgModule({
  declarations: [
    DashboardComponent, 
    NavComponent,
    DetailsComponent,
    ProfileComponent,
    SettingsComponent
  ],
  imports: [
    CommonModule,
    PageRoutingModule
  ]
})
export class PageModule { }
