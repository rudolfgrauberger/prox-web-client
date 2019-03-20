import {Component, Inject, OnInit} from '@angular/core';
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

@Component({
  selector: 'app-project-dialog',
  templateUrl: './project-dialog.component.html',
  styleUrls: ['./project-dialog.component.css']
})
export class ProjectDialogComponent implements OnInit {
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

    this.getModules(() => {
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

  getModules(complete: Function) {
    const options: HalOptions = {params: [{key: "notPaged", value: true}, {key: "size", value: 30}]}
    this.projectModuleService.getAll(options)
      .subscribe(tmpModules => this.modules = tmpModules,
      error => console.log(error),
      () => complete()
    );
  }

  linkModules(linkProject: Project) {
    // Type Resource is needed for updating relations so that the resource has to be retrieved
    this.projectService.getBySelfLink(linkProject._links.self.href).subscribe(
      project => {
        project.setModules(this.selectedModules);
      }
    );
  }

  createProject(project: Project) {
    project.creatorID = UUID.UUID(); // TODO has to be extracted from session
    project.creatorName = "Professor X"; // TODO has to be extracted from session

    // Create Project
    this.projectService.create(project).subscribe(
      () => {
        this.snack.open(project.name + ' wurde erfolgreich erstellt', null, {
          duration: 500,
        });
      },
      error => console.log(error),
      () => {
        this.linkModules(project);
        setTimeout(function(){ window.location.reload(); }, 1000);
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
    this.projectService.update(this.project).subscribe(
      () => {
        this.snack.open(project.name + ' wurde erfolgreich bearbeitet', null, {
          duration: 500,
        });
      },
      error => console.log(error),
      () => {
        this.project.setModules(this.selectedModules);
        setTimeout(function(){ window.location.reload(); }, 1000);
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
