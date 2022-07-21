import { Component, OnInit, ViewChild } from '@angular/core';
import { List } from 'src/app/interfaces/list';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  @ViewChild('taskinput') input: any;
  taskinput: string = '';
  itemlist: List[] = [];

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.getItems();
    console.log(this.dataService.getItems());
    
  }

  addItem(item: string){
    this.dataService.addItem(item);
    this.input.nativeElement.value = '';
  }

}
