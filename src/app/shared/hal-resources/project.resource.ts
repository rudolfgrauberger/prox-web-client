import {Resource} from 'angular4-hal';

export class Project extends Resource {
  name: string;
  description: string;
  status: string;
}
