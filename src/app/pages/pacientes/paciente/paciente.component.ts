import {
  Component,
  OnInit
} from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

interface Paciente {
  nome?: string;
  gender?: string;
  birthDate?: string;
  cellphone?: string;
  image?: string;
}

@Component({
  selector: '.content_inner_wrapper',
  templateUrl: './paciente.component.html',
  styleUrls: ['./paciente.component.scss']
})

export class PacienteComponent implements OnInit {
  title = 'Dashboard';
  itemId;
  paciente: Paciente = { image: '' };

  frequencyCardio: ChartValues;
  bloodPressure: ChartValues;
  oxigenation: ChartValues;
  gorduraCorporal: ChartValues;
  glicemiaCapilar: ChartValues;
  temperatura: ChartValues;
  passos: ChartValues;
  colesterol: ChartValues;
  hidratacao: ChartValues;

  constructor(
    public http: HttpClient,
    private rota: ActivatedRoute
  ) { }

  ngOnInit() {
    this.rota.paramMap.subscribe(params => {
      this.itemId = params.get('itemId');
    });
    this.getPatientByKey(this.itemId);
    this.generateData();
  }

  getPatientByKey(key) {
    this.http.get('/api/v1/patient/by-id?id=' + key).subscribe(data => {
      this.paciente = data;
    });
  }

  generateData() {
    this.bloodPressure = {
      chartType: 'spline',
      titleText: '',
      yAxisTitle: 'mmHg',
      series: [{
        name: 'Sistólica',
        data: [120, 110, 130, 120, 150, 120, 110, 140, 140]
      },
      {
        name: 'Diastólica',
        data: [80, 70, 60, 60, 80, 100, 70, 60, 100]
      }]
    };

    this.frequencyCardio = {
      chartType: 'spline',
      titleText: '',
      yAxisTitle: 'bpm',
      series: [{
        name: 'Frequência',
        data: [90, 100, 110, 100, 100, 80, 90, 110, 80]
      }]
    };

    this.oxigenation = {
      chartType: 'line',
      titleText: '',
      yAxisTitle: 'SpO2',
      series: [{
        name: 'Porcentagem',
        data: [90, 98, 95, 92, 90, 92, 90, 100, 98]
      }]
    };

    this.gorduraCorporal = {
      chartType: 'line',
      titleText: '',
      yAxisTitle: '%',
      series: [{
        name: 'Gordura Corporal',
        data: [13, 11, 11, 10, 10, 13, 18, 21, 21.5]
      }]
    };

    this.glicemiaCapilar = {
      chartType: 'line',
      titleText: '',
      yAxisTitle: 'mg/dl',
      series: [{
        name: 'Índice Glicemico ',
        data: [160, 120, 130, 100, 110, 113, 118, 100, 85]
      }]
    };

    this.temperatura = {
      chartType: 'line',
      titleText: '',
      yAxisTitle: 'Graus Celsius',
      series: [{
        name: 'Temperatura',
        data: [38, 36.5, 36, 35, 36.3, 36, 38, 36.1, 36.2]
      }]
    };

    this.passos = {
      chartType: 'column',
      titleText: '',
      yAxisTitle: 'Quant. de Passos',
      series: [{
        name: 'Passos',
        data: [9000, 9303, 10201, 9562, 9823, 7231, 9512, 8543, 9837]
      }]
    };

    this.colesterol = {
      chartType: 'line',
      titleText: '',
      yAxisTitle: 'ml/dl',
      series: [{
        name: 'níveis',
        data: [100, 120, 120, 150, 110, 130, 100, 150, 120]
      }]
    };

    this.hidratacao = {
      chartType: 'column',
      titleText: '',
      yAxisTitle: 'Líquidos',
      series: [{
        name: 'ml',
        data: [1500, 1300, 1000, 1300, 1500, 1200, 1000, 2000, 1500]
      }]
    };
  }

}
