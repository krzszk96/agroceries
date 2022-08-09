import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { map, Subscription } from 'rxjs';
import { RecipesService } from './recipes.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.scss']
})
export class RecipesComponent implements OnInit {

  recipes: any;
  clickedIndex: number = 0;
  subscription!: Subscription;

  constructor(
    private recipeService: RecipesService,
    private frauth: AngularFireAuth) { }

  ngOnInit(): void {
    this.frauth.onAuthStateChanged((user:any) => {
      if(user){
        this.retrieveRecipes();
      }
    });
  }

  identifyer = (item: any) => item.name;

  objectKeys(obj:Object) {
    return Object.keys(obj);
  }

  retrieveRecipes(): void {
    this.subscription = this.recipeService.getAllRecipes().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(recipes => {
      this.recipes = recipes;
      console.log(recipes);

    });
  }

  addRecipe(recipe: string, url: string){
    this.recipeService.addRecipe(recipe, url);
  }

}
