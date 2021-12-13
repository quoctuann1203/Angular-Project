import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

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

  logout() {
    this.afAuth.currentUser.then(res => {
      this.afAuth.signOut();
    })
  }
}
