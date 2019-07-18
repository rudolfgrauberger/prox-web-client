import { UUID } from 'angular2-uuid';
import { Module } from './module.resource';
import { Observable } from 'rxjs';
import { CustomResource } from './custom-resource';

export class Proposal extends CustomResource {
  id: UUID;
  content: string;
  projectId: UUID;
  supervisorId: UUID;
  studentId: UUID;
}
