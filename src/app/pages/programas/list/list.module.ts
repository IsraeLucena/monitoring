import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ListComponent } from './list.component';
import { SharedModule } from '../../../shared/shared.module';

import { FilterPipeModule } from 'ngx-filter-pipe';

const LIST_ROUTE = [
  {
    path: '', component: ListComponent
  }
];

@NgModule({
  declarations: [
    ListComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(LIST_ROUTE),
    FilterPipeModule
  ]
})
export class ListModule { }
