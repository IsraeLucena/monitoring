import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ItemComponent } from './item.component';
import { SharedModule } from '../../../shared/shared.module';

import { FilterPipeModule } from 'ngx-filter-pipe';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs'

const ITEM_ROUTE = [
  {
    path: '', component: ItemComponent
  }
];

@NgModule({
  declarations: [
    ItemComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(ITEM_ROUTE),
    FilterPipeModule,
    NgSelectModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ItemModule { }
