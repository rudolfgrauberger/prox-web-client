import {Injectable, Injector} from '@angular/core';
import {RestService} from "angular4-hal";
import {Module} from "../../shared/hal-resources/module.resource";

@Injectable({
  providedIn: 'root'
})
export class ProjectModuleService extends RestService<Module> {

  constructor(injector: Injector) {
    super(Module, 'projectModules', injector);
  }
}
