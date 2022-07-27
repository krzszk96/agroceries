import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth.service';
import { MoreComponent } from '../more/more.component';
import { SettingsComponent } from '../settings/settings.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  status: boolean = false;

  constructor(public authService: AuthService, private dialog: MatDialog){}

  openSettingsDialog(){
    let dialogRef = this.dialog.open(SettingsComponent, {
      width: '450px'
    })

    // dialogRef.afterClosed().subscribe(result => {
    //   console.log('The dialog was closed', result);      
    // })
  }

  openMoreDialog(){
    let dialogRef = this.dialog.open(MoreComponent, {
      width: '450px'
    })

    // dialogRef.afterClosed().subscribe(result => {
    //   console.log('The dialog was closed', result);      
    // })
  }

  signOut(){
    this.authService.signOut();
  }
}
