import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './components/home/home.component';
import {StudyCourseListComponent} from './components/study-course-list/study-course-list.component';
import {StudyCourseDetailsComponent} from './components/study-course-details/study-course-details.component';
import {ProjectListComponent} from './components/project-list/project-list.component';
import {ProjectDetailsComponent} from './components/project-details/project-details.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'projects',
    component: ProjectListComponent
  },
  {
    path: 'projects/:name',
    component: ProjectDetailsComponent
  },
  {
    path: 'study-courses',
    component: StudyCourseListComponent
  },
  {
    path: 'study-courses/:name',
    component: StudyCourseDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
