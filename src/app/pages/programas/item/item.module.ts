import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ItemComponent } from './item.component';
import { SharedModule } from '../../../shared/shared.module';
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
    RouterModule.forChild(ITEM_ROUTE)
  ]
})
export class ItemModule { }
