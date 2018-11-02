import {
  Component,
  ViewEncapsulation,
  OnInit
} from '@angular/core';
import { Router } from '@angular/router';

import { HttpClient, HttpParams } from '@angular/common/http';

@Component({
  selector: '.content_inner_wrapper',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class ListComponent implements OnInit {

  private key = 'mv';
  private listaProgramas: any;
  userFilter: any = { name: '' };


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
    this.http.get('/api/v1/program/list-by-clientkey?clientKey=' + key).subscribe(data => {
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
