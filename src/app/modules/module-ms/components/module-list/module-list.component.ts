import { Component, OnInit } from '@angular/core';
import {StudyCourse} from '../../resources/StudyCourse';
import {StudyCourseService} from '../../services/study-course.service';
import {Module} from '../../resources/Module';

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
    this.studyCourseService.getAll().subscribe(
      studyCourses => this.studyCourses = studyCourses
    );
  }
}
