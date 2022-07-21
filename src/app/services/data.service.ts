import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  dbitems: AngularFireList<any> | undefined;
  user: any;

  constructor(private db: AngularFireDatabase) {
    this.user = JSON.parse(localStorage.getItem('user')!);
  }

  addItem(item: any){    
    return this.db.list(`/users/${this.user.uid}/items`).push(item);
  }   

  getItems(){
    this.dbitems = this.db.list(`/users/${this.user.uid}/items`);
    return this.dbitems;   
  }
}
