import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  @ViewChild('taskinput') input: any;
  taskinput: string = '';

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
