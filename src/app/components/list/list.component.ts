import { Component, OnInit, ViewChild } from '@angular/core';
import { Item } from 'src/app/interfaces/item';
import { DataService } from 'src/app/services/data.service';
import { map } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})

export class ListComponent implements OnInit {

  @ViewChild('taskinput') input: any;
  items: any;
  draftItems: any[] = [];
  item: Item ={};
  listtitle: string = 'shopping list name';

  itemscount: number = 0;
  itemsticked: number = 0;
  progresswidth: number = 0;

  showclose: boolean = false;
  clickedIndex: number = 0;

  subscription!: Subscription;

  constructor(
    private dataService: DataService, 
    private frauth: AngularFireAuth,
    private _snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.frauth.onAuthStateChanged((user:any) => {
      if(user){
        this.retrieveItems();
      }    
    });      
  }

  retrieveItems(): void {
    this.subscription = this.dataService.getAllItems().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(items => {
      this.items = items;      
      this.itemscount = this.items.length;   
      this.checkHowManyItemsTicked(this.items);      
    });
  }
  
  addItem(item: string){
    this.dataService.addItem({name: item, done: false});
    this.input.nativeElement.value = '';
  }

  deleteItem(id:any){
    this.dataService.deleteItem(id);
    this._snackBar.open('Item removed', '', {
      duration: 1000
    });
  }

  tickItem(id:any){    
    this.showclose = true;
    let donestate = false;
    for (let item of this.items){
      if(item.key == id) {donestate = item.done;} 
    }        
    this.dataService.updateItem(id).update(id, {done: !donestate});
  }

  checkHowManyItemsTicked(items: Item[]){
    this.itemsticked = 0;
    for (let item of items){      
      if(item.done == true) {this.itemsticked++;} 
    } 
    this.progresswidth = Math.round((this.itemsticked / this.itemscount) * 100);        
  }

  saveDraft(){
    this.items.map( (item:any) => {
      this.draftItems.push(item.name) ;
    })        
    this.dataService.saveDraft(this.listtitle, this.draftItems);
    this._snackBar.open('Draft saved', '', {
      duration: 1000
    });
    this.draftItems = [];
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}

