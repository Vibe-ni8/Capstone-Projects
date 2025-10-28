import { Component } from '@angular/core';
import { ThemeService } from 'shared';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent {

  currentTheme: 'light' | 'dark' | 'system' = 'system';

  constructor(private themeService: ThemeService) {
    const saved = localStorage.getItem('theme');
    if (saved === 'light' || saved === 'dark') {
      this.currentTheme = saved;
    } else {
      this.currentTheme = 'system';
    }
  }

  changeTheme(theme: 'light' | 'dark' | 'system') {
    this.currentTheme = theme;
    if (theme === 'system') {
      this.themeService.setTheme(null);
    } else {
      this.themeService.setTheme(theme);
    }
  }
  
}
