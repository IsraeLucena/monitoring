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

import * as moment from 'moment';

@Component({
  selector: '.content_inner_wrapper',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class ListComponent implements OnInit {

  private key = 'mv';
  private listaProgramas: any;

  constructor(
    public http: HttpClient,
    private router: Router
  ) { }

  ngOnInit() {
    this.getListProgramByKey('mv');
  }

  userNew(val) {
  }

  getListProgramByKey(key) {
    this.http.get('/api/program/list-by-clientkey?clientKey=' + key).subscribe(data => {
      console.log(data);
      this.listaProgramas = data;
    });
  }

  route() {
    this.router.navigate(['/programas/item']);
  }

  item(id) {
    this.router.navigate(['/programas/item/' + id]);
  }


}
