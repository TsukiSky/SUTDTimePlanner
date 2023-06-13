import {Slot} from "./Slot";
import {Lecturer} from "./Lecturer";

export interface Class {
  classId: number;
  slots: Slot[];
  lecturers: Lecturer[];
  lecturersInString: string;
}
