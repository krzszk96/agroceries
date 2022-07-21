import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireDatabase  } from '@angular/fire/compat/database';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userData: any;

  constructor(
    private frauth: AngularFireAuth, 
    private afd: AngularFireDatabase,
    private router: Router) {
      this.frauth.authState.subscribe((user) => {
        if (user) {
          this.userData = user;
          localStorage.setItem('user', JSON.stringify(this.userData));
          JSON.parse(localStorage.getItem('user')!);
        } else {
          localStorage.setItem('user', 'null');
          JSON.parse(localStorage.getItem('user')!);
        }
      });
    }

  signUp(email: string, password: string){
    return this.frauth.createUserWithEmailAndPassword(email, password)
      .then((userCredential) => { 
        this.saveUserData(userCredential.user);        
        this.router.navigate(['/sign-in']);
      })
      .catch((error) => { window.alert(error.message); })
  }

  signIn(email: string, password: string){
    return this.frauth.signInWithEmailAndPassword(email, password)
      .then(() => {
        this.router.navigate(['/dashboard/list']);
      })
      .catch((error) => { window.alert(error.message); });
  }

  saveUserData(user: any){    
    return this.afd.object(`/users/${user.uid}`).set({email: user.email});
  }  

  signOut() {
    return this.frauth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['sign-in']);
    });
  }
}
