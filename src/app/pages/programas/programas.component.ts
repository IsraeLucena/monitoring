import {
  Component,
  ViewEncapsulation,
  ViewChild,
  OnInit,
  HostListener,
  ElementRef
} from '@angular/core';
import { GlobalState } from '../../app.state';
import { ConfigService } from '../../shared/services/config/config.service';

import { HttpClient, HttpParams } from '@angular/common/http';

import * as moment from 'moment';



@Component({
  selector: '.content_inner_wrapper',
  templateUrl: './programas.component.html',
  styleUrls: ['./programas.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class ProgramasComponent implements OnInit {

  private title = 'Programas';
  private key = 'mv';

  constructor(
    public http: HttpClient
  ) { }

  ngOnInit() {
  }

}
