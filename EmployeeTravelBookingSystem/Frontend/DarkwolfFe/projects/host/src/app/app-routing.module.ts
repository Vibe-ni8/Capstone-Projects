import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PageNotFoundComponent, UnAuthorizedComponent } from 'shared';

import { HomeComponent } from '@host/app/pages/home/home.component';
import { LoginComponent } from '@host/app/pages/home/components/login/login.component';
import { PrivacyPolicyComponent } from '@host/app/pages/home/components/privacy-policy/privacy-policy.component';
import { TermsOfServiceComponent } from '@host/app/pages/home/components/terms-of-service/terms-of-service.component';

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
  {path:'dashboard', loadChildren:()=>import('@host/app/pages/page.module').then(pm => pm.PageModule)},
  {path:'un-authorized', component:UnAuthorizedComponent},
  {path:'**', component:PageNotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
