import {Resource} from 'angular4-hal';
import {Module} from './Module';
import {Observable} from 'rxjs';

export class StudyCourse extends Resource {
  name: string;
  academicDegree: string;
  studyDirections: StudyCourse[];
  modules: Module[];
  parentStudyCourse: StudyCourse;

  getStudyDirections(): Observable<StudyCourse[]> {
    return this.getRelationArray(StudyCourse, 'studyDirections');
  }

  getModules(): Observable<Module[]> {
    return this.getRelationArray(Module, 'modules');
  }

  getParentStudyCourse(): Observable<StudyCourse> {
    return this.getRelation(StudyCourse, 'parentStudyCourse');
  }
}
