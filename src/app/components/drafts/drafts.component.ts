import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { first, map, merge, Observable, Subscription } from 'rxjs';
import { Item } from 'src/app/interfaces/item';
import { DraftsService } from 'src/app/components/drafts/drafts.service';
import { DraftItem } from 'src/app/interfaces/draftitem';
import { ListService } from '../list/list.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-drafts',
  templateUrl: './drafts.component.html',
  styleUrls: ['./drafts.component.scss']
})
export class DraftsComponent implements OnInit {

  Object = Object;
  item: Item ={};
  items: any;
  drafts: any;
  draft: any;
  subscription!: Subscription;
  clickedIndex: number = 0;

  constructor(
    private frauth: AngularFireAuth,
    private draftsService: DraftsService,
    private listService: ListService,
    private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.frauth.onAuthStateChanged((user:any) => {
      if(user){
        this.retrieveDrafts();
        this.getItemsfromList();
      }
    });
  }

  identifyer = (item: any) => item.name;

  objectKeys(obj:Object) {
    return Object.keys(obj);
  }

  retrieveDrafts(): void {
    this.subscription = this.draftsService.getAllDrafts().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(drafts => {
      this.drafts = drafts;
    });
  }

  getItemsfromList(): void {
    this.subscription = this.listService.getAllItems().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(items => {
      this.items = items;
    });
  }

  addDraft(draft: string){
    this.draftsService.addDraft(draft);
  }

  addItem(item: string, draft: string){
    this.draftsService.addItem(item, draft);
  }

  deleteItem(id: string, draft: string){
    this.draftsService.deleteItem(id, draft);
  }

  deleteDraft(draft: string){
    this.draftsService.deleteDraft(draft);
  }

  loadDraft(draft: string){
    this.draftsService.loadDraft(draft).snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe( draft => {
      const uniqueitem = this.checkForDuplicates(draft,this.items);

      uniqueitem.forEach(item =>{
        this.draftsService.draftItemstoList(item);
      })
      this._snackBar.open('Draft loaded', '', {
        duration: 1000
      });
    })
  }

  checkForDuplicates(array1:any, array2:any){
    let uniqueitems: any[] = [];
    let exists: boolean = false;

    for(let i=0; i<array1.length; i++){
      for(let j=0; j<array2.length; j++){
          if(array1[i].name == array2[j].name) exists = true
      }
      if(!exists) uniqueitems.push(array1[i]);
      exists = false
    }
    return uniqueitems;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
