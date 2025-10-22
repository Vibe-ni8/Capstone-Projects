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
  }
  
  ngAfterViewInit() {
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
  isProcessSuccess : boolean = false;
  overallMessage : string = ''; 
  email : string = '';
  password : string = '';
  confirmPassword : string = '';

  login(loginForm : NgForm) {
    this.authService.login(loginForm.value).subscribe({
      next: res => {
        this.isProcessSuccess = res; 
        this.overallMessage = res ? 'Login success' : 'Invalid Credentials';
      },
      error: err => {
        this.isProcessSuccess = false;
        this.overallMessage = 'Internal Server Error';
      }
    });
  }

  confirmSubmit(forgotForm : NgForm) {
    this.email = forgotForm.value.email;
    this.processName = Process.Reset;
  }

  changePassword(resetForm : NgForm) {
    let value = resetForm.value;
    console.log({
      email: this.email,
      password: this.password,
      resetToken: value.resetToken
    });
  }
  // Section 2 end
}

enum Process {
  Login = 'Login',
  Forgot = 'Forgot Password',
  Reset = 'Reset Password'
}
