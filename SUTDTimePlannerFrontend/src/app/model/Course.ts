import { Slot } from "./Slot";

export interface Course {
  id: number;
  term: number;
  pillar: string;
  code: string;
  subject: string;
  instructors: string[];
  enrolmentCategory: string;
  isCore: boolean;
  preRequisites: string[];
  remark: string;
  slots: Slot[];
}
