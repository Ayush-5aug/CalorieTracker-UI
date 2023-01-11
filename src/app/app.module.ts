import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignupComponent } from './signup/signup.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserDataComponent } from './user-data/user-data.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { CalorieTrackerService } from './services/calorie-tracker.service';

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    UserListComponent,
    UserDataComponent,
    UserDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    NgbModule
  ],
  providers: [CalorieTrackerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
