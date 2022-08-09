import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';

@Injectable({
  providedIn: 'root'
})
export class RecipesService {

  useruid: string = '';

  constructor(private db: AngularFireDatabase, private frauth: AngularFireAuth) {
    this.frauth.onAuthStateChanged((user:any) => {
      if(user){
        this.useruid = user.uid;
      }
    });
  }

  getAllRecipes():AngularFireList<any>{
    return this.db.list(`/users/${this.useruid}/recipes`);
  }

  addRecipe(recipe: string, url: string){
    return this.db.list(`/users/${this.useruid}/recipes`).set(recipe, {
      url: url
    })
  }

  addItem(item:string, recipe: string){
    return this.db.list(`/users/${this.useruid}/recipes/${recipe}`).push({name:item});
  }
}
