import { Course } from "./Course";

export interface User {
    username: string;
    email: string;
    password: string;
    courses: Course[];
  }