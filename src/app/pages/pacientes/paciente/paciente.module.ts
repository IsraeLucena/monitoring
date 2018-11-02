import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PacienteComponent } from './paciente.component';
import { SharedModule } from '../../../shared/shared.module';
const PACIENTE_ROUTE = [
  { path: '', component: PacienteComponent },
];

@NgModule({
  declarations: [
    PacienteComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(PACIENTE_ROUTE)
  ]
})
export class PacienteModule { }
