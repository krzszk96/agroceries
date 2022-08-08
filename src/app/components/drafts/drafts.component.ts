import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { first, map, merge, Observable, Subscription } from 'rxjs';
import { Item } from 'src/app/interfaces/item';
import { DraftsService } from 'src/app/components/drafts/drafts.service';
import { DraftItem } from 'src/app/interfaces/draftitem';
import { ListService } from '../list/list.service';

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
  subscription!: Subscription;
  clickedIndex: number = 0;

  constructor(
    private frauth: AngularFireAuth,
    private draftsService: DraftsService,
    private listService: ListService) { }

  ngOnInit(): void {
    this.frauth.onAuthStateChanged((user:any) => {
      if(user){
        this.retrieveDrafts();
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
    let draft$ = this.draftsService.loadDraft;
    let items$ = this.listService.getAllItems;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
