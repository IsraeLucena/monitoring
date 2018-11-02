import {
  Component,
  OnInit
} from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';
import { isNullOrUndefined } from 'util';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: '.content_inner_wrapper',
  templateUrl: './pacientes.component.html',
  styleUrls: ['./pacientes.component.scss'],
  providers: [NgbDropdownConfig]
})

export class PacientesComponent implements OnInit {
  title = 'Pacientes';

  constructor() {
  }

  ngOnInit() {
  }

}
