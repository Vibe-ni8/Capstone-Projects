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
    console.log('Dashboared_Settings - Initiated');
    const saved = localStorage.getItem('theme');
    if (saved === 'light' || saved === 'dark') {
      this.currentTheme = saved;
    } else {
      this.currentTheme = 'system';
    }
  }

  changeTheme(theme: 'light' | 'dark' | 'system') {
    console.log('Dashboared_Settings - Change theme to :', theme);
    this.currentTheme = theme;
    if (theme === 'system') {
      this.themeService.setTheme(null);
    } else {
      this.themeService.setTheme(theme);
    }
  }
  
}
