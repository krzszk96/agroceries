import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  isValue: number = 1;

  constructor(public authService: AuthService){this.loadMenu();}

  saveMenu(nr: number){
      localStorage.setItem('menupos', String(nr));  
  }

  loadMenu(){
    this.isValue = Number(localStorage.getItem('menupos'));
  }

  toggle(num:number) {  this.isValue = num; this.saveMenu(num);}

  signOut(){
    this.saveMenu(1);
    this.authService.signOut();
  }

}
