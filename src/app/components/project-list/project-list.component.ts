import { Component, OnInit } from '@angular/core';
import {ProjectService} from '../../core/services/project.service';
import {Project} from '../../shared/hal-resources/project.resource';
import {MatDialog, MatSelectChange} from '@angular/material';
import {StudyCourse} from '../../shared/hal-resources/study-course.resource';
import {ProjectDialogComponent} from '../project-dialog/project-dialog.component';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit {
  projects: Project[] = [];
  allStatus: string[] = [];

  constructor(private projectService: ProjectService,
              public dialog: MatDialog) { }

  ngOnInit() {
    this.getAllProjects();
  }

  getAllProjects() {
    this.projectService.getAll().subscribe(
      projects => this.projects = projects,
      error => console.log(error),
      () => this.fillStatus(this.projects)
    );
  }

  filterProjectsByStatus(event: MatSelectChange) {
    const status = event.value;
    if (status) {
      this.projectService.findByStatus(status).subscribe(
        projects => this.projects = projects
      );
    } else {
      this.getAllProjects();
    }
  }

  openProjectDialog() {
    const projectDialogRef = this.dialog.open(ProjectDialogComponent, {
      autoFocus: false
    });
  }

  private fillStatus(projects: Project[]) {
    projects.forEach(project => this.allStatus.push(project.status));
    this.allStatus = this.allStatus.filter((value, index, self) => self.indexOf(value) === index);
  }

}
