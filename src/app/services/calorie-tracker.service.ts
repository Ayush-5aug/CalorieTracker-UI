import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { catchError } from "rxjs/operators";
import { throwError } from "rxjs";
import { SignupRequest } from '../types/SignupRequest'
import { apiBaseUrl } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class CalorieTrackerService {

  constructor(private http: HttpClient) { }

  addUser(request: SignupRequest) {
    return this.http
      .post<any>(`${apiBaseUrl}/auth/signup`, request)
      .pipe(
        catchError((error) => {
          return throwError(error);
        })
      );
  }

  getAllUser() {
    return this.http
      .get<any>(`${apiBaseUrl}/user/getAllUser`)
      .pipe(
        catchError((error) => {
          return throwError(error);
        })
      );
  }

  getCalorieMasterData() {
    return this.http
      .get<any>(`${apiBaseUrl}/upload/getCalorieMasterData`)
      .pipe(
        catchError((error) => {
          return throwError(error);
        })
      );
  }

  getActivityMasterData() {
    return this.http
      .get<any>(`${apiBaseUrl}/upload/getActivityMasterData`)
      .pipe(
        catchError((error) => {
          return throwError(error);
        })
      );
  }

  addFoodData(foodDataRequest: any) {
    return this.http
      .post<any>(`${apiBaseUrl}/user/addFoodData`, foodDataRequest)
      .pipe(
        catchError((error) => {
          return throwError(error);
        })
      );
  }

  addActivityData(activityDataRequest: any) {
    return this.http
      .post<any>(`${apiBaseUrl}/user/addActivityData`, activityDataRequest)
      .pipe(
        catchError((error) => {
          return throwError(error);
        })
      );
  }

  getUserData(user: string) {
    return this.http
      .get<any>(`${apiBaseUrl}/user/getUserData?user=${user}`)
      .pipe(
        catchError((error) => {
          return throwError(error);
        })
      );
  }

  getFoodData(user: string, date: string) {
    return this.http
      .get<any>(`${apiBaseUrl}/user/getFoodData?user=${user}&date=${date}`)
      .pipe(
        catchError((error) => {
          return throwError(error);
        })
      );
  }

  getActivityData(user: string, date: string) {
    return this.http
      .get<any>(`${apiBaseUrl}/user/getActivityData?user=${user}&date=${date}`)
      .pipe(
        catchError((error) => {
          return throwError(error);
        })
      );
  }

  getUserDataForSpecificDate(user: string, date: string) {
    return this.http
      .get<any>(`${apiBaseUrl}/user/getUserDataForSpecificDate?user=${user}&date=${date}`)
      .pipe(
        catchError((error) => {
          return throwError(error);
        })
      );
  }
}
