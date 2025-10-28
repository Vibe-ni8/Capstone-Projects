import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  private themeSubject = new BehaviorSubject<'light' | 'dark'>('light');
  theme$ = this.themeSubject.asObservable();

  private mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
  private mediaListener?: (event: MediaQueryListEvent) => void;

  setTheme(theme: 'light' | 'dark' | null) {
    if (theme === null) {
      // Follow system preference
      this.applyTheme(this.mediaQuery.matches ? 'dark' : 'light');

      // Attach listener (if not already)
      this.mediaListener ??= (event) => {
        this.applyTheme(event.matches ? 'dark' : 'light');
      };
      this.mediaQuery.addEventListener('change', this.mediaListener);
      localStorage.removeItem('theme');
    } else {
      // Manual override — stop reacting to system changes
      if (this.mediaListener) {
        this.mediaQuery.removeEventListener('change', this.mediaListener);
        this.mediaListener = undefined;
      }
      this.applyTheme(theme);
      localStorage.setItem('theme', theme);
    }
  }

  private applyTheme(theme: 'light' | 'dark') {
    document.documentElement.setAttribute('data-theme', theme);
    this.themeSubject.next(theme);
  }
  
}
