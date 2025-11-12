import { AfterViewInit, Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';
import { LoaderService, ToasterService } from 'shared';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [AuthService]
})
export class LoginComponent implements AfterViewInit {
  
  constructor(private route: ActivatedRoute, private authService: AuthService, 
    private router:Router, private spinner:LoaderService, private toasterService:ToasterService) 
  {
    console.log('Login - Login Initiated');
  }
  
  // life cycles
  ngOnInit() {
    console.log('Login - Set section based on route data');
    this.setProcess = this.route.snapshot.data['section'];
    this.overallMessage = '';
  }
  
  ngAfterViewInit() {
    console.log('Login - Scroll to target section');
    this.scrollTo();
  }

  scrollTo() {
    const el = document.getElementById('login-target');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }

  // Section 1 start
  activeProcessName : Process = Process.Login;
  
  set setProcess(name : string) {
    console.log('Login - Change section to :', name);
    switch(name.toLowerCase()){
      case 'login': {
        this.activeProcessName = Process.Login; break;
      }
      case 'forgot' : {
        this.activeProcessName = Process.Forgot; break;
      }
      case 'reset' : {
        this.activeProcessName = Process.Reset; break;
      }
    }
  }
  // Section 1 end

  // Section 2 start
  overallMessage : string = ''; 
  email : string = '';
  password : string = '';
  confirmPassword : string = '';

  partialReset() {
    console.log('Login - Clear fields');
    this.overallMessage = '';
    this.email = '';
    this.password = '';
    this.confirmPassword = '';
  }

  login(loginForm : NgForm) {
    console.log('Login - Login triggered');
    this.spinner.show();
    this.scrollTo();
    this.authService.login(loginForm.value).subscribe({
      next: res => {
        if (res) {
          console.log('Login - Login succeed');
          this.spinner.hide();
          this.toasterService.showInfo('Login succeed');
          this.partialReset();
          this.router.navigate(['/dashboard/details'])
        }
        else {
          console.log('Login - Login failed - Invalid credentials')
          this.spinner.hide();
          this.toasterService.showError('Invalid Credentials');
          this.overallMessage = 'Invalid Credentials';
        }
      },
      error: () => {
        console.log('Login - Login failed - server error')
        this.spinner.hide();
        this.toasterService.showError('Internal Server Error');
        this.overallMessage = 'Internal Server Error';
      }
    });
  }

  confirmSubmit(forgotForm : NgForm) {
    console.log('Login - Forgot password triggered');
    this.spinner.show();
    this.scrollTo();
    this.email = forgotForm.value.email;
    this.authService.forgotPassword({email: this.email}).subscribe({
      next: res => {
        if (res) {
          console.log('Login - Forgot password succeed');
          this.spinner.hide();
          this.toasterService.showInfo(`Reset token is sent to ${this.email}`);
          this.overallMessage = '';
          this.activeProcessName = Process.Reset;
        }
        else {
          console.log('Login - Forgot password failed');
          this.spinner.hide();
          this.toasterService.showError('Email not registered');
          this.overallMessage = 'Email not registered';
        }
      },
      error: () => {
        console.log('Login - Forgot password failed - Server error');
        this.spinner.hide();
        this.toasterService.showError('Internal Server Error');
        this.overallMessage = 'Internal Server Error';
      }
    });
  }

  changePassword(resetForm : NgForm) {
    console.log('Login - Change password triggered');
    this.spinner.show();
    this.scrollTo();
    let request = {
      email: this.email,
      password: this.password,
      resetToken: resetForm.value.resetToken
    };
    this.authService.resetPassword(request).subscribe({
      next: res => {
        if (res) {
          console.log('Login - Change password succeed');
          this.spinner.hide();
          this.toasterService.showInfo('Password changed successfully');
          this.partialReset();
          this.activeProcessName = Process.Login;
        }
        else {
          console.log('Login - Change password failed');
          this.spinner.hide();
          this.toasterService.showError('Change password failed');
          this.overallMessage = 'Change password failed';
        }
      },
      error: () => {
        console.log('Login - Change password failed - Server error');
        this.spinner.hide();
        this.toasterService.showError('Internal Server Error');
        this.overallMessage = 'Internal Server Error';
      }
    });
  }
  // Section 2 end
}

enum Process {
  Login = 'Login',
  Forgot = 'Forgot Password',
  Reset = 'Reset Password'
}
