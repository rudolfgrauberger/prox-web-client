import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Project} from '../../shared/hal-resources/project.resource';
import {ProjectService} from '../../core/services/project.service';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.css']
})
export class ProjectDetailsComponent implements OnInit {
  project: Project;
  projectName: string;

  constructor(private projectService: ProjectService, private route: ActivatedRoute) {
    this.route.params.subscribe(params => this.projectName = params.name);
  }

  ngOnInit() {
    this.getProject();
  }

  private getProject() {
    this.projectService.getAll().subscribe(
      projects => {
        for (let tmpProject of projects) {
          if (tmpProject.name === this.projectName) {
            this.project = tmpProject;

            this.project.getModules().subscribe( // TODO test
              modules => console.log(modules)
            );
          }
        }
      }
    );
  }
}
