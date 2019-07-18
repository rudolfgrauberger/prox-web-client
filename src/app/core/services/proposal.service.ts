import { Injectable, Injector } from '@angular/core';
import { RestService } from 'angular4-hal';
import { Proposal } from '../../shared/hal-resources/proposal-resource';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProposalService extends RestService<Proposal> {
  constructor(injector: Injector) {
    super(Proposal, 'proposals', injector);
  }

  findByProjectId(projectId: string): Observable<Proposal[]> {
    let options: any = { params: [{ key: 'projectId', value: projectId }] };
    return this.search('findByProjectId', options);
  }
}
