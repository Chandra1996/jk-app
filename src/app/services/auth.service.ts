import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user$: Observable<any>;

  constructor(private afAuth: AngularFireAuth) {
    this.user$ = afAuth.authState; // Observable to track user state
  }

  // Sign Up
  async signUp(email: string, password: string): Promise<any> {
    return await this.afAuth.createUserWithEmailAndPassword(email, password);
  }

  // Login
  async login(email: string, password: string): Promise<any> {
    return await this.afAuth.signInWithEmailAndPassword(email, password);
  }

  // Logout
  async logout(): Promise<void> {
    
    return await this.afAuth.signOut();
  }

  // Get Current User
  getCurrentUser() {
    return this.afAuth.currentUser;
  }

  deleteUser() {
    return this.afAuth.user
  }

  async getdocId(){
    let user=await this.afAuth.currentUser;
    return user?.uid;
  }
}
