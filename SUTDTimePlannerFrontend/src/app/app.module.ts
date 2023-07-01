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

registerLocaleData(en);

const ngZorroConfig: NzConfig = {
  message: {nzTop: 60}
}

@NgModule({
  declarations: [
    AppComponent,
    TimetableComponent
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
        NzModalModule
    ],
  providers: [
    { provide: NZ_I18N, useValue: en_US },
    { provide: NZ_CONFIG, useValue: ngZorroConfig }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
