import {Class} from "./Class";
import {Term} from "./Term";

export interface Course {
  courseId: number;
  name: string;
  pillar: string;
  isCore: number;
  link: string;
  description: string[];

  classes: Class[];
  terms: Term[];

  termsInString: string;
  color: string;
  isStarred: boolean;
}
