import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(private authService: AuthService) {}

  ngOnInit(): void {}

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
}
