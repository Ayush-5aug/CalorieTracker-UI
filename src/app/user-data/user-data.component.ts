import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from "@angular/router";
import { CalorieTrackerService } from '../services/calorie-tracker.service';

@Component({
  selector: 'app-user-data',
  templateUrl: './user-data.component.html',
  styleUrls: ['./user-data.component.css']
})
export class UserDataComponent implements OnInit {

  userData: any = [];
  currentUser: any;

  constructor(private calorieTrackerService: CalorieTrackerService, private toastr: ToastrService, private router: Router) {

  }

  ngOnInit(): void {
    this.currentUser = JSON.parse(localStorage.getItem("currentUser") || "")
    this.calorieTrackerService.getUserData(this.currentUser._id).subscribe((response) => {
      this.userData = response.data
    }, (err) => {
      this.toastr.error(err.error.err)
    })
  }

  redirectToUserDetails(index: number) {
    let currentDate = this.userData[index].date
    localStorage.setItem("currentDate",JSON.stringify(currentDate));
    this.router.navigate(['../userDetails'])
  }
}
