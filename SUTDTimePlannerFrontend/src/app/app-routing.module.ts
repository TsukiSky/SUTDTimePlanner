import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { HomeComponent } from './home/home.component';
import { AuthGuardService } from './auth-guard.service';
import { CourseDetailComponent } from './course-detail/course-detail.component';
import { CoursesComponent } from './courses/courses.component';

const routes: Routes = [
  {path:"", component: HomeComponent, canActivate: [AuthGuardService]},
  {path:"course/:id", component: CourseDetailComponent, canActivate: [AuthGuardService]},
  {path:"courses", component: CoursesComponent, canActivate: [AuthGuardService]},
  {path:"auth", component: AuthComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
