import { Component, OnInit } from '@angular/core';
import {MatDialogRef, MatSnackBar} from '@angular/material';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ProjectService} from '../../core/services/project.service';
import {Project} from '../../shared/hal-resources/project.resource';

@Component({
  selector: 'app-project-dialog',
  templateUrl: './project-dialog.component.html',
  styleUrls: ['./project-dialog.component.css']
})
export class ProjectDialogComponent implements OnInit {
  projectFormControl: FormGroup;

  constructor(public projectDialogRef: MatDialogRef<ProjectDialogComponent>,
              private projectService: ProjectService,
              private formBuilder: FormBuilder,
              private snack: MatSnackBar) {}

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

  onSubmit(project: Project) {
    this.projectService.create(project).subscribe(
      data => {
        this.snack.open(project.name + ' wurde erfolgreich erstellt', null, {
          duration: 2000,
        });
        setTimeout(() => window.location.reload(), 2000);
      },
      error => console.log(error),
    );
  }
}
