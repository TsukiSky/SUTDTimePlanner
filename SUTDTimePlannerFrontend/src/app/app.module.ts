import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { NzCommentModule } from 'ng-zorro-antd/comment';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';

import { TimetableComponent } from './common/timetable/timetable.component';
import { NzPaginationModule } from "ng-zorro-antd/pagination";
import { NzMenuModule } from "ng-zorro-antd/menu";
import { NZ_CONFIG, NzConfig } from "ng-zorro-antd/core/config";
import { NzDropDownModule } from "ng-zorro-antd/dropdown";
import { NzModalModule } from "ng-zorro-antd/modal";
import { AuthComponent } from './auth/auth.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './common/header/header.component';
import { LoginformComponent } from './common/loginform/loginform.component';
import { MaterialModule } from './material.module';
import { RegisterformComponent } from './common/registerform/registerform.component';
import { CourseDetailComponent } from './course-detail/course-detail.component';
import { CoursesComponent } from './courses/courses.component';
import { LeftSidebarComponent } from './common/left-sidebar/left-sidebar.component';
import {NzDividerModule} from "ng-zorro-antd/divider";
import {NzAvatarModule} from "ng-zorro-antd/avatar";
import {NzInputModule} from "ng-zorro-antd/input";

registerLocaleData(en);

const ngZorroConfig: NzConfig = {
  message: {nzTop: 60}
}

@NgModule({
  declarations: [
    AppComponent,
    TimetableComponent,
    AuthComponent,
    HomeComponent,
    HeaderComponent,
    LoginformComponent,
    RegisterformComponent,
    CourseDetailComponent,
    CoursesComponent,
    LeftSidebarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NzLayoutModule,
    NzTableModule,
    NzFormModule,
    NzSelectModule,
    NzButtonModule,
    ReactiveFormsModule,
    NzListModule,
    NzMessageModule,
    NzNotificationModule,
    NzEmptyModule,
    NzIconModule,
    NzCardModule,
    NzSwitchModule,
    NzDescriptionsModule,
    NzPaginationModule,
    NzMenuModule,
    NzDropDownModule,
    NzModalModule,
    NzCommentModule,
    MaterialModule,
    NzDividerModule,
    NzAvatarModule,
    NzInputModule
  ],
  providers: [
    { provide: NZ_I18N, useValue: en_US },
    { provide: NZ_CONFIG, useValue: ngZorroConfig }
  ],
  bootstrap: [AppComponent, AuthComponent]
})
export class AppModule { }
