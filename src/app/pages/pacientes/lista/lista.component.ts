import {
  Component,
  OnInit
} from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';
import { isNullOrUndefined } from 'util';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: '.content_inner_wrapper',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.scss']
})
export class ListaComponent implements OnInit {
  title = 'Lista de Pacientes';
  key = 'mv';

  //
  listPatient: any;
  listProgram: any;
  total;
  userFilter: any = { name: '' };

  //
  genderM;
  genderF;
  state;
  minAge;
  maxAge;
  city;
  district;
  active;
  idProgram;
  orderBy = 'asc';

  constructor(
    public http: HttpClient,
    config: NgbDropdownConfig,
    private toastr: ToastrService,
    private router: Router
  ) {
    config.placement = 'bottom-right';
    config.autoClose = false;
  }

  ngOnInit() {
    this.clickItem();
    this.getListProgram();
  }

  getListProgram() {
    this.http.get('/api/v1/program/list-filter-patient-by-clientkey?clientKey=' + this.key).subscribe(data => {
      const list: any = data;
      this.listProgram = list.programs;
      this.total = list.total;
    });
  }

  setIdProgram(idProgram) {
    this.idProgram = idProgram;
  }

  setOrderProgram() {
    if (this.orderBy === 'asc') {
      this.orderBy = 'desc';
    } else {
      this.orderBy = 'asc';
    }
    this.clickItem();
  }

  clickItem() {
    let filter = '';
    if ((!isNullOrUndefined(this.genderM) && !(this.genderM === false)) !==
      (!isNullOrUndefined(this.genderF) && !(this.genderF === false))) {
      if (!isNullOrUndefined(this.genderF) && !(this.genderF === false)) {
        filter = filter + '&gender=F';
      } else {
        filter = filter + '&gender=M';
      }
    }
    if (!isNullOrUndefined(this.state) && !(this.state === '')) {
      filter = filter + '&state=' + this.state;
    }
    if ((!isNullOrUndefined(this.minAge) && !(this.minAge === '')) && (!isNullOrUndefined(this.maxAge) && !(this.maxAge === ''))) {
      filter = filter + '&minAge=' + this.minAge + '&maxAge=' + this.maxAge;
    }
    if (!isNullOrUndefined(this.city) && !(this.city === '')) {
      filter = filter + '&city=' + this.city;
    }
    if (!isNullOrUndefined(this.district) && !(this.district === '')) {
      filter = filter + '&district=' + this.district;
    }
    if (!isNullOrUndefined(this.active) && !(this.active === '')) {
      filter = filter + '&active=' + this.active;
    }
    if (!isNullOrUndefined(this.idProgram) && !(this.idProgram === '')) {
      filter = filter + '&idProgram=' + this.idProgram;
    }
    if (this.orderBy !== 'asc') {
      filter = filter + '&orderBy=desc';
    } else {
      filter = filter + '&orderBy=asc';
    }
    if ((isNullOrUndefined(this.minAge) || (this.minAge === '')) && (!isNullOrUndefined(this.maxAge) && !(this.maxAge === ''))) {
      this.showEdit('Os dois campos de idade devem ser preenchidos');
    } else if ((!isNullOrUndefined(this.minAge) && !(this.minAge === '')) && (isNullOrUndefined(this.maxAge) || (this.maxAge === ''))) {
      this.showEdit('Os dois campos de idade devem ser preenchidos');
    } else {
      this.http.get('/api/v1/patient/patients-by-client-key?clientKey=' + this.key + filter).subscribe(data => {
        this.listPatient = data;
      });
    }
  }

  clearFilter() {
    this.genderM = false;
    this.genderF = false;
    this.state = '';
    this.minAge = '';
    this.maxAge = '';
    this.city = '';
    this.district = '';
    this.active = '';
    this.idProgram = '';
    this.clickItem();
  }

  item(id) {
    this.router.navigate(['/pacientes/paciente/' + id]);
  }

  toggle(e) {
    if (e.target.id === 'checkbox1') {
      this.genderF = e.target.checked;
    } else {
      this.genderM = e.target.checked;
    }
  }

  showDelete(message) {
    this.toastr.error(message, 'Ocorreu um Erro', {
      timeOut: 2000,
      positionClass: 'toast-bottom-right'
    });
  }

  imagePatient(image) {
    if (!isNullOrUndefined(image)) {
      return image;
    } else {
      return '';
    }

  }


  showEdit(msg) {
    this.toastr.warning(msg, 'Alerta', {
      timeOut: 2000,
      positionClass: 'toast-bottom-right'
    });
  }

}
