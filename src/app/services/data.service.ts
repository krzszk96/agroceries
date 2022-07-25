import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/compat/database';
import { Item } from '../interfaces/item';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  user: any;

  constructor(private db: AngularFireDatabase) {
    this.user = JSON.parse(localStorage.getItem('user')!);
  }
  
  getAllItems():AngularFireList<Item> {
    return this.db.list(`/users/${this.user.uid}/items`);
  }

  getItem(id: string){
    return this.db.list(`/users/${this.user.uid}/items${id}`);
  }

  addItem(item: Item){    
    return this.db.list(`/users/${this.user.uid}/items`).push(item);
  }   

  updateItem(id:string){
    return this.db.list(`/users/${this.user.uid}/items`);
  }

}
