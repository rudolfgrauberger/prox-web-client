import {Injectable, Injector} from '@angular/core';
import {Project} from '../../shared/hal-resources/project.resource';
import {RestService} from 'angular4-hal';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectService extends RestService<Project> {

  constructor(injector: Injector) {
    super(Project, 'projects', injector);
  }

  findByStatus(status: string): Observable<Project[]> {
    let options: any = {params: [{key: 'status', value: status}]};
    return this.search('findByStatus', options);
  }

  findByCreatorName(creatorName: string): Observable<Project[]> {
    let options: any = {params: [{key: 'creatorName', value: creatorName}]};
    return this.search('findByCreatorName', options);
  }
}
