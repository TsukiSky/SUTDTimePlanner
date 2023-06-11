import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../environments/environment";
import {Observable} from "rxjs";
import {Course} from "./model/Course";

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  public getAllCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(`${this.apiUrl}/course/find/all`);
  }
}
