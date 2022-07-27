import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Components ______________________________________
import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';

// Firebase import ______________________________________
import { FirebaseModule } from './modules/firebase.module';

// Material materials import ______________________________________
import { MaterialModule } from './modules/material.module';
import { RecipesComponent } from './components/recipes/recipes.component';
import { DraftsComponent } from './components/drafts/drafts.component';
import { ListComponent } from './components/list/list.component';
import { SettingsComponent } from './components/settings/settings.component';
import { MoreComponent } from './components/more/more.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    SignInComponent,
    SignUpComponent,
    RecipesComponent,
    DraftsComponent,
    ListComponent,
    SettingsComponent,
    MoreComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FirebaseModule,
    MaterialModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
