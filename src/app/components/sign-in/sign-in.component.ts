import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent {

  myGroup: FormGroup;

  constructor(public authService: AuthService){
    this.myGroup = new FormGroup({
      email: new FormControl(),
      password: new FormControl()
    });
  }

  signIn(email:string, password:string):void {
    this.authService.signIn(email, password);
  }

}
