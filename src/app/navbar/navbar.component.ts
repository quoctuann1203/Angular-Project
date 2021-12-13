import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  displayName: string = '';
  constructor(private userService: UserService, private authService: AuthService, private router: Router) {
    // this.userService
    //   .getCurrentUser()
    //   .then(
    //     (user) =>
    //       (this.displayName =
    //         user.displayName != null ? user.displayName : user.email)
    //   );
    // console.log(this.displayName);
  }

  ngOnInit(): void {
    this.userService
      .getCurrentUser()
      .then(
        (user) =>
          (this.displayName =
            user.displayName != null ? user.displayName : user.email)
      );
    console.log(this.displayName);
  }

  logout() {
    this.authService.logout();
    location.href=""
  }
}
