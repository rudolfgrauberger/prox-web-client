import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from '@angular/material';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ProjectService} from '../../core/services/project.service';
import {Project} from '../../shared/hal-resources/project.resource';
import {Location} from '@angular/common';
import {Router} from '@angular/router';

@Component({
  selector: 'app-project-dialog',
  templateUrl: './project-dialog.component.html',
  styleUrls: ['./project-dialog.component.css']
})
export class ProjectDialogComponent implements OnInit {
  projectFormControl: FormGroup;

  private name: string;
  private description: string;
  private status: string;

  constructor(public projectDialogRef: MatDialogRef<ProjectDialogComponent>,
              private projectService: ProjectService,
              private formBuilder: FormBuilder,
              private location: Location,
              private router: Router) {}

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
      data => window.location.reload(),
      error => console.log(error)
    );
  }
}
