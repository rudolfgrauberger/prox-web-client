import {Resource} from 'angular4-hal';
import {Observable} from "rxjs";
import {StudyCourse} from "./study-course.resource";

export class Module extends Resource {
  name: string;
  description: string;
  studyCourses: StudyCourse[] = [];

  getStudyCourses(): Observable<StudyCourse[]> {
    return this.getRelationArray(StudyCourse, 'studyCourses');
  }

  getStudyCourseArray(): Promise<StudyCourse[]> {
    return new Promise<StudyCourse[]> ((resolve, reject) => {
      this.getStudyCourses().subscribe(
        tmp_studyCourses => this.studyCourses = tmp_studyCourses,
        () => reject(),
        () => resolve(this.studyCourses)
      );
      }
    );
  }
}
