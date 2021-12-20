import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";
import {StudentSocialComponent} from "./student-social/student-social.component";
import {AuthorizeGuard} from "./services/authorize.guard";

const routes: Routes = [
  // {path:'', redirectTo:'login', pathMatch:'full'},
  {path:'', component:StudentSocialComponent,canActivate: [AuthorizeGuard]},
  {path:'login', component:LoginComponent},
  {path:'register', component:RegisterComponent},
  {path:'student-social', component:StudentSocialComponent,canActivate: [AuthorizeGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
