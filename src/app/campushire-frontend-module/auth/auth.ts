import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../service/auth-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './auth.html',
  styleUrls: ['./auth.css']
})
export class AuthComponent implements OnInit {

  isLoginMode = true;
  isLoading = false;

  message = '';
  messageType: 'success' | 'error' | '' = '';

  loginForm!: FormGroup;
  signupForm!: FormGroup;

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });

    this.signupForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      role: ['student'],
      cgpa: [''],
      skills: [''],
      companyName: ['']
    });
  }

  toggleMode() {
    this.clearMessage();
    this.isLoginMode = !this.isLoginMode;
  }

  onLogin() {
    if (this.loginForm.invalid) return;

    this.isLoading = true;
    this.clearMessage();

    this.auth.login(this.loginForm.value).subscribe({
      next: (res) => {
        console.log('LOGIN RESPONSE 👉', res);

        // Get role from backend response
        const role = res.user?.role || res.role;
        if (!role) {
          this.showError('Role missing from backend response');
          return;
        }

        // Save token and role
        localStorage.setItem('token', res.token);
        localStorage.setItem('role', role);

        // Navigate to dashboard based on role
        this.redirectByRole(role);
      },
      error: (err) => {
        this.isLoading = false;
        this.showError(err.error?.message || 'Login failed');
      }
    });
  }




  onSignup() {
    if (this.signupForm.invalid) return;

    this.startLoading();

    const payload = {
      ...this.signupForm.value,
      skills: this.signupForm.value.skills
        ? this.signupForm.value.skills.split(',').map((s: string) => s.trim())
        : []
    };

    this.auth.signup(payload).subscribe({
      next: (res) => {
        this.showSuccess('Account created successfully');

        localStorage.setItem('token', res.token);
        localStorage.setItem('role', res.user.role);

        setTimeout(() => {
          this.redirectByRole(res.user.role);
        }, 800);
      },
      error: err => this.showError(err.error?.message || 'Signup failed')
    });
  }


  startLoading() {
    this.isLoading = true;
    this.clearMessage();
  }

  showSuccess(msg: string) {
    this.isLoading = false;
    this.message = msg;
    this.messageType = 'success';
    this.autoHide();
  }

  showError(msg: string) {
    this.isLoading = false;
    this.message = msg;
    this.messageType = 'error';
    this.autoHide();
  }

  clearMessage() {
    this.message = '';
    this.messageType = '';
  }

  autoHide() {
    setTimeout(() => this.clearMessage(), 3000);
  }

  redirectByRole(role: string) {
    switch (role) {
      case 'student':
        this.router.navigate(['/student']);
        break;

      case 'recruiter':
        this.router.navigate(['/recruiter']);
        break;

      case 'admin':
        this.router.navigate(['/admin']);
        break;

      default:
        this.router.navigate(['/auth']);
    }
  }
}
