import { Component } from '@angular/core';
import { LoaderService } from '../../services/loader.service';

@Component({
  selector: 'lib-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent {

  isLoading: boolean = false;
  
  constructor(private loadingService: LoaderService) {
    console.log('Loader - Loader Initiated');
    this.loadingService.loading.subscribe(res => {
      this.isLoading = res;
    })
  }
  
}
