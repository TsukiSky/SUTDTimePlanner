import {Class} from "./Class";
import {Term} from "./Term";
import {Comment} from "./Comment";

export interface Course {
  courseId: number;
  name: string;
  pillar: string;
  link: string;
  description: string;

  classes: Class[];
  terms: Term[];
  comments: Comment[];

  termsInString: string;
  bgColor: string;
  isStarred: boolean;
}
