import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DetailsComponent } from './dashboard/components/details/details.component';

const routes: Routes = [
  {path:'', component:DashboardComponent, children:[
    {path:'', redirectTo:'/dashboard/details', pathMatch:'full'},
    {path:'details', component:DetailsComponent},
    {path:'reports', component:DetailsComponent},
    {path:'settings', component:DetailsComponent},
    {path:'profile', component:DetailsComponent}
  ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PageRoutingModule { }
