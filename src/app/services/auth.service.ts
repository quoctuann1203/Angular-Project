import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn = false;
  constructor(
    private afAuth: AngularFireAuth,
		private router:Router
  ) {}

  async signinGmail(){
    var provider = new firebase.auth.GoogleAuthProvider();
    return await  this.afAuth.signInWithPopup(provider)
        .then(res=>{
        console.log(" da dang nhap thanh cong")
      })
  }

  async signIn(email: string, password: string) {
    await this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then((res) => {
        this.isLoggedIn = true;
        localStorage.setItem('user', JSON.stringify(res.user));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async signUp(email: string, password: string) {
    await this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then((res) => {
        this.isLoggedIn = true;
        localStorage.setItem('user', JSON.stringify(res.user));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  logout() {
    this.afAuth.currentUser.then(res => {
      this.afAuth.signOut();
    })
  }
}
