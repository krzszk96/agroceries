import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';
import { Item } from 'src/app/interfaces/item';
import { DataService } from 'src/app/services/data.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})

export class ListComponent implements OnInit {

  @ViewChild('taskinput') input: any;
  items: any;
  user: any;
  item: Item ={};

  itemscount: number = 0;
  itemsticked: number = 0;
  progresswidth: number = 0;

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user')!);
    this.retrieveItems();
  }

  retrieveItems(): void {
    this.dataService.getAllItems().snapshotChanges().pipe(
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
    console.log("Not yet implemeneted, clicked id: " +id);    
  }

  tickItem(id:any){
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
}

