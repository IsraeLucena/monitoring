import {
  Component,
  OnInit
} from '@angular/core';

@Component({
  selector: '.content_inner_wrapper',
  templateUrl: './programas.component.html',
  styleUrls: ['./programas.component.scss']
})
export class ProgramasComponent implements OnInit {

  private title = 'Programas';
  private key = 'mv';

  constructor(
  ) { }

  ngOnInit() {
  }

}
