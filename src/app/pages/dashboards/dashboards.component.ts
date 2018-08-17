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

import { CalendarComponent } from 'ng-fullcalendar';
import { Options } from 'fullcalendar';

import * as moment from 'moment';


@Component({
  selector: '.content_inner_wrapper',
  templateUrl: './dashboards.component.html',
  styleUrls: ['./dashboards.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class DashboardsComponent implements OnInit {

  calendarOptions: any; //Options;
  @ViewChild(CalendarComponent) ucCalendar: CalendarComponent;
  displayEvent: any;

  title = 'Dashboard';

  public doughnutChartLabels: string[] = [
    'Writing Code',
    'Problem Solving',
    'Debugging',
    'Designing'
  ];

  public doughnutChartData: number[] = [350, 450, 100, 220];
  public doughnutChartType = 'doughnut';
  public doughnutChartColors: Array<any> = [
    {
      backgroundColor: ['#796AEE', '#28BEBD', '#2196F3', '#EC407A']
    }
  ];

  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }

  constructor(
    public config: ConfigService,
    private _elementRef: ElementRef,
    private _state: GlobalState
  ) {

  }

  ngOnInit() {

    this.calendarOptions = {
      height: 636,
      locale: 'pt-br',
      editable: false,
      eventLimit: false,
      allDaySlot: false,
      navLinks: true,
      selectable: true,
      selectHelper: true,
      // defaultView: 'agendaWeek',
      defaultView: 'agendaFourDay',
      minTime: '08:00:00',
      maxTime: '19:00:00',
      // eventTextColor: '#fff',
      buttonText: {
        today: 'hoje',
        month: 'mês',
        week: 'semana',
        day: 'dia',
        list: 'lista'
      },
      header: {
        left: '',
        center: 'title',
        right: ''
      },
      businessHours: {
        // days of week. an array of zero-based day of week integers (0=Sunday)
        dow: [1, 2, 3, 4, 5], // Monday - Thursday

        start: '08:00', // a start time (10am in this example)
        end: '19:00', // an end time (6pm in this example)
      },
      views: {
        agendaFourDay: {
          type: 'agenda',
          duration: { days: 4 }
        }
      },
      events: [
        {
          start: '2018-05-31T08:00:00',
          end: '2018-05-31T08:30:00',
          title: 'All Day Event',
          color: 'yellow',
          textColor: 'black'
        },
        {
          start: '2018-05-31T08:30:00',
          end: '2018-05-31T09:00:00',
          title: 'All Day Event',
          color: 'green',
          textColor: 'black'
        },
        {
          start: '2018-06-01T09:00',
          end: '2018-06-01T09:30',
          title: 'teste'
        }
      ]
    };

  }

  clickButton(model: any) {
    this.displayEvent = model;
    console.log(model);
  }

  eventClick(model: any) {
    model = {
      event: {
        id: model.event.id,
        start: model.event.start,
        end: model.event.end,
        title: model.event.title,
        allDay: model.event.allDay
        // other params
      },
      duration: {}
    }

    this.displayEvent = model;
    console.log(model);
  }
  updateEvent(model: any) {
    model = {
      event: {
        id: model.event.id,
        start: model.event.start,
        end: model.event.end,
        title: model.event.title
        // other params
      },
      duration: {
        _data: model.duration._data
      }
    }
    this.displayEvent = model;
  }

  select(start: any) {
    console.log(start.start._i);
    const val = start.start._i[0] + '-' + (start.start._i[1] + 1) + '-' +
      start.start._i[2] + ' ' + start.start._i[3] + ':' + start.start._i[4];
    console.log(val);
    console.log(moment(val).format('YYYY-MM-DDTHH:mm'));
  }


}
