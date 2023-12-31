import { Class } from "./Class";
import { Course } from "./Course";

export interface User {
    username: string;
    email: string;
    password: string;
    enrolCourseIds: number[];
    starCourseIds: number[];
    classesIds: number[];
  }