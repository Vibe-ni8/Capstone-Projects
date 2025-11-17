import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from 'shared';

import { DashboardComponent } from './dashboard/dashboard.component';
import { DetailsComponent } from './dashboard/components/details/details.component';
import { SettingsComponent } from './dashboard/components/settings/settings.component';

const routes: Routes = [
  {
    path:'', 
    component:DashboardComponent,
    canActivateChild:[AuthGuard], 
    children:[
      {path:'', redirectTo:'details', pathMatch:'full'},
      {path:'details', component:DetailsComponent},
      {path:'reports', component:DetailsComponent, data:{tab:'Reports'}},
      {path:'settings', component:SettingsComponent, data:{tab:'Settings'}}
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PageRoutingModule { }
