import {Component, OnInit} from '@angular/core';
import {MatDialogRef, MatSnackBar} from '@angular/material';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ProjectService} from '../../core/services/project.service';
import {Project} from '../../shared/hal-resources/project.resource';
import {Module} from '../../shared/hal-resources/module.resource';
import {ModuleService} from '../../core/services/module.service';
import {HalOptions} from "angular4-hal";
import {ProjectModuleService} from "../../core/services/projectModule.service";
import {UUID} from "angular2-uuid";

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
              private snack: MatSnackBar) {
  }

  ngOnInit() {
    this.projectFormControl = this.formBuilder.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      status: ['', [Validators.required]]
    });
    this.getModules();
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

  getModules(): void {
    const options: HalOptions = {params: [{key: "notPaged", value: true}, {key: "size", value: 30}]}
    this.projectModuleService.getAll(options)
      .subscribe(tmpModules => this.modules = tmpModules);
  }

  onSubmit(project: Project) {
    //project.modules = this.selectedModules;
    project.creator = UUID.UUID(); // TODO has to be extracted from session

    this.projectService.create(project).subscribe(
      data => {
        this.snack.open(project.name + ' wurde erfolgreich erstellt', null, {
          duration: 500,
        });
        setTimeout(() => window.location.reload(), 500);
      },
      error => console.log(error),
    );
  }
}
