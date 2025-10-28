import { AfterViewInit, Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';
import { LoaderService } from 'shared';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [AuthService]
})
export class LoginComponent implements AfterViewInit {
  
  constructor(private route: ActivatedRoute, private authService: AuthService, 
    private router:Router, private spinner:LoaderService) 
  {}
  
  // life cycles
  ngOnInit() {
    this.setProcess = this.route.snapshot.data['section'];
    this.overallMessage = '';
  }
  
  ngAfterViewInit() {
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
    this.overallMessage = '';
    this.email = '';
    this.password = '';
    this.confirmPassword = '';
  }

  login(loginForm : NgForm) {
    this.spinner.show();
    this.scrollTo();
    this.authService.login(loginForm.value).subscribe({
      next: res => {
        if (res) {
          // this.spinner.hide();
          // this.partialReset(); // remove
          // this.router.navigate(['./dashboard/details']);
          setTimeout(() => {
            this.spinner.hide();
            this.partialReset(); // remove
            this.router.navigate(['/dashboard/details']);
          }, 3500);
        }
        else {
          // this.spinner.hide();
          // this.overallMessage = 'Invalid Credentials';
          setTimeout(() => {
            this.spinner.hide();
            this.overallMessage = 'Invalid Credentials';
          }, 3500);
        }
      },
      error: () => {
        this.spinner.hide();
        this.overallMessage = 'Internal Server Error';
      }
    });
  }

  confirmSubmit(forgotForm : NgForm) {
    this.spinner.show();
    this.scrollTo();
    this.email = forgotForm.value.email;
    this.authService.forgotPassword({email: this.email}).subscribe({
      next: res => {
        if (res) {
          // this.spinner.hide();
          // this.overallMessage = '';
          // this.processName = Process.Reset;
          setTimeout(() => {
            this.spinner.hide();
            this.overallMessage = '';
            this.activeProcessName = Process.Reset;
          }, 3500);
        }
        else {
          // this.spinner.hide();
          // this.overallMessage = 'Email not registered';
          setTimeout(() => {
            this.spinner.hide();
            this.overallMessage = 'Email not registered';
          }, 3500);
        }
      },
      error: () => {
        this.spinner.hide();
        this.overallMessage = 'Internal Server Error';
      }
    });
  }

  changePassword(resetForm : NgForm) {
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
          // this.spinner.hide();
          // this.partialReset();
          // this.processName = Process.Login;
          setTimeout(() => {
            this.spinner.hide();
            this.partialReset();
            this.activeProcessName = Process.Login;
          }, 3500);
        }
        else {
          // this.spinner.hide();
          // this.overallMessage = 'Reset Password Failed';
          setTimeout(() => {
            this.spinner.hide();
            this.overallMessage = 'Reset Password Failed';
          }, 3500);
        }
      },
      error: () => {
        this.spinner.hide();
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
