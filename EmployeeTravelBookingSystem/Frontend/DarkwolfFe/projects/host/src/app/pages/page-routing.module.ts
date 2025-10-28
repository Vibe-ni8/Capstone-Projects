import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DetailsComponent } from './dashboard/components/details/details.component';
import { AuthGuard } from 'projects/shared/src/lib/guards/auth.guard';
import { ProfileComponent } from './dashboard/components/profile/profile.component';
import { SettingsComponent } from './dashboard/components/settings/settings.component';

const routes: Routes = [
  {
    path:'', 
    component:DashboardComponent, 
    canActivate:[AuthGuard],
    canActivateChild:[AuthGuard], 
    children:[
      {path:'', redirectTo:'/dashboard/details', pathMatch:'full'},
      {path:'details', component:DetailsComponent},
      {path:'reports', component:DetailsComponent},
      {path:'settings', component:SettingsComponent},
      {path:'profile', component:ProfileComponent}
  ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PageRoutingModule { }
