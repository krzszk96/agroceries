import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/compat/database';

@Injectable({
  providedIn: 'root'
})
export class DraftsService {

  useruid: string = '';

  constructor(private db: AngularFireDatabase, private frauth: AngularFireAuth) {
    this.frauth.onAuthStateChanged((user:any) => {
      if(user){
        this.useruid = user.uid;          
      }    
    });    
  }

  getAllDrafts():AngularFireList<any>{  
      return this.db.list(`/users/${this.useruid}/drafts`);
  }

  
}
