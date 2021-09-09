import { Component, OnInit, ViewChild } from '@angular/core';
import * as ApexCharts from "apexcharts";
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { DataServiceService } from 'src/app/services/data-service.service';

@Component({
  selector: 'app-evolucion',
  templateUrl: './evolucion.component.html',
  styleUrls: ['./evolucion.component.css']
})
export class EvolucionComponent implements OnInit {

  isCollapsed = false;
  loading = false;
  first = true;
  visible = false;

  // Labels
  lblYear = "Seleccione";
  lblMonth = "Todos";
  lblCluster = "Todos";
  lblCompany = "Seleccione";

  // *** LABELS CARDS ***
  lblCLastYear = "";
  lblCSelectYear = "";

  // Margin Burto
  lblBLast = "";
  lblBSelect = "";
  lblBPorcentLast = "";
  lblBPorcentSelect = "";

  // Margin Operation
  lblOLast = "";
  lblOSelect = "";
  lblOPorcentLast = "";
  lblOPorcentSelect = "";

  // radio values
  radioValue = "Acumulado";
  radioValueUnits = "Millones";

  // lists
  listCompanies: string[] = []
  listMonths: string[] = []
  listYears: number[] = []
  listClusters: string[] = [];

  constructor( 
    private notify: NzNotificationService,
    private dataService: DataServiceService,
  ) {

  }

  ngOnInit(): void {
    this.fillLists();

  }

  // method fill all lists
  fillLists() {
    this.listCompanies = ['El juri', 'UPS', 'Coral']
    this.listMonths = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
    this.listYears = [2018, 2019, 2020, 2021]
    this.listClusters = ['Cluster', 'Todos']
  }

  graphSales(last_year: number[], present_year: number[], pptoVNE: number[]) {
    var options = {
      series: [{
        name: 'Ventas Anio Anterior',
        data: last_year
      }, {
        name: 'Ventas Anio Actual',
        data: present_year
      }, {
        name: 'PPTO VNE',
        data: pptoVNE
      }],
      chart: {
        id: 'sales',
        type: 'bar',
        height: 350,
        width: 750
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '55%',
          endingShape: 'rounded',
          dataLabels: {
            position: 'top',
          },
        },
      },
      dataLabels: {
        enabled: true,
        formatter: function (val: any) {
          return "$" + val;
        },
        offsetY: -20,
        style: {
          fontSize: '12px',
          colors: ["#304758"]
        }
      },
      stroke: {
        show: true,
        width: 2,
        colors: ['transparent']
      },
      xaxis: {
        categories: this.listMonths,
      },
      yaxis: {
        title: {
          text: '$ Dolares'
        }
      },
      fill: {
        opacity: 1
      },
      legend: {
        show: true,
        position: 'top'
      },
      tooltip: {
        y: {
          formatter: function (val: any) {
            return "$ " + val + " Dolares"
          }
        }
      },
      title: {
        text: 'Anio ' + this.lblYear,
        align: 'center',
        floating: false,
        position: 'top'
      }
    };

    var chart = new ApexCharts(document.querySelector("#chart_sales"), options);

    if (this.first) {
      chart.render();
    } else {
      chart.render();
      chart.updateOptions({
        title: {
          text: 'Anio ' + this.lblYear
        }
      })
    }

  }

  graphSpend(last_year: number[], present_year: number[], pptoGOP: number[]) {
    var options = {
      series: [{
        name: 'Gastos Anio Anterior',
        data: last_year
      }, {
        name: 'Gastos Anio Actual',
        data: present_year
      }, {
        name: 'PPTO GOP',
        data: pptoGOP
      }],
      chart: {
        type: 'bar',
        height: 350,
        width: 750
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '55%',
          endingShape: 'rounded',
          dataLabels: {
            position: 'top',
          },
        },
      },
      dataLabels: {
        enabled: true,
        formatter: function (val: any) {
          return "$" + val;
        },
        offsetY: -20,
        style: {
          fontSize: '12px',
          colors: ["#304758"]
        }
      },
      stroke: {
        show: true,
        width: 2,
        colors: ['transparent']
      },
      xaxis: {
        categories: this.listMonths,
      },
      yaxis: {
        title: {
          text: '$ (Dolares)'
        }
      },
      fill: {
        opacity: 1
      },
      legend: {
        show: true,
        position: 'top'

      },
      tooltip: {
        y: {
          formatter: function (val: any) {
            return "$ " + val + " Dolares"
          }
        }
      },
      title: {
        text: 'Anio ' + this.lblYear,
        align: 'center',
        floating: false,
        position: 'top'
      }
    };

    var chart = new ApexCharts(document.querySelector("#chart_spend"), options);


    if (this.first) {
      chart.render();
    } else {
      chart.render();
      chart.updateOptions({
        title: {
          text: 'Anio ' + this.lblYear
        }
      })
    }
  }

  graphMargin(last_year: number[]) {
    var options = {
      series: [{
        name: 'Gastos Anio Anterior',
        data: last_year
      },
      ],
      chart: {
        id: 'chart_margin',
        type: 'bar',
        height: 200,
        width: 350
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '55%',
          endingShape: 'rounded',
          dataLabels: {
            position: 'top',
          },
        },
      },
      dataLabels: {
        enabled: true,
        formatter: function (val: any) {
          return "$" + val;
        },
        offsetY: -20,
        style: {
          fontSize: '12px',
          colors: ["#304758"]
        }
      },
      stroke: {
        show: true,
        width: 2,
        colors: ['transparent']
      },
      xaxis: {
        categories: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      },
      yaxis: {
        title: {
          text: '$ (Dolares)'
        }
      },
      fill: {
        opacity: 1
      },
      legend: {
        show: true,
        position: 'top'

      },
      tooltip: {
        y: {
          formatter: function (val: any) {
            return "$ " + val + " Dolares"
          }
        }
      }
    };

    var chart = new ApexCharts(document.querySelector("#chart_margin"), options);

    if (this.first) {
      chart.render();
    } else {
      chart.render();
      chart.updateSeries([{
        name: 'Nueva actualizacion',
        data: [50, 10, 25, 10, 10, 100, 50, 41, 66]
      }])
    }
  }

  graphOperation(year: number[]) {
    var options = {
      series: [{
        name: 'Gastos Anio Anterior',
        data: year
      },
      ],
      chart: {
        type: 'bar',
        height: 200,
        width: 350
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '55%',
          endingShape: 'rounded',
          dataLabels: {
            position: 'top',
          },
        },
      },
      dataLabels: {
        enabled: true,
        formatter: function (val: any) {
          return "$" + val;
        },
        offsetY: -20,
        style: {
          fontSize: '12px',
          colors: ["#304758"]
        }
      },
      stroke: {
        show: true,
        width: 2,
        colors: ['transparent']
      },
      xaxis: {
        categories: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      },
      yaxis: {
        title: {
          text: '$ (Dolares Operation)'
        }
      },
      fill: {
        opacity: 1
      },
      legend: {
        show: true,
        position: 'top'

      },
      tooltip: {
        y: {
          formatter: function (val: any) {
            return "$ " + val + " Dolares"
          }
        }
      }
    };

    var chart = new ApexCharts(document.querySelector("#chart_operation"), options);

    if (this.first) {
      chart.render();
    } else {
      chart.render();
      chart.updateSeries([{
        name: 'Actualizacion',
        data: [50, 10, 25, 10, 10, 100, 50, 41, 66]
      }])
    }

  }
  updateGraphs() {
    //console.log(this.lblYear + " " + this.lblMonth + " " + this.lblCompany + " " + this.radioValue + " " + this.radioValueUnits)

    this.visible = true;
    const randomArray =[]
    for(let i = 0; i<9; i++) {randomArray.push(Math.floor(Math.random() * 100) + 1)}
    
    const s_lastYear = []
    const s_selectYear = []
    const s_ppto = []
    for(let i = 0; i<9; i++) {s_lastYear.push(Math.floor(Math.random() * 100) + 1)}
    for(let i = 0; i<9; i++) {s_selectYear.push(Math.floor(Math.random() * 100) + 1)}
    for(let i = 0; i<9; i++) {s_ppto.push(Math.floor(Math.random() * 100) + 1)}

    this.graphSales(s_lastYear, s_selectYear, s_ppto)
    this.graphSpend([44, 55, 57, 56, 61, 58, 63, 80, 100], [76, 85, 101, 98, 87, 105, 91, 114, 94], [35, 41, 36, 26, 45, 48, 52, 53, 41])

    this.updateDataCard();

    this.graphMargin([44, 55, 57, 56, 61, 58, 63, 60, 66])

    this.graphOperation([44, 55, 57, 56, 61, 58, 63, 60, 66])

    this.createNotify();
    this.consumeService();
    this.first = false;

  }

  consumeService(){
    this.dataService.getDataBalance().subscribe(data =>{
      console.log(data," \n")
    });

    this.dataService.getDataIndicatorV().subscribe(data =>{
      console.log(data)
    })
  }

  updateDataCard() {
    this.loading = true;
    this.lblCLastYear = String(Number(this.lblYear) - 1);
    this.lblCSelectYear = this.lblYear;

    // margin bruto
    this.lblBSelect = String(Math.floor(Math.random() * 1000) + 1) + " millones";
    this.lblBLast = String(Math.floor(Math.random() * 1000) + 1) + " millones";
    this.lblBPorcentSelect = String(Math.floor(Math.random() * 100) + 1) + "%"
    this.lblBPorcentLast = String(Math.floor(Math.random() * 100) + 1) + "%"


    // margin operation 
    this.lblOSelect = String(Math.floor(Math.random() * 1000) + 1) + " millones";
    this.lblOLast = String(Math.floor(Math.random() * 1000) + 1) + " millones";
    this.lblOPorcentSelect = String(Math.floor(Math.random() * 100) + 1) + "%"
    this.lblOPorcentLast = String(Math.floor(Math.random() * 100) + 1) + "%"

  }
  createNotify(){
    this.notify.blank(
      'Parametros seleccionados',
      'Anio: '+ this.lblYear+'\n Mes: '+this.lblMonth+'\n Empresa: '+this.lblCompany
    ).onClick.subscribe(()=>{
    })
  }

  // methods update Labels with choice parameters of dropdown 
  updateLabelYear(data: number): void {
    console.log("Anio " + data)
    this.lblYear = data.toString();
  }

  updateLabelMonth(data: string): void {
    this.lblMonth = data;
  }

  updateLabelCluster(data: string): void {
    this.lblCluster = data;
  }

  updateLabelCompany(data: string): void {
    this.lblCompany = data;
  }

}
