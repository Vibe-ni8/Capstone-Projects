import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from './components/loader/loader.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { UnAuthorizedComponent } from './components/un-authorized/un-authorized.component';
import { MiniLoaderComponent } from './components/mini-loader/mini-loader.component';

@NgModule({
  declarations: [
    LoaderComponent,
    PageNotFoundComponent,
    UnAuthorizedComponent,
    MiniLoaderComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    LoaderComponent,
    PageNotFoundComponent,
    UnAuthorizedComponent,
    MiniLoaderComponent
  ]
})
export class SharedLibModule { }
