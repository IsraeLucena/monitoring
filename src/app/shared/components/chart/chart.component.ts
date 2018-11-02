import { Component, OnInit, Input } from '@angular/core';
import { Chart } from 'angular-highcharts';

@Component({
  selector: 'high-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {
  chart: Chart;

  _data: ChartValues = {
    chartType: '',
    titleText: 'Não há dados',
    yAxisTitle: '',
    series: [{ name: '', data: [] }]
  };

  @Input()
  set data(data: ChartValues) {
    if (data) {
      this._data = data;
    }
  }

  get data(): ChartValues { return this._data; }


  // @Input('data') data: ChartValues;


  ngOnInit() {
    this.init();
  }

  addPoint() {
    if (this.chart) {
      this.chart.addPoint(Math.floor(Math.random() * 10));
    } else {
      alert('init chart, first!');
    }
  }

  addSerie() {
    this.chart.addSerie({
      name: 'Line ' + Math.floor(Math.random() * 10),
      data: [
        Math.floor(Math.random() * 10),
        Math.floor(Math.random() * 10),
        Math.floor(Math.random() * 10),
        Math.floor(Math.random() * 10),
        Math.floor(Math.random() * 10),
        Math.floor(Math.random() * 10),
        Math.floor(Math.random() * 10),
        Math.floor(Math.random() * 10),
        Math.floor(Math.random() * 10)
      ]
    });
  }

  removePoint() {
    this.chart.removePoint(this.chart.ref.series[0].data.length - 1);
  }

  removeSerie() {
    this.chart.removeSerie(this.chart.ref.series.length - 1);
  }

  init() {
    const chart = new Chart({
      chart: {
        type: this._data.chartType
      },
      title: {
        text: this._data.titleText
      },
      credits: {
        enabled: false
      },
      yAxis: {
        title: {
          text: this._data.yAxisTitle
        }
      },
      plotOptions: {
        spline: {
          dataLabels: {
            enabled: true
          },
          enableMouseTracking: false
        },
        line: {
          dataLabels: {
            enabled: true
          },
          enableMouseTracking: false
        },
        column: {
          dataLabels: {
            enabled: true
          },
          enableMouseTracking: false
        }
      },
      series: this._data.series,
      responsive: {
        rules: [{
          condition: {
            maxWidth: 500
          },
          chartOptions: {
            legend: {
              layout: 'horizontal',
              align: 'center',
              verticalAlign: 'bottom'
            }
          }
        }]
      }
    });
    // chart.addPoint(4);
    this.chart = chart;
    // chart.addPoint(5);
    // setTimeout(() => {
    //   chart.addPoint(6);
    // }, 1000);
    // setTimeout(() => {
    //   chart.addPoint(5);
    // }, 2000);
    // setTimeout(() => {
    //   chart.addPoint(6);
    // }, 3000);

  }

}
