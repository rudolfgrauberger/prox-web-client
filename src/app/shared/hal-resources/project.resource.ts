import {Resource} from 'angular4-hal';
import { UUID } from 'angular2-uuid';
import {Module} from "./module.resource";

export class Project extends Resource {
  name: string;
  description: string;
  status: string;
  creator: UUID;

  modules: Module[] = [];

  setModules(newModules: Module[]) {
    this.modules = newModules;

    // TODO delete relation modules
    for (let module of this.modules) {
      this.updateRelation("modules", module).subscribe(
        () => {},
        error => console.log(error)
      );
    }
  }
}
