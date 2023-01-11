import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './signup/signup.component'
import { UserListComponent } from './user-list/user-list.component'
import { UserDataComponent } from './user-data/user-data.component'
import { UserDetailsComponent } from './user-details/user-details.component'

const routes: Routes = [
  {
    path: "",
    component: SignupComponent,
    pathMatch: "full",
  },
  {
    path: "userList",
    component: UserListComponent,
    pathMatch: "full",
  },
  {
    path: "userData",
    component: UserDataComponent,
    pathMatch: "full",
  },
  {
    path: "userDetails",
    component: UserDetailsComponent,
    pathMatch: "full",
  },
  {
    path: "**",
    redirectTo: "",
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
