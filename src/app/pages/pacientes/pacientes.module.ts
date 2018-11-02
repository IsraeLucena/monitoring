import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PacientesComponent } from './pacientes.component';
import { SharedModule } from '../../shared/shared.module';
const PACIENTES_ROUTE = [
  {
    path: '', component: PacientesComponent,
    children: [
      { path: '', redirectTo: 'lista', pathMatch: 'full' },
      { path: 'lista', loadChildren: './lista/lista.module#ListaModule' },
      { path: 'paciente', loadChildren: './paciente/paciente.module#PacienteModule' },
      { path: 'paciente/:itemId', loadChildren: './paciente/paciente.module#PacienteModule' }
    ]
  }
];

@NgModule({
  declarations: [
    PacientesComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(PACIENTES_ROUTE)
  ]
})
export class PacientesModule { }
