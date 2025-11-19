import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DetailsComponent } from '@host/app/pages/dashboard/components/details/details.component';
import { SettingsComponent } from '@host/app/pages/dashboard/components/settings/settings.component';

const routes: Routes = [
  {path:'', redirectTo:'details', pathMatch:'full'},
  {path:'details', component:DetailsComponent},
  {path:'self-service', component:DetailsComponent, data:{tab:'Self Service'}},
  {path:'reports', component:DetailsComponent, data:{tab:'Reports'}},
  {path:'notifications', component:DetailsComponent, data:{tab:'Notifications'}},
  {path:'settings', component:SettingsComponent, data:{tab:'Settings'}}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PageRoutingModule { }
