import {Injectable, Injector} from '@angular/core';
import {RestService} from 'angular4-hal';
import {StudyCourse} from '../resources/StudyCourse';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudyCourseService extends RestService<StudyCourse> {

  constructor(injector: Injector) {
    super(StudyCourse, 'studyCourses', injector);
  }
}
