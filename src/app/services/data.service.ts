import { Injectable, Input, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/compat/database';
import * as firebase from 'firebase/compat';
import { Item } from '../interfaces/item';

@Injectable({
  providedIn: 'root'
})
export class DataService {  

  useruid: any;

  constructor(private db: AngularFireDatabase, private frauth: AngularFireAuth) {
    
    this.frauth.onAuthStateChanged((user:any) => {
      if(user){
        this.useruid = user.uid;          
      }    
    });    
  }
  
  getAllItems():AngularFireList<Item> {    
    return this.db.list(`/users/${this.useruid}/items`);
  }

  getItem(id: string){
    return this.db.list(`/users/${this.useruid}/items${id}`);
  }

  addItem(item: Item){    
    return this.db.list(`/users/${this.useruid}/items`).push(item);
  }   

  updateItem(id:string){
    return this.db.list(`/users/${this.useruid}/items`);
  }
  
  deleteItem(id:string){
    return this.db.list(`/users/${this.useruid}/items/${id}`).remove();
  }

  saveDraft(key:string, items: Item[] ){
    return this.db.object(`/users/${this.useruid}/drafts/${key}`).update(items);
  }

}
