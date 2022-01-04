import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router
  ) {}
  public form: FormGroup;
  isSignedIn = false;

  private formSubmitAttempt: boolean;
  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });

    if (localStorage.getItem('user') !== null) {
      this.isSignedIn = true;
    } else {
      this.isSignedIn = false;
    }

    if (this.isSignedIn) {
      this.router.navigate(['admin']);
    }
  }

  isFieldInvalid(field: string) {
    return (
      (!this.form.get(field).valid && this.form.get(field).touched) ||
      (this.form.get(field).untouched && this.formSubmitAttempt)
    );
  }

  tryGoogleLogin() {
    this.authService
      .signinGmail()
      .then((res) => {
        // this.router.navigate(["/home"]);
        location.href = '';
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async onSubmit() {
    if (this.form.valid) {
      await this.authService.signIn(
        this.form.value.email,
        this.form.value.password
      );
      if (this.authService.isLoggedIn) {
        this.isSignedIn = true;
        this.router.navigate(['/']);
      }
      // this.authService.login(this.form.value);
    }
    console.log(this.form.value);
    this.formSubmitAttempt = true;
  }
}
