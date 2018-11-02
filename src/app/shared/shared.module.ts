// Angular
// https://angular.io/
import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { MalihuScrollbarModule } from 'ngx-malihu-scrollbar';
import { HttpClientModule } from '@angular/common/http';


// UI Shared Components
import { FooterComponent } from '../layout/footer/footer.component';
import { AppBackdropComponent } from './components/app_backdrop/app_backdrop.component';
import { Profile } from './components/profile/profile.component';

// angular material

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material';

// fullcalendar
import { FullCalendarModule } from 'ng-fullcalendar';

import { ElCheckboxComponent } from './components/el-checkbox/el-checkbox.component';
import { ChartModule } from 'angular-highcharts';
import { ChartComponent } from './components/chart/chart.component';
import { MaskCustomDirective } from './directives/mask-custom.directive';

import { MaskCustomPipe } from './pipes/mask.custom.pipe';
import { UtilsPipe } from './pipes/utils.pipe';
import { ScrollToModule } from '@nicky-lenaers/ngx-scroll-to';


import { ToastrModule } from 'ngx-toastr';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule.forRoot(),
    MalihuScrollbarModule.forRoot(),
    MatSidenavModule,
    MatButtonModule,
    MatRippleModule,
    FullCalendarModule,
    HttpClientModule,
    ChartModule,
    ToastrModule.forRoot(),
    ScrollToModule.forRoot()
  ],
  declarations: [
    AppBackdropComponent,
    FooterComponent,
    Profile,
    ElCheckboxComponent,
    MaskCustomDirective,
    MaskCustomPipe,
    ChartComponent,
    UtilsPipe
  ],
  exports: [
    CommonModule,
    FormsModule,
    AppBackdropComponent,
    Profile,
    FooterComponent,
    ReactiveFormsModule,
    MalihuScrollbarModule,
    NgbModule,
    MatSidenavModule,
    MatButtonModule,
    MatRippleModule,
    FullCalendarModule,
    ElCheckboxComponent,
    HttpClientModule,
    MaskCustomDirective,
    MaskCustomPipe,
    UtilsPipe,
    ChartModule,
    ToastrModule,
    ChartComponent,
    ScrollToModule
  ]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule
    };
  }
}
