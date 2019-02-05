import {Resource} from 'angular4-hal';
import {Module} from './Module';
import {Observable} from 'rxjs';

export class StudyCourse extends Resource {
  name: string;
  academicDegree: string;
  modules: Module[];

  getStudyDirections(): Observable<StudyCourse[]> {
    return this.getRelationArray(StudyCourse, 'studyDirections');
  }

  getModules(): Observable<Module[]> {
    // THIS DOES NOT WORK
    // There is a bug that appends a slash between the URL and the params
    // when you call getRelationArray with HalOptions
    // let options: HalOptions = {sort: [{path: 'name', order: 'ASC'}]};
    // return this.getRelationArray(Module, 'modules', undefined, options);
    return this.getRelationArray(Module, 'modules');
  }

  getParentStudyCourse(): Observable<StudyCourse> {
    return this.getRelation(StudyCourse, 'parentStudyCourse');
  }

  getModuleArray(): Module[] {
    let modules: Module[] = [];
    this.getModules().subscribe(
      tmp_modules => modules = tmp_modules
    );
    return modules.sort(
      function (a, b) {
        if (a.name < b.name) {
          return -1;
        }
        if (a.name > b.name) {
          return 1;
        }
        return 0;
      }
    );
  }
}
