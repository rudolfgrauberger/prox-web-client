import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './components/home/home.component';
import {StudyCourseListComponent} from './components/study-course-list/study-course-list.component';
import {StudyCourseDetailsComponent} from './components/study-course-details/study-course-details.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'studyCourses',
    component: StudyCourseListComponent
  },
  {
    path: 'studyCourses/:name',
    component: StudyCourseDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
