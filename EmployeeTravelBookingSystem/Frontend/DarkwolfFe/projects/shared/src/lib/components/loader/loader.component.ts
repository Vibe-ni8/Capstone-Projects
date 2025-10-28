import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { LoaderService } from '../../services/loader.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent {

  isLoading: boolean = false;
  
  constructor(private loadingService: LoaderService) {
    this.loadingService.loading.subscribe(res => {
      this.isLoading = res;
    })
  }
  
}
