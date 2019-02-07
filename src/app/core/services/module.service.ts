import {Injectable, Injector} from '@angular/core';
import {RestService} from 'angular4-hal';
import {Module} from '../../shared/hal-resources/Module';

@Injectable()
export class ModuleService extends RestService<Module> {

  constructor(injector: Injector) {
    super(Module, 'modules', injector);
  }
}
