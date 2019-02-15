import {Injectable, Injector} from '@angular/core';
import {Project} from '../../shared/hal-resources/project.resource';
import {RestService} from 'angular4-hal';

@Injectable({
  providedIn: 'root'
})
export class ProjectService extends RestService<Project> {

  constructor(injector: Injector) {
    super(Project, 'projects', injector);
  }
}
