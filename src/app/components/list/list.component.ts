import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { Item } from 'src/app/interfaces/item';
import { ListService } from 'src/app/components/list/list.service';
import { first, map, take } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { MatSnackBar } from '@angular/material/snack-bar';
import { pipe, Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent, ConfirmDialogModel } from '../confirmation-dialog/confirmation-dialog.component';

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
    private listService: ListService,
    private frauth: AngularFireAuth,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog) {}

  ngOnInit(): void {
    this.frauth.onAuthStateChanged((user:any) => {
      if(user){
        this.retrieveItems();
      }
    });
  }

  retrieveItems(): void {
    this.subscription = this.listService.getAllItems().snapshotChanges().pipe(
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
    this.listService.addItem({name: item, done: false});
    this.input.nativeElement.value = '';
  }

  deleteItem(id:any){
    this.listService.deleteItem(id);
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
    this.listService.updateItem(id).update(id, {done: !donestate});
  }

  checkHowManyItemsTicked(items: Item[]){
    this.itemsticked = 0;
    for (let item of items){
      if(item.done == true) {this.itemsticked++;}
    }
    this.progresswidth = Math.round((this.itemsticked / this.itemscount) * 100);
  }

  saveDraft(){
    this.draftItems = [];
    this.items.map( (item:any) => {
      this.draftItems.push({
        key:item.key,
        name: item.name}) ;
    })

    this.listService.checkIfDraftAlreadyExists(this.listtitle).snapshotChanges().pipe(first()).subscribe(
      event => {
        if(event.length == 0) {
          this.draftItems.forEach( (item:any) =>{
            this.listService.saveDraft(this.listtitle, item);
          });
          this._snackBar.open('Draft saved', '', {
            duration: 1000
          });
        } else {
          this.confirmDialog(this.listtitle);
        }
      }
    );
  }

  confirmDialog(listname: string): void {
    const message = `Draft with name: ${listname} already exists, do you want to add items to this draft? `;

    const dialogData = new ConfirmDialogModel("Draft already exists!", message);

    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      panelClass: 'custom-dialog-container',
      maxWidth: "350px",
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      if(dialogResult){
        this.draftItems.forEach( (item:any) =>{
          this.listService.saveDraft(this.listtitle, item);
        });
        this._snackBar.open('Draft saved', '', {
          duration: 1000
        });
      }
      else{
        this._snackBar.open('Draft was NOT saved', '', {
          duration: 1500
        });
      }
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}

