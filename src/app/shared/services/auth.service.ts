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
      throw await error;
    }
  }

  async signIn(username, password) {
    try {
        const user = await Auth.signIn(username, password);
        return user;
    } catch (error) {
        throw await error;
    }
 }

  async getCurrentUser() {
    return await Auth.currentAuthenticatedUser();
  }

  async getCurrentUserInfo() {
    return await Auth.currentUserInfo();
  }

  async getSession() {
    return await Auth.currentSession();
  }


  async signOut() {
    try {
       await Auth.signOut();
       return "Signed Out";
    } catch (error) {
        console.log('error signing out: ', error);
    }
  }
}
