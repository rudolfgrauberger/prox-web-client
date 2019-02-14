import {Component, OnInit} from '@angular/core';
import {StudyCourse} from '../../shared/hal-resources/study-course.resource';
import {StudyCourseService} from '../../core/services/study-course.service';
import {HalOptions} from 'angular4-hal';
import {MatSelectChange} from '@angular/material';

@Component({
  selector: 'app-module-list',
  templateUrl: './study-course-list.component.html',
  styleUrls: ['./study-course-list.component.scss']
})
export class StudyCourseListComponent implements OnInit {

  studyCourses: StudyCourse[] = [];
  academicDegrees: string[] = [];

  constructor(
    private studyCourseService: StudyCourseService) {
  }

  ngOnInit() {
    this.getAllStudyCourses();
  }

  getAllStudyCourses() {
    const options: HalOptions = {sort: [{path: 'name', order: 'ASC'}]};
    this.studyCourseService.getAll(options).subscribe(
      (studyCourses: StudyCourse[]) => { this.studyCourses = studyCourses; },
      error => console.log(error),
      () => this.fillAcademicDegrees(this.studyCourses));
  }

  filterStudyCoursesByAcademicDegree(event: MatSelectChange) {
    const academicDegree = event.value;
    if (academicDegree) {
      this.studyCourseService.findByAcademicDegree(academicDegree).subscribe(
        studyCourses => this.studyCourses = studyCourses
      );
    } else {
      this.getAllStudyCourses();
    }
  }

  private fillAcademicDegrees(studyCourses: StudyCourse[]) {
    studyCourses.forEach(studyCourse => this.academicDegrees.push(studyCourse.academicDegree));
    this.academicDegrees = this.academicDegrees.filter((value, index, self) => self.indexOf(value) === index);
  }
}
