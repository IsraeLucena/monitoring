import {
  Component,
  OnInit
} from '@angular/core';
@Component({
  selector: '.content_inner_wrapper',
  templateUrl: './dashboards.component.html',
  styleUrls: ['./dashboards.component.scss']
})
export class DashboardsComponent implements OnInit {
  title = 'Dashboard';
  constructor() { }
  ngOnInit() {
  }
}
