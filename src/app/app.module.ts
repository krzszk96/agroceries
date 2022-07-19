import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';

// Firestore modules ______________________________________
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAKO8LuJ1BHNKXyl7SjJa_a9uX1o6MoEEs",
  authDomain: "angulargroceries.firebaseapp.com",
  projectId: "angulargroceries",
  storageBucket: "angulargroceries.appspot.com",
  messagingSenderId: "1074478989562",
  appId: "1:1074478989562:web:7b3adf0abe204d37b54943"
};

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,

    // Firestore modules ______________________________________
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule, // firestore
    AngularFireAuthModule, // auth
    AngularFireStorageModule // storage
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
