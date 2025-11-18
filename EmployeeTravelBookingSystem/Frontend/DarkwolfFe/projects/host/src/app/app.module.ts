import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AuthInterceptor, SharedLibModule } from 'shared';

import { HomeComponent } from '@host/app/pages/home/home.component';
import { LoginComponent } from '@host/app/pages/home/components/login/login.component';
import { PrivacyPolicyComponent } from '@host/app/pages/home/components/privacy-policy/privacy-policy.component';
import { TermsOfServiceComponent } from '@host/app/pages/home/components/terms-of-service/terms-of-service.component';
import { DashboardComponent } from '@host/app/pages/dashboard/dashboard.component';
import { NavComponent } from '@host/app/pages/dashboard/components/nav/nav.component';
import { SettingsComponent } from '@host/app/pages/dashboard/components/settings/settings.component';
import { ProfileComponent } from '@host/app/pages/dashboard/components/profile/profile.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent, LoginComponent, PrivacyPolicyComponent, TermsOfServiceComponent,
    DashboardComponent, NavComponent, ProfileComponent, SettingsComponent
  ],
  imports: [
    BrowserModule, AppRoutingModule,
    HttpClientModule, FormsModule,
    SharedLibModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
