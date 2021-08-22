import { Injectable, NgZone } from '@angular/core';
// import { User } from "./user";
// import { AngularFireAuth } from "@angular/fire/auth";
// import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import Amplify, { Auth } from 'aws-amplify';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userData: any; // Save logged in user data

  constructor(
    public router: Router,
    public ngZone: NgZone // NgZone service to remove outside scope warning
  ) {
    Amplify.configure({
      region: 'eu-central-1',
      userPoolId: 'eu-central-1_sILHp0iGB',
      userPoolWebClientId: 'e1vmosto901c5n4kfio1o7g1b',
      authenticationFlowType: 'USER_SRP_AUTH',
    });
  }

  // Sign in with email/password
  SignIn(email, password) {}

  // Sign up with email/password
  async signUp(email, username, password) {
    try {
      const { user } = await Auth.signUp({
        username,
        password,
        attributes: {
          email,
        },
      });
      return user;
    } catch (error) {
      console.log('error signing up:', error);
    }
  }

  async signIn(username, password) {
    try {
        const user = await Auth.signIn(username, password);
        return user;
    } catch (error) {
        console.log('error signing in', error);
    }
 }

  async getCurrentUser() {
    return await Auth.currentAuthenticatedUser();
  }

  async getCurrentUserInfo() {
    return await Auth.currentUserInfo();
  }


  async signOut() {
    try {
       await Auth.signOut();
       return "Signed Out";
    } catch (error) {
        console.log('error signing out: ', error);
    }
  }

  // Send email verfificaiton when new user sign up
  // SendVerificationMail() {
  //   return this.afAuth.currentUser.sendEmailVerification()
  //   .then(() => {
  //     this.router.navigate(['verify-email-address']);
  //   })
  // }

  // Reset Forggot password
  // ForgotPassword(passwordResetEmail) {
  //   return this.afAuth.sendPasswordResetEmail(passwordResetEmail)
  //   .then(() => {
  //     window.alert('Password reset email sent, check your inbox.');
  //   }).catch((error) => {
  //     window.alert(error)
  //   })
  // }

  // Returns true when user is looged in and email is verified
  // get isLoggedIn(): boolean {
  //   const user = JSON.parse(localStorage.getItem('user'));
  //   return (user !== null && user.emailVerified !== false) ? true : false;
  // }

  // Sign in with Google
  // GoogleAuth() {
  //   return this.AuthLogin(new auth.GoogleAuthProvider());
  // }

  // Auth logic to run auth providers
  // AuthLogin(provider) {
  //   return this.afAuth.signInWithPopup(provider)
  //   .then((result) => {
  //      this.ngZone.run(() => {
  //         this.router.navigate(['dashboard']);
  //       })
  //     this.SetUserData(result.user);
  //   }).catch((error) => {
  //     window.alert(error)
  //   })
  // }

  /* Setting up user data when sign in with username/password, 
  sign up with username/password and sign in with social auth  
  provider in Firestore database using AngularFirestore + AngularFirestoreDocument service */
  // SetUserData(user) {
  //   const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
  //   const userData: User = {
  //     uid: user.uid,
  //     email: user.email,
  //     displayName: user.displayName,
  //     photoURL: user.photoURL,
  //     emailVerified: user.emailVerified
  //   }
  //   return userRef.set(userData, {
  //     merge: true
  //   })
  // }

  // Sign out
  SignOut() {
    // return this.afAuth.signOut().then(() => {
    //   localStorage.removeItem('user');
    //   this.router.navigate(['sign-in']);
    // })
  }
}
