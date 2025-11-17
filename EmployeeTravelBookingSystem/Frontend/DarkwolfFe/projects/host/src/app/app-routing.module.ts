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
    loadChildren:()=>import('@host/app/pages/page.module').then(pm => pm.PageModule)},
  {
    path:'employeetravelbooking', 
    canActivate:[AuthGuard],
    component:DashboardComponent,  
    children:[
      {
        path: '',
        canActivateChild:[AuthGuard],
        loadChildren: () =>
          loadRemoteModule({
            type: 'module',
            remoteEntry: 'http://localhost:4201/remoteEntry.js',
            exposedModule: './Pages',
          }).then(m => m.PageModule),
        data:{tab:'Employee Travel Booking'}
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
