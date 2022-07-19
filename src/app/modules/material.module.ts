import { NgModule } from '@angular/core';

import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatDividerModule} from '@angular/material/divider';

@NgModule({
  declarations: [],
  exports: [
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatDividerModule
  ]
})
export class MaterialModule { }
