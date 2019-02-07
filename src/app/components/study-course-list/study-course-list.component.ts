import {Component, OnInit} from '@angular/core';
import {StudyCourse} from '../../shared/hal-resources/study-course.resource';
import {StudyCourseService} from '../../core/services/study-course.service';
import {HalOptions} from 'angular4-hal';

@Component({
  selector: 'app-module-list',
  templateUrl: './study-course-list.component.html',
  styleUrls: ['./study-course-list.component.scss']
})
export class StudyCourseListComponent implements OnInit {

  studyCourses: StudyCourse[] = [];

  constructor(
    private studyCourseService: StudyCourseService) {
  }

  ngOnInit() {
    this.getAllStudyCourses();
  }

  getAllStudyCourses() {
    const options: HalOptions = {sort: [{path: 'name', order: 'ASC'}]};
    this.studyCourseService.getAll(options).subscribe((studyCourses: StudyCourse[]) => {
      this.studyCourses = studyCourses;
    });
  }
}
