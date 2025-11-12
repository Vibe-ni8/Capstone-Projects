import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  private _loading = new BehaviorSubject<boolean>(false);
  loading = this._loading.asObservable();

  show() {
    this._loading.next(true);
  }

  hide() {
    this._loading.next(false);
  }

  private _miniLoading = new BehaviorSubject<boolean>(false);
  miniLoading = this._miniLoading.asObservable();

  showMini() {
    this._miniLoading.next(true);
  }

  hideMini() {
    this._miniLoading.next(false);
  }
  
}
