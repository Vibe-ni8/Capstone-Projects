import { AfterViewInit, Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements AfterViewInit {
  
  constructor(private route: ActivatedRoute, private authService: AuthService) {}
  
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
  processName : Process = Process.Login;
  
  set setProcess(name : string) {
    switch(name.toLowerCase()){
      case 'login': {
        this.processName = Process.Login; break;
      }
      case 'forgot' : {
        this.processName = Process.Forgot; break;
      }
      case 'reset' : {
        this.processName = Process.Reset; break;
      }
    }
  }
  // Section 1 end

  // Section 2 start
  isLoading : boolean = false;
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
    this.isLoading = true;
    this.scrollTo();
    this.authService.login(loginForm.value).subscribe({
      next: res => {
        if (res) {
          // this.isLoading = false;
          // this.partialReset(); // remove
          // this.processName = Process.Forgot; // remove redirect
          setTimeout(() => {
            this.isLoading = false;
            this.partialReset(); // remove
            this.processName = Process.Forgot; // remove redirect
          }, 3500);
        }
        else {
          // this.isLoading = false;
          // this.overallMessage = 'Invalid Credentials';
          setTimeout(() => {
            this.isLoading = false;
            this.overallMessage = 'Invalid Credentials';
          }, 3500);
        }
      },
      error: () => {
        this.isLoading = false;
        this.overallMessage = 'Internal Server Error';
      }
    });
  }

  confirmSubmit(forgotForm : NgForm) {
    this.isLoading = true;
    this.scrollTo();
    this.email = forgotForm.value.email;
    this.authService.forgotPassword({email: this.email}).subscribe({
      next: res => {
        if (res) {
          // this.isLoading = false;
          // this.overallMessage = '';
          // this.processName = Process.Reset;
          setTimeout(() => {
            this.isLoading = false;
            this.overallMessage = '';
            this.processName = Process.Reset;
          }, 3500);
        }
        else {
          // this.isLoading = false;
          // this.overallMessage = 'Email not registered';
          setTimeout(() => {
            this.isLoading = false;
            this.overallMessage = 'Email not registered';
          }, 3500);
        }
      },
      error: () => {
        this.isLoading = false;
        this.overallMessage = 'Internal Server Error';
      }
    });
  }

  changePassword(resetForm : NgForm) {
    this.isLoading = true;
    this.scrollTo();
    let request = {
      email: this.email,
      password: this.password,
      resetToken: resetForm.value.resetToken
    };
    this.authService.resetPassword(request).subscribe({
      next: res => {
        if (res) {
          // this.isLoading = false;
          // this.partialReset();
          // this.processName = Process.Login;
          setTimeout(() => {
            this.isLoading = false;
            this.partialReset();
            this.processName = Process.Login;
          }, 3500);
        }
        else {
          // this.isLoading = false;
          // this.overallMessage = 'Reset Password Failed';
          setTimeout(() => {
            this.isLoading = false;
            this.overallMessage = 'Reset Password Failed';
          }, 3500);
        }
      },
      error: () => {
        this.isLoading = false;
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
