import { Injectable, NgZone } from '@angular/core';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AngularFirestoreDocument, AngularFirestore } from '@angular/fire/firestore';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData: any;


  constructor(public afAuth: AngularFireAuth,
    public ngZone: NgZone,
    public router: Router,
    public afs: AngularFirestore
    ) { 
        this.afAuth.authState.subscribe(user => {
          if(user) {
            this.userData = user;
            localStorage.setItem('user', JSON.stringify(this.userData));
            JSON.parse(localStorage.getItem('user'));
          } else {
            localStorage.setItem('user', null);
            JSON.parse(localStorage.getItem('user'));
          }
        })

    }

    doFacebookLogin(){
      return new Promise<any>((resolve, reject) =>{
        let provider = new firebase.auth.FacebookAuthProvider();
        this.afAuth.auth
        .signInWithPopup(provider)
        .then(res =>{
          resolve(res);
        }, err=>{
          console.log(err);
          reject(err);
        })
      })
}


doGoogleLogin(){
  return new Promise<any>((resolve, reject) => {
    let provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('profile');
    provider.addScope('email');
    this.afAuth.auth
    .signInWithPopup(provider)
    .then(res => {
      resolve(res);
    })
  })
}

doRegister(value){
  return new Promise<any>((resolve, reject) => {
    firebase.auth().createUserWithEmailAndPassword(value.email, value.password)
    .then(res => {
      resolve(res);
    }, err => reject(err))
  })
}

  forgotPassword(passwordResetEmail){
    return this.afAuth.auth.sendPasswordResetEmail(passwordResetEmail)
    .then(() =>{
      window.alert('Password reset email sent, check your inbox');
    }).catch((error) =>{
      window.alert(error)
    })
  }

  isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
     return (user !== null && user.emailVerified !== false) ? true : false;
  }

  signInGoogle() {
    return this.AuthLogin(new firebase.auth.GoogleAuthProvider());
  }

  AuthLogin(provider) {
    return this.afAuth.auth.signInWithPopup(provider)
      .then((result) => {
        this.ngZone.run(() => {
          this.router.navigate(['Homepage']);
        })
        this.SetUserData(result.user);
      }).catch((error) => {
        window.alert(error)
      })
  }

  SetUserData(user) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.id}`);
    const userData: User {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified
    }
    return userRef.set(userData, {
      merge: true
    })
  }

  SignOut() {
    return this.afAuth.auth.signOut().then(()=> {
      localStorage.removeItem('user');
      this.router.navigate(['login']);
    })
  }

  }
