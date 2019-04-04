import {Injectable, Injector} from '@angular/core';
import {RestService} from "angular4-hal";
import {StudyCourse} from "../../shared/hal-resources/study-course.resource";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProjectStudyCourseService extends RestService<StudyCourse> {

  constructor(injector: Injector) {
    super(StudyCourse, 'projectStudyCourses', injector);
  }
}

