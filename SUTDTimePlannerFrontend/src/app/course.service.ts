import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../environments/environment";
import {Observable, of, tap} from "rxjs";
import {Course} from "./model/Course";

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private apiUrl = environment.apiUrl;
  private courses: Course[] = [];

  constructor(private http: HttpClient) { }

  public getAllCourses(): Observable<Course[]> {
    if (this.courses.length > 0) {
      return of(this.courses)
    }
    return this.requestAllCourse();
  }

  public requestAllCourse(): Observable<Course[]> {
    return this.http.get<Course[]>(`${this.apiUrl}/course/find/all`).pipe(
      tap(courses => {
        console.log(courses);
        this.courses = courses;
      })
    );
  }
}
