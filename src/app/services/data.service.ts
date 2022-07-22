import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';
import { Item } from '../interfaces/item';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  user: any;

  constructor(private db: AngularFireDatabase) {
    this.user = JSON.parse(localStorage.getItem('user')!);
  }
  
  getAllItems() {
    return this.db.list(`/users/${this.user.uid}/items`);
  }

  addItem(item: any){    
    return this.db.list(`/users/${this.user.uid}/items`).push(item);
  }   

}
