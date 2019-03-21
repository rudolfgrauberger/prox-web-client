import {Component, EventEmitter, Inject, OnInit, Output} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef, MatSnackBar} from '@angular/material';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ProjectService} from '../../core/services/project.service';
import {Project} from '../../shared/hal-resources/project.resource';
import {Module} from '../../shared/hal-resources/module.resource';
import {ModuleService} from '../../core/services/module.service';
import {HalOptions, Resource} from "angular4-hal";
import {ProjectModuleService} from "../../core/services/projectModule.service";
import {UUID} from "angular2-uuid";
import {isPrimitive} from "util";
import {el} from "@angular/platform-browser/testing/src/browser_util";
import {StudyCourse} from "../../shared/hal-resources/study-course.resource";

@Component({
  selector: 'app-project-dialog',
  templateUrl: './project-dialog.component.html',
  styleUrls: ['./project-dialog.component.css']
})
export class ProjectDialogComponent implements OnInit {
  onProjectAdded = new EventEmitter();
  projectFormControl: FormGroup;
  modules: Module[] = [];
  selectedModules: Module[] = [];

  constructor(public projectDialogRef: MatDialogRef<ProjectDialogComponent>,
              private projectService: ProjectService,
              private projectModuleService: ProjectModuleService,
              private formBuilder: FormBuilder,
              private snack: MatSnackBar,
              @Inject(MAT_DIALOG_DATA) public project: any) {
  }

  ngOnInit() {
    this.projectFormControl = this.formBuilder.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      status: ['', [Validators.required]]
    });

    this.getModules().then((modules) => {
      for (let module of modules) {
        module.getStudyCourseArray().then();
      }
      this.fillInProjectValuesIfProjectExists();
    });
  }

  fillInProjectValuesIfProjectExists() {
    if (this.project) {
      this.projectFormControl.controls.name.setValue(this.project.name);
      this.projectFormControl.controls.description.setValue(this.project.description);
      this.projectFormControl.controls.status.setValue(this.project.status);

      this.project.getModules().subscribe(
        modules => {
          this.setSelectedModules(modules);
        }
      );
    }
  }

  buildModuleIdentifier(module: Module) : string {
    var identifier : string = module.name;
    identifier = identifier.concat(" {");

    for (var i = 0; i < module.studyCourses.length; i++) {
      if (i != 0) {
        identifier = identifier.concat(", ");
      }

      identifier = identifier.concat(module.studyCourses[i].name);
    }

    identifier = identifier.concat("}");
    return identifier;
  }

  setSelectedModules(modules: Module[]) {
    this.selectedModules = [];
    for (let module of modules) {
      let tmpModule : Module = this.getModuleBySelfLink(module._links.self.href);
      if (tmpModule) {
        this.selectedModules.push(tmpModule);
      }
    }
  }

  getModuleBySelfLink(selfLink: string) : Module {
    for (let tmpModule of this.modules) {
      if (tmpModule._links.self.href === selfLink)
        return tmpModule;
    }
    return null;
  }

  onClose() {
    this.projectDialogRef.close();
  }

  onSelectModule(module: Module) {
    if (this.selectedModules.includes(module)) {
      const index = this.selectedModules.indexOf(module, 0);
      if (index > -1) {
        this.selectedModules.splice(index, 1);
      }
    } else {
      this.selectedModules.push(module);
    }
  }

  getModules() : Promise<Module[]> {
    return new Promise<Module[]> ((resolve, reject) => {
      const options: HalOptions = {params: [{key: "notPaged", value: true}, {key: "size", value: 30}]}
      this.projectModuleService.getAll(options)
        .subscribe(tmpModules => this.modules = tmpModules,
            error => reject(error),
          () => resolve(this.modules)
        );
      }
    );
  }

  createProject(project: Project) {
    let newProject = new Project();
    newProject.creatorID = UUID.UUID(); // TODO has to be extracted from session
    newProject.creatorName = "Professor X"; // TODO has to be extracted from session
    newProject.description = project.description;
    newProject.name = project.name;
    newProject.status = project.status;
    newProject.setModules(this.selectedModules);

    // Create Project
    this.projectService.create(newProject).subscribe(
      () => {
        this.snack.open(newProject.name + ' wurde erfolgreich erstellt', null, {
          duration: 500,
        });
      },
      error => console.log(error),
      () => {
        this.onProjectAdded.emit();
      }
    );
  }

  updateProject(project: Project) {
    this.project.creatorID = UUID.UUID(); // TODO has to be extracted from session
    this.project.creatorName = "Professor X"; // TODO has to be extracted from session
    this.project.name = project.name;
    this.project.description = project.description;
    this.project.status = project.status;
    this.project.setModules(this.selectedModules);

    // Update Project
    this.projectService.patch(this.project).subscribe(
      () => {
        this.snack.open(project.name + ' wurde erfolgreich bearbeitet', null, {
          duration: 500,
        });
      },
      error => console.log(error),
      () => {
        this.onProjectAdded.emit();
      }
    );
  }

  onSubmit(project: Project) {
    if (this.project) {
      this.updateProject(project);
    } else {
      this.createProject(project);
    }
  }
}
