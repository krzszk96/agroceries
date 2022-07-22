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
  itemsRef!: AngularFireList<any>;

  constructor(private dataService: DataService) {}

  // TODO change item display to handle object with paramenters
  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user')!);
    this.dataService.getAllItems().valueChanges().subscribe(
      itemobj => {
      this.items =  itemobj;
      console.log(this.items);
    });
  }
  
  addItem(item: string){
    this.item = {
      name: item,
      done: false
    }
    this.dataService.addItem(this.item);
    this.input.nativeElement.value = '';
  }

  deleteItem(id:any){
    console.log(id);    
  }

  saveDoneItem(id:any){
    console.log(id);    
  }

}
