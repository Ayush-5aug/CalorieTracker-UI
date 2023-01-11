import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CalorieTrackerService } from '../services/calorie-tracker.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

  currentUser: any;
  currentDate: any;
  foodData: any;
  activityData: any
  dateSpecificUserData: any;

  constructor(private calorieTrackerService: CalorieTrackerService, private toastr: ToastrService) {

  }

  ngOnInit(): void {
    this.currentUser = JSON.parse(localStorage.getItem("currentUser") || "")
    this.currentDate = JSON.parse(localStorage.getItem("currentDate") || "")
    this.calorieTrackerService.getActivityData(this.currentUser._id, this.currentDate).subscribe((response) => {
      this.activityData = response.data
    }, (err) => {
      this.toastr.error(err.error.err)
    })
    this.calorieTrackerService.getFoodData(this.currentUser._id, this.currentDate).subscribe((response) => {
      this.foodData = response.data
    }, (err) => {
      this.toastr.error(err.error.err)
    })
    this.calorieTrackerService.getUserDataForSpecificDate(this.currentUser._id, this.currentDate).subscribe((response) => {
      this.dateSpecificUserData = response.data
      console.log(this.dateSpecificUserData)
    }, (err) => {
      this.toastr.error(err.error.err)
    })
  }

  getMealTime(mealType : number) {
    if (mealType == 1) {
      return "Breakfast"
    } else if (mealType == 2) {
      return "Lunch"
    } else if (mealType == 3) {
      return "Dinner"
    } 
    return "NA"
  }

}
