import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';
import { Item } from 'src/app/interfaces/item';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  @ViewChild('taskinput') input: any;
  taskinput: string = '';
  todos: any;
  user: any;

  constructor(private dataService: DataService, private db: AngularFireDatabase) {
  }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user')!);
    this.db.list(`/users/${this.user.uid}/items`).valueChanges().subscribe(todos => {
      this.todos = todos;
      console.log(this.todos);
    });
  }


  addItem(item: string){
    this.dataService.addItem(item);
    this.input.nativeElement.value = '';
  }

}
