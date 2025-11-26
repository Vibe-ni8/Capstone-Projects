import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { loadRemoteModule } from '@angular-architects/module-federation';

import { AuthGuard, PageNotFoundComponent, UnAuthorizedComponent } from 'shared';

import { HomeComponent } from '@host/app/pages/home/home.component';
import { LoginComponent } from '@host/app/pages/home/components/login/login.component';
import { PrivacyPolicyComponent } from '@host/app/pages/home/components/privacy-policy/privacy-policy.component';
import { TermsOfServiceComponent } from '@host/app/pages/home/components/terms-of-service/terms-of-service.component';
import { DashboardComponent } from '@host/app/pages/dashboard/dashboard.component';

const routes: Routes = [
  {path:'', redirectTo:'home', pathMatch:'full'},
  {path:'home', component:HomeComponent},
  {path:'home', component:HomeComponent, 
    children:[
      {path:'login', component:LoginComponent, data:{ section:'login'}},
      {path:'forgot-password', component:LoginComponent, data:{ section:'forgot'}},
      {path:'privacy-policy', component:PrivacyPolicyComponent},
      {path:'terms-of-service', component:TermsOfServiceComponent}
    ]
  },
  {
    path:'dashboard', 
    canActivate:[AuthGuard],
    component:DashboardComponent,
    canActivateChild:[AuthGuard],
    loadChildren:()=>import('@host/app/pages/page.module').then(pm => pm.PageModule)
  },
  {
    path:'employeeTravelBooking', 
    canActivate:[AuthGuard],
    component:DashboardComponent, 
    children:[
      {
        path: '',
        data: {
          tab:'Employee Travel Booking', 
          sideBarList: [
            {name:'Dashboard - Sharepoint', link:'/dashboard/details'},
            {name:'Dashboard - Employee Travel Booking', link:'/employeeTravelBooking'},
            {name:'Reports', link:'/dashboard/reports'},
            {name:'Settings', link:'/dashboard/settings'}
          ]
        },
        canActivateChild:[AuthGuard],
        loadChildren: () =>
          loadRemoteModule({
            type: 'module',
            remoteEntry: 'http://localhost:4201/remoteEntry.js',
            exposedModule: './Pages',
          }).then(m => m.PageModule)
      },
    ]
  },
  {path:'un-authorized', component:UnAuthorizedComponent},
  {path:'page-not-found', component:PageNotFoundComponent},
  {path:'**', redirectTo:'page-not-found'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
