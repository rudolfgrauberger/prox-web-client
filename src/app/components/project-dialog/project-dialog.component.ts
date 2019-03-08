import {Component, OnInit} from '@angular/core';
import {MatDialogRef, MatSnackBar} from '@angular/material';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ProjectService} from '../../core/services/project.service';
import {Project} from '../../shared/hal-resources/project.resource';
import {Module} from '../../shared/hal-resources/module.resource';

export class DummyModule {
  name: string
}

export const MODULES: DummyModule[] = [
  { name: 'Module 1'},
  { name: 'Module 2'},
  { name: 'Module 3'},
  { name: 'Module 4'},
  { name: 'Module 5'},
  { name: 'Module 6'},
  { name: 'Module 7'},
];

@Component({
  selector: 'app-project-dialog',
  templateUrl: './project-dialog.component.html',
  styleUrls: ['./project-dialog.component.css']
})
export class ProjectDialogComponent implements OnInit {
  projectFormControl: FormGroup;
  modules = MODULES;
  selectedModules: DummyModule[] = [];

  constructor(public projectDialogRef: MatDialogRef<ProjectDialogComponent>,
              private projectService: ProjectService,
              private formBuilder: FormBuilder,
              private snack: MatSnackBar) {
  }

  ngOnInit() {
    this.projectFormControl = this.formBuilder.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      status: ['', [Validators.required]]
    });
  }

  onClose() {
    this.projectDialogRef.close();
  }

  onSelectModule(module: DummyModule) {
    if (this.selectedModules.includes(module)) {
      const index = this.selectedModules.indexOf(module, 0);
      if (index > -1) {
        this.selectedModules.splice(index, 1);
      }
    } else {
      this.selectedModules.push(module);
    }
  }

  onSubmit(project: Project) {
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
