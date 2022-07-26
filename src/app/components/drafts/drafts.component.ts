import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { map } from 'rxjs';
import { Item } from 'src/app/interfaces/item';
import { DraftsService } from 'src/app/services/drafts.service';

@Component({
  selector: 'app-drafts',
  templateUrl: './drafts.component.html',
  styleUrls: ['./drafts.component.scss']
})
export class DraftsComponent implements OnInit {

  Object = Object;
  item: Item ={};
  drafts: any;

  test: any;

  constructor(private frauth: AngularFireAuth, private draftsService: DraftsService) { }

  ngOnInit(): void {
    this.frauth.onAuthStateChanged((user:any) => {
      if(user){
        this.retrieveDrafts();
      }    
    }); 
  }

  objectKeys(obj:Object) {
    return Object.keys(obj);
  }

  retrieveDrafts(): void {
    this.draftsService.getAllDrafts().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(drafts => {
      console.log(drafts);
      this.drafts = drafts;
                 
    });
  }

}
