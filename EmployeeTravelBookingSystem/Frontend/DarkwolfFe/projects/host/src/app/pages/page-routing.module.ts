import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DetailsComponent } from './dashboard/components/details/details.component';
import { AuthGuard } from 'shared';
import { SettingsComponent } from './dashboard/components/settings/settings.component';
import { loadRemoteModule } from '@angular-architects/module-federation';

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
      {
        path: 'employeetravelbooking',
        loadChildren: () =>
          loadRemoteModule({
            type: 'module',
            remoteEntry: 'http://localhost:4201/remoteEntry.js',
            exposedModule: './Pages',
          }).then(m => m.PageModule),
        },
  ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PageRoutingModule { }
