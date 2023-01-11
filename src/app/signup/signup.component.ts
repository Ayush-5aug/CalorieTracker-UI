import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { CalorieTrackerService } from "../services/calorie-tracker.service";
import { SignupRequest } from "../types/SignupRequest";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupForm: FormGroup;

  constructor(private calorieTrackerService: CalorieTrackerService, private toastr: ToastrService) { 
    this.signupForm = new FormGroup({
      name: new FormControl("", [Validators.required]),
      weight: new FormControl("", [Validators.required]),
      height: new FormControl("", [Validators.required]),
      gender: new FormControl(1, [Validators.required]),
      dateOfBirth: new FormControl("", [Validators.required]),
    });
  }

  ngOnInit(): void {
    
  }

  getRequestBody() {
    let difference = Date.now() - new Date(this.signupForm.value.dateOfBirth).getTime();
    let ageDate = new Date(difference); 
	  let calculatedAge =   Math.abs(ageDate.getUTCFullYear() - 1970);
    let requestBody : SignupRequest = {
      name: this.signupForm.value.name,
      weight: this.signupForm.value.weight,
      height: this.signupForm.value.height,
      gender: this.signupForm.value.gender,
      age: calculatedAge
    }
    return requestBody
  }

  onSignup() {
    let requestBody : SignupRequest = this.getRequestBody()
    this.calorieTrackerService.addUser(requestBody).subscribe((response) => {
      this.toastr.success(response.data);
      this.signupForm.reset();
    }, (err) => {
      this.toastr.error(err.error.err);
    })
  }

}
