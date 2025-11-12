import { Component } from '@angular/core';
import { LoaderService } from '../../services/loader.service';

@Component({
  selector: 'lib-mini-loader',
  templateUrl: './mini-loader.component.html',
  styleUrls: ['./mini-loader.component.css']
})
export class MiniLoaderComponent {

  isLoading: boolean = false;
    
  constructor(private loadingService: LoaderService) {
    console.log('Mini Loader - Mini loader Initiated');
    this.loadingService.miniLoading.subscribe(res => {
      this.isLoading = res;
    })
  }
}
