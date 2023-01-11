import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from "@angular/router";
import { ToastrService } from 'ngx-toastr';
import { CalorieTrackerService } from '../services/calorie-tracker.service';
import { Users } from '../types/Users'

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  userList : any = [];
  selectedUserIndex: number = -1;
  selectedFoodCalorie: number = -1;
  selectedActivityMetValue: any;
  calorieMasterMapData: any;
  activityMasterMapData: any;
  foodListAsPerCategory: any;
  specificMotionAsPerActivity: any;
  addCalorieDataForm: FormGroup;
  addActivityDataForm: FormGroup;

  constructor(private calorieTrackerService: CalorieTrackerService, private toastr: ToastrService, private router: Router) {
    this.addCalorieDataForm = new FormGroup({
      date: new FormControl("", [Validators.required]),
      foodGroup: new FormControl(null, [Validators.required]),
      foodName: new FormControl(null, [Validators.required]),
      mealType: new FormControl(1, [Validators.required]),
      serving: new FormControl("", [Validators.required]),
    });
    this.addActivityDataForm = new FormGroup({
      date: new FormControl("", [Validators.required]),
      activityName: new FormControl(null, [Validators.required]),
      activityDescription: new FormControl(null, [Validators.required]),
      metValue: new FormControl("", []),
      duration: new FormControl("", [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.calorieTrackerService.getAllUser().subscribe((res) => {
      this.userList = res.data
    }, (err) => {
      this.toastr.error(err.error.err);
    })
  }

  fetchMasterData(index: number) {
    this.selectedUserIndex = index;
    this.calorieTrackerService.getActivityMasterData().subscribe((response) => {
      this.getActivityMap(response.data)
      console.log(response)
    }, (err) => {
      this.toastr.error(err.error.err);
    })

    this.calorieTrackerService.getCalorieMasterData().subscribe((response) => {
      this.getCalorieMap(response.data)
    }, (err) => {
      this.toastr.error(err.error.err);
    })
  }

  getCalorieMap(calorieMasterData: any) {
    let dataMap = new Map<string, Array<Array<any>>>();
    calorieMasterData.forEach((data: any) => {
      if (dataMap.has(data.foodGroup)) {
        let temp = dataMap.get(data.foodGroup)
        let x : Array<any>= [data.name, data.calories, data.protein, data.fat, data.carbs]
        temp?.push(x)
        dataMap.set(data.foodGroup, temp!)
      } else {
        dataMap.set(data.foodGroup, [[data.name, data.calories, data.protein, data.fat, data.carbs]])
      }
    })
    console.log(dataMap)
    this.calorieMasterMapData = dataMap
    let [firstKey] = dataMap.keys();
    this.foodListAsPerCategory = this.calorieMasterMapData.get(firstKey)
  }

  getActivityMap(activityMasterData: any) {
    let dataMap = new Map<string, Array<Array<any>>>();
    activityMasterData.forEach((data: any) => {
      if (dataMap.has(data.activity)) {
        let temp = dataMap.get(data.activity)
        let x : Array<any>= [data.specificMotion, data.metValue]
        temp?.push(x)
        dataMap.set(data.activity, temp!)
      } else {
        dataMap.set(data.activity, [[data.specificMotion, data.metValue]])
      }
    })
    console.log(dataMap)
    this.activityMasterMapData = dataMap
    let [firstKey] = dataMap.keys();
    this.specificMotionAsPerActivity = this.activityMasterMapData.get(firstKey)
  }

  onFoodCategoryChanged(event: any) {
      let foodCategory = event.target.value
      this.foodListAsPerCategory = this.calorieMasterMapData.get(foodCategory)
  }

  onActivityChanged(event: any) {
    let activity = event.target.value
    this.specificMotionAsPerActivity = this.activityMasterMapData.get(activity)
    this.selectedActivityMetValue = this.specificMotionAsPerActivity[0][1]
  }

  setSelectedFoodCalorie(event: any) {
    this.selectedFoodCalorie = event.target.value
  }

  setMetValue(event: any) {
    let selectedDescription = event.target.value
    let selectedActivity = this.addActivityDataForm.value.activityName
    let possibleActivityDescriptions = this.activityMasterMapData.get(selectedActivity)
    for(let index = 0; index < possibleActivityDescriptions.length; index++) {
      if (possibleActivityDescriptions[index].includes(selectedDescription)) {
        this.selectedActivityMetValue = possibleActivityDescriptions[index][1]
        break;
      }
    }
  }

  validateSelectedDate(selectedDate: any) {
    let currentDate = new Date();
    let enteredDate = new Date(selectedDate)
    let differenceInTime = currentDate.getTime() - enteredDate.getTime();
    let differenceInDays = differenceInTime / (1000 * 3600 * 24);
    if (differenceInDays > 30) {
      this.toastr.error("You should not be able to select more than 30 days in past")
      return false
    } else if (currentDate < enteredDate) {
      this.toastr.error("Don't select advance dates")
      return false
    }
    return true
  }

  onSubmitCalorieForm() {
    if (this.validateSelectedDate(this.addCalorieDataForm.value.date)) {
      let requestBody = {
        User: this.userList[this.selectedUserIndex]._id,
        date: this.addCalorieDataForm.value.date,
        mealType: this.addCalorieDataForm.value.mealType,
        foodGroup: this.addCalorieDataForm.value.foodGroup,
        serving: this.addCalorieDataForm.value.serving,
        calorieIn: this.selectedFoodCalorie,
        bmr: this.userList[this.selectedUserIndex].bmr
      }
      this.calorieTrackerService.addFoodData(requestBody).subscribe((response) => {
        this.toastr.success(response.data);
        document.getElementById("closeBtn")?.click();
      }, (err) => {
        this.toastr.error(err.error)
      })
    }
  }

  onSubmitActivityForm() {
    if (this.validateSelectedDate(this.addActivityDataForm.value.date)) {
      let requestBody = {
        User: this.userList[this.selectedUserIndex]._id,
        date: this.addActivityDataForm.value.date,
        name: this.addActivityDataForm.value.activityName,
        description: this.addActivityDataForm.value.activityDescription,
        metValue: this.selectedActivityMetValue,
        duration: this.addActivityDataForm.value.duration,
        weight: this.userList[this.selectedUserIndex].weight,
        bmr: this.userList[this.selectedUserIndex].bmr
      }
      this.calorieTrackerService.addActivityData(requestBody).subscribe((response) => {
        this.toastr.success(response.data);
        document.getElementById("closeBtn")?.click();
      }, (err) => {
        this.toastr.error(err.error)
      })
    }
  }

  redirectToUserData(index: number) {
    let currentUser = this.userList[index]
    localStorage.setItem("currentUser",JSON.stringify(currentUser));
    this.router.navigate(['../userData'])
  }
}
