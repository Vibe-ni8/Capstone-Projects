import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedLibModule } from 'shared';
import { HomeComponent } from '@host/app/pages/home/home.component';
import { LoginComponent } from '@host/app/pages/home/components/login/login.component';
import { PrivacyPolicyComponent } from '@host/app/pages/home/components/privacy-policy/privacy-policy.component';
import { TermsOfServiceComponent } from '@host/app/pages/home/components/terms-of-service/terms-of-service.component';
import { PageModule } from '@host/app/pages/page.module';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent, PrivacyPolicyComponent, TermsOfServiceComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    SharedLibModule,
    PageModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
