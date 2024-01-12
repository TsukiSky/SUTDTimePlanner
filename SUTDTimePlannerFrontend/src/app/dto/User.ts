export interface User {
    id: number;
    username: string;
    email: string;
    password: string;
    enrolCourseIds: number[];
    starCourseIds: number[];
    classesIds: number[];
  }
