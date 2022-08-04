import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {

  myGroup: FormGroup;

  constructor(public authService: AuthService) {
    this.myGroup = new FormGroup({
      email: new FormControl(),
      password: new FormControl()
    });
  }

  signUp(email:string, password:string):void {
    this.authService.signUp(email, password);
  }

}
