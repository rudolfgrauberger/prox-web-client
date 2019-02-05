import {Component, OnInit} from '@angular/core';
import {StudyCourse} from '../../resources/StudyCourse';
import {StudyCourseService} from '../../services/study-course.service';
import {HalOptions} from 'angular4-hal';
import {Module} from '../../resources/Module';

@Component({
  selector: 'app-module-list',
  templateUrl: './module-list.component.html',
  styleUrls: ['./module-list.component.scss']
})
export class ModuleListComponent implements OnInit {

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
    this.studyCourses.forEach((studyCourse: StudyCourse) => {
      studyCourse.getModules().subscribe((modules: Module[]) => {
        studyCourse.modules = modules;
      });
    });
  }
}
