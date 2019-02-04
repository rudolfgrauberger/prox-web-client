import { Component, OnInit } from '@angular/core';
import {StudyCourse} from '../../resources/StudyCourse';
import {StudyCourseService} from '../../services/study-course.service';
import {Module} from '../../resources/Module';
import { HalOptions } from 'angular4-hal';

@Component({
  selector: 'app-module-list',
  templateUrl: './module-list.component.html',
  styleUrls: ['./module-list.component.scss']
})
export class ModuleListComponent implements OnInit {

  studyCourses: StudyCourse[];
  modules: Module[];

  constructor(
    private studyCourseService: StudyCourseService) { }

  ngOnInit() {
    this.getAllStudyCourses();
  }

  getAllStudyCourses() {
    let options: HalOptions = {sort: [{path: 'name', order: 'ASC'}]};
    this.studyCourseService.getAll(options).subscribe(
      studyCourses => this.studyCourses = studyCourses
    );
  }
}
