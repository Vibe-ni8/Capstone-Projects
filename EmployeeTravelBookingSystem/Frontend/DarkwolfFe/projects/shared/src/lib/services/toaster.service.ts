import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface ToastMessage {
  id: number;
  type: 'info' | 'warn' | 'error';
  text: string;
}

@Injectable({
  providedIn: 'root'
})
export class ToasterService {

  private _toasts = new BehaviorSubject<ToastMessage[]>([]);
  toasts = this._toasts.asObservable();
  private counter = 0;

  private addToast(type: 'info' | 'warn' | 'error', text: string) {
    const toast: ToastMessage = { id: ++this.counter, type, text };
    const current = this._toasts.value;
    this._toasts.next([...current, toast]);

    // Auto-remove after 5s
    setTimeout(() => {
      this.removeToast(toast.id);
    }, 3000);
  }

  showInfo(message: string) { this.addToast('info', message); }
  showWarn(message: string) { this.addToast('warn', message); }
  showError(message: string) { this.addToast('error', message); }

  removeToast(id: number) {
    this._toasts.next(this._toasts.value.filter(t => t.id !== id));
  }
}
