import {
  Component,
  OnInit,
  Directive
} from '@angular/core';
import { Router } from '@angular/router';

import { HttpClient } from '@angular/common/http';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

import { isNullOrUndefined } from 'util';
import { FilterPipe } from 'ngx-filter-pipe';
import { ToastrService } from 'ngx-toastr';
import * as _ from 'lodash';

import { MaskCustomPipe } from '../../../shared/pipes/mask.custom.pipe';

class Programa {
  id?: number;
  name?: string;
  description?: string;
  programKey?: string;
}

interface FilterItem {
  class?: string;
  type?: string;
  definition?: string;
}

@Component({
  selector: '.content_inner_wrapper',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
  providers: [MaskCustomPipe]
})
export class ItemComponent implements OnInit {

  private key = 'mv';
  modalRef: any;
  closeResult: string;
  itemId;
  usersProgram;
  usersFilter;
  indicatorsProgram;

  selectedFilter;

  userFilter: any = { name: '' };

  filterItem: FilterItem[] = [
    { class: 'zmdi zmdi-accounts text-green', type: 'Aceito', definition: 'INVITE_ACCEPT' },
    { class: 'zmdi zmdi-accounts text-red', type: 'Rejeitado', definition: 'INVITE_REJECTED' },
    { class: 'zmdi zmdi-accounts text-gray', type: 'Aguardando', definition: 'INVITE_SEND' },
    { class: 'zmdi zmdi-accounts text-yellow', type: 'Cancelado pelo Usuário', definition: 'CANCELED_PARTICIPATION' },
    { class: 'zmdi zmdi-accounts-outline text-gray', type: 'Inativado', definition: 'active: false' }
  ];

  form: FormGroup;
  formProg: FormGroup;

  private formSumitAttempt: boolean;
  public programa: Programa = {};

  //
  message;
  data;

  changed = _.debounce(function (event) {
    this.changeMessage(event);
  }, 400);

  constructor(
    public http: HttpClient,
    private router: Router,
    private modalService: NgbModal,
    private rota: ActivatedRoute,
    private filter: FilterPipe,
    private toastr: ToastrService,
    private customPipe: MaskCustomPipe,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.rota.paramMap.subscribe(params => {
      console.log(params.get('itemId'));
      this.itemId = params.get('itemId');
    });
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      cell: ['', [Validators.required]],
      cpf: ['', [Validators.required]]
    });
    this.formProg = this.formBuilder.group({
      nameProg: ['', Validators.required],
      sigla: ['', [Validators.required]],
      description: ['', [Validators.required]]
    });
    if (!isNullOrUndefined(this.itemId)) {
      this.getProgramByKey(this.itemId);
      this.getListUsersProgramByKey(this.itemId);
      this.getListIndicatorsProgramByKey(this.itemId);
    }
  }

  isFieldValid(field: string, form: any) {
    return (
      !form.get(field).valid && form.get(field).touched
    );
  }

  displayFieldCss(field: string, form: any) {
    return {
      'is-invalid': this.isFieldValid(field, form)
    };
  }

  onSubmit(form) {
    console.log(form);
    this.formSumitAttempt = true;
    if (form.valid) {
      console.log('form submitted');
      console.log(form.value.sigla);
      if (!isNullOrUndefined(form.value.sigla)) {
        this.criarPrograma(form);
      } else {
        this.createParticipant(form);
      }
    }
  }

  reset(form) {
    form.reset();
    this.formSumitAttempt = false;
  }

  reenviarConvite(idPatient, idProgram, status) {
    console.log(idPatient, idProgram, status);
    if (status !== 'INVITE_ACCEPT') {
      this.http.put('/api/v1/program-patient/resend-invite',
        {
          patientId: idPatient,
          programId: idProgram
        })
        .subscribe(
          (val) => {
            this.showAdd('Convite reenviado!');
          },
          (err) => {
            this.showDelete(err.error.message);
          });
    } else {
      this.showDelete('O Participante já está no progrma.');
    }
  }

  alterafiltro(event: any) {
    let usersCopy: any = this.usersProgram;
    if (this.selectedFilter.length > 0) {
      let filter: string[] = this.selectedFilter;
      console.log(this.selectedFilter);
      let selected;
      if (filter.includes('active: false')) {
        usersCopy = this.filter.transform(usersCopy, { active: false });
        filter = filter.filter(x => x !== 'active: false');
        if (filter.length > 0) { selected = { status: { $or: filter } }; }
      } else {
        selected = { status: { $or: this.selectedFilter } };
      }
      this.usersFilter = this.filter.transform(usersCopy, selected);
    } else {
      this.usersFilter = this.usersProgram;
    }
  }

  caseSituacao(nameClass) {
    switch (nameClass) {
      case 'INVITE_ACCEPT':
        return 'zmdi zmdi-accounts text-green';
      case 'INVITE_REJECTED':
        return 'zmdi zmdi-accounts text-red';
      case 'INVITE_SEND':
        return 'zmdi zmdi-accounts text-gray';
      case 'CANCELED_PARTICIPATION':
        return 'zmdi zmdi-accounts text-yellow';
    }
  }

  getProgramByKey(key) {
    this.http.get('/api/v1/program/by-id?programId=' + key).subscribe(data => {
      const programa: any = data;
      console.log(data, programa.name);
      // this.programa = data;
      this.programa = new Programa();
      this.programa.name = programa.name;
      this.programa.description = programa.description;
      this.programa.programKey = programa.programKey;
      // console.log(this.programa);
    });
  }

  getListUsersProgramByKey(key) {
    this.http.get('/api/v1/program-patient/patient-from-program?idProgram=' + key).subscribe(data => {
      // console.log(data);
      this.usersProgram = data;
      this.usersFilter = data;
    });
  }

  getListIndicatorsProgramByKey(key) {
    this.http.get('/api/v1/program-indicator/list-by-program?program_id=' + key).subscribe(data => {
      console.log(data);
      this.indicatorsProgram = data;
    });
  }

  createParticipant(form) {
    this.http.post('/api/v1/patient/create',
      {
        cellphone: '+55' + this.customPipe.transform(form.value.cell, 'clearText'),
        clientKey: this.key,
        cpf: this.customPipe.transform(form.value.cpf, 'clearText'),
        email: form.value.email,
        idProgram: this.itemId,
        image: '',
        name: form.value.name
      })
      .subscribe(
        (val) => {
          // console.log('POST call successful value returned in body',
          //   val);
          this.getListUsersProgramByKey(this.itemId);
          this.showAdd('Participante adicionado com sucesso!');
          this.reset(form);
          // this.modalRef.close();
          // alert('Conta criada com sucesso!');
          // location.reload();
          // this.router.navigate(['/unidades']);
        },
        (err) => {
          console.log(err.error.message);
          this.showDelete(err.error.message);
        });
  }

  criarPrograma(formProg) {
    if (isNullOrUndefined(this.itemId)) {
      this.http.post('/api/v1/program/create',
        {
          clientKey: this.key,
          description: formProg.value.description,
          name: formProg.value.nameProg,
          programKey: formProg.value.sigla,
          unitName: this.key
        })
        .subscribe(
          (val: any) => {
            this.itemId = val.id;
            this.showAdd('Programa criado com sucesso!');
            // this.modalRef.close();
            // alert('Conta criada com sucesso!');
            // location.reload();
            // this.router.navigate(['/unidades']);
          },
          (err) => {
            console.log(err.error.message);
            this.showDelete(err.error.message);
          });
    } else {
      console.log('clientKey:' + this.key +
        'description:' + formProg.value.description +
        'id:' + this.itemId +
        'name:' + formProg.value.nameProg +
        'programKey:' + formProg.value.sigla +
        'unitName:' + this.key);
      this.http.put('/api/v1/program/update',
        {
          clientKey: this.key,
          description: formProg.value.description,
          id: this.itemId,
          name: formProg.value.nameProg,
          programKey: formProg.value.sigla,
          unitName: this.key
        })
        .subscribe(
          (val) => {
            this.showAdd('Programa alterado com sucesso!');
          },
          (err) => {
            this.showDelete(err.error.message);
          });
    }
  }

  route() {
    this.router.navigate(['/programas/list']);
  }

  retornoCheck(event, idParticipante) {
    console.log(event, idParticipante);
    this.http.put('/api/v1/program-patient/update-accompaniment',
      {
        active: event,
        id: idParticipante,
      })
      .subscribe(
        (val) => {
          this.showAdd('Status alterado com sucesso!');
        },
        (err) => {
          this.showDelete(err.error.message);
        });
  }

  open(content) {
    this.modalRef = this.modalService.open(content, { size: 'lg', windowClass: 'custom-modal', backdrop: 'static', keyboard: false });
    this.modalRef.result
      .then((result) => {
        console.log(`Closed with: ${result}`);
      }, (reason) => {
        console.log(reason);
        // console.log(`Dismissed ${this.getDismissReason(reason)}`);
      });
  }

  getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  changeMessage(event) {
    console.log(event);
  }

  showAdd(message) {
    this.toastr.success('', message, {
      timeOut: 1000,
      positionClass: 'toast-bottom-right'
    });
  }

  showEdit() {
    this.toastr.success('', 'Unidade Alterada.');
  }

  showDelete(message) {
    this.toastr.error(message, 'Ocorreu um Erro', {
      timeOut: 2000,
      positionClass: 'toast-bottom-right'
    });
  }

}
