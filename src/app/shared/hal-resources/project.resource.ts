import {Resource} from 'angular4-hal';
import {Module} from "./module.resource";
import { UUID } from 'angular2-uuid';

export class Project extends Resource {
  name: string;
  description: string;
  status: string;
  creator: UUID;

  //modules: Module[];
}
