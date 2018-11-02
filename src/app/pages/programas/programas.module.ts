import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProgramasComponent } from './programas.component';
import { SharedModule } from '../../shared/shared.module';

const PROGRAMAS_ROUTE = [
  {
    path: '', component: ProgramasComponent,
    children: [
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      { path: 'list', loadChildren: './list/list.module#ListModule' },
      { path: 'item', loadChildren: './item/item.module#ItemModule' },
      { path: 'item/:itemId', loadChildren: './item/item.module#ItemModule' }
    ]
  }
];

@NgModule({
  declarations: [
    ProgramasComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(PROGRAMAS_ROUTE)
  ]
})
export class ProgramasModule { }
