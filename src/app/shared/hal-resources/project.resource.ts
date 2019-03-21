import {Resource} from 'angular4-hal';
import { UUID } from 'angular2-uuid';
import {Module} from "./module.resource";
import {Observable} from "rxjs";

export class Project extends Resource {
  name: string;
  description: string;
  status: string;
  creatorID: UUID;
  creatorName: string;

  setModules(newModules: Module[]) { // Framework workaround Framework serialized Module[] in a wrong way -> Backend doesnt understand
    this["modules"] = new Array();

    for (let module of newModules) {
      this["modules"].push(module._links.self.href);
    }
  }

  getModules(): Observable<Module[]> {
    return this.getRelationArray(Module, 'modules');
  }
}
