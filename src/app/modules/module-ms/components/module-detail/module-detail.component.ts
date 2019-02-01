import {Component, OnInit} from '@angular/core';
import {StudyCourse} from '../../resources/StudyCourse';
import {StudyCourseService} from '../../services/study-course.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-module-detail',
  templateUrl: './module-detail.component.html',
  styleUrls: ['./module-detail.component.scss']
})
export class ModuleDetailComponent implements OnInit {
  studyCourse: StudyCourse;
  studyCourseName: string;

  constructor(private studyCourseService: StudyCourseService, private route: ActivatedRoute) {
    this.route.params.subscribe(params => this.studyCourseName = params.name);
  }

  ngOnInit() {
    this.getStudyCourse();
  }

  private getStudyCourse() {
    this.studyCourseService.getAll().subscribe(
      studyCourses => {
        for(let tmpStudyCourse of studyCourses) {
          if (tmpStudyCourse.name === this.studyCourseName) {
            this.studyCourse = tmpStudyCourse;
          }
        }
      }
    );
  }

}
