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

  setModules(newModules: Module[]) { // TODO set all modules in one request. how? framework method addRelation can only add one relationship at a time
    this.getModules().subscribe(
      deleteModules => {
        for (let deleteModule of deleteModules) {
          this.deleteRelation("modules", deleteModule).subscribe(
            () => {},
            error => console.log(error)
          );
        }
      },
      error => console.log(error),
      () => this.addModules(newModules)
    );
  }

  addModules(newModules: Module[]) {
    for (let module of newModules) {
      this.updateRelation("modules", module).subscribe(
        () => {},
        error => console.log(error)
      );
    }
  }

  getModules(): Observable<Module[]> {
    return this.getRelationArray(Module, 'modules');
  }
}
