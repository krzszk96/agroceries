import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DraftsComponent } from './components/drafts/drafts.component';
import { ListComponent } from './components/list/list.component';
import { RecipesComponent } from './components/recipes/recipes.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';

const routes: Routes = [
  
  { path: 'sign-in', component: SignInComponent },
  { path: 'register-user', component: SignUpComponent },
  { path: 'dashboard', component: DashboardComponent, // this is the component with the <router-outlet> in the template
    children: [
      { path: 'list', component: ListComponent },
      { path: 'recipes', component: RecipesComponent },
      { path: 'drafts', component: DraftsComponent },
    ],
  },

  { path: '', redirectTo: '/sign-in', pathMatch: 'full' },
  { path: '**', redirectTo: 'sign-in' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
