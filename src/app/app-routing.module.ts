import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './general/components/home/home.component';
import { ModuleListComponent } from './modules/module-ms/components/module-list/module-list.component';
import { ModuleDetailComponent } from './modules/module-ms/components/module-detail/module-detail.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'modules',
    component: ModuleListComponent
  },
  {
    path: 'modules/:id',
    component: ModuleDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
