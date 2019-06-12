import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Project } from '../../shared/hal-resources/project.resource';
import { ProjectService } from '../../core/services/project.service';
import { UUID } from 'angular2-uuid';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.scss']
})
export class ProjectDetailsComponent implements OnInit {
  project: Project;
  projectID: UUID;

  constructor(private projectService: ProjectService, private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      this.projectID = params.id;
    });
  }

  ngOnInit() {
    this.getProject();
  }

  private getProject() {
    this.projectService.get(this.projectID).subscribe(project => (this.project = project));
  }
}
