import {
  Component,
  ViewEncapsulation,
  ViewChild,
  OnInit,
  HostListener,
  ElementRef
} from '@angular/core';
import { GlobalState } from '../../../app.state';
import { ConfigService } from '../../../shared/services/config/config.service';
import { Router } from '@angular/router';

import { CalendarComponent } from 'ng-fullcalendar';
import { Options } from 'fullcalendar';
import { HttpClient, HttpParams } from '@angular/common/http';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, ParamMap } from '@angular/router';


import * as moment from 'moment';
import { isNullOrUndefined } from 'util';

interface Programa {
  id?: number;
  name?: string;
  description?: string;
  programKey?: string;
}

@Component({
  selector: '.content_inner_wrapper',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class ItemComponent implements OnInit {
  private key = 'mv';
  modalRef: any;
  closeResult: string;
  itemId;
  usersProgram;
  indicatorsProgram;

  description;
  name;
  programKey;

  nameParticipant;
  emailParticipant;
  cellParticipant;
  cpfParticipant;

  private programa: Programa;

  constructor(
    public http: HttpClient,
    private router: Router,
    private modalService: NgbModal,
    private rota: ActivatedRoute
  ) { }

  ngOnInit() {
    this.rota.paramMap.subscribe(params => {
      console.log(params.get('itemId'));
      this.itemId = params.get('itemId');
    });
    if (!isNullOrUndefined(this.itemId)) {
      this.getProgramByKey(this.itemId);
      this.getListUsersProgramByKey(this.itemId);
      this.getListIndicatorsProgramByKey(this.itemId);
    }
  }

  getProgramByKey(key) {
    this.http.get('/api/program/by-id?programId=' + key).subscribe(data => {
      console.log(data);
      this.programa = data;
      console.log(this.programa);
    });
  }

  getListUsersProgramByKey(key) {
    this.http.get('/api/program-patient/patient-from-program?idProgram=' + key).subscribe(data => {
      console.log(data);
      this.usersProgram = data;
    });
  }

  getListIndicatorsProgramByKey(key) {
    this.http.get('/api/program-indicator/list-by-program?program_id=' + key).subscribe(data => {
      console.log(data);
      this.indicatorsProgram = data;
    });
  }


  createParticipant() {
    console.log(this.nameParticipant, this.emailParticipant, this.cellParticipant, this.cpfParticipant);
    this.http.post('/api/patient/create',
      {
        cellphone: this.cellParticipant,
        clientKey: this.key,
        cpf: this.cpfParticipant,
        email: this.emailParticipant,
        idProgram: this.itemId,
        image: '',
        name: this.nameParticipant
      })
      .subscribe(
        (val) => {
          console.log('POST call successful value returned in body',
            val);
          this.getListUsersProgramByKey(this.itemId);
          this.modalRef.close();
          // alert('Conta criada com sucesso!');
          // location.reload();
          // this.router.navigate(['/unidades']);
        });
  }

  criarPrograma() {
    if (isNullOrUndefined(this.itemId)) {
      this.http.post('/api/program/create',
        {
          clientKey: this.key,
          description: this.description,
          name: this.name,
          programKey: this.programKey,
          unitName: this.key
        })
        .subscribe(
          (val) => {
            console.log('POST call successful value returned in body',
              val);
            // alert('Conta criada com sucesso!');
            // location.reload();
            // this.router.navigate(['/unidades']);
          });
    } else {
      this.http.put('/api/unit',
        {
          clientKey: this.key,
          description: this.description,
          id: this.itemId,
          name: this.name,
          programKey: this.programKey,
          unitName: this.key
        })
        .subscribe(
          (val) => {
            console.log('PUT call successful value returned in body',
              val);
            this.route();
            // alert('Conta criada com sucesso!');
            // location.reload();
            // this.router.navigate(['/unidades']);
          });

    }
  }
  route() {
    this.router.navigate(['/programas/list']);
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

}
