import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ListaComponent } from './lista.component';
import { SharedModule } from '../../../shared/shared.module';

import { FilterPipeModule } from 'ngx-filter-pipe';

const LISTA_ROUTE = [
  { path: '', component: ListaComponent },
];

@NgModule({
  declarations: [
    ListaComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(LISTA_ROUTE),
    FilterPipeModule
  ]
})
export class ListaModule { }
