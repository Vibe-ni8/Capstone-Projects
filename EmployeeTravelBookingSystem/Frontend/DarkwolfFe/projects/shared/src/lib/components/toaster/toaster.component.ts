import { Component, OnInit } from '@angular/core';
import { ToasterService, ToastMessage } from '../../services/toaster.service';

@Component({
  selector: 'lib-toaster',
  templateUrl: './toaster.component.html',
  styleUrls: ['./toaster.component.css']
})
export class ToasterComponent implements OnInit {

  toasts: ToastMessage[] = [];

  constructor(private toasterService: ToasterService) {
    console.log('Toaster - Toaster Initiated');
  }

  ngOnInit() {
    this.toasterService.toasts.subscribe(list => {
      this.toasts = list;
    });
  }

  dismiss(id: number) {
    this.toasterService.removeToast(id);
  }
}
