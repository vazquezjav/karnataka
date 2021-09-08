import { Component, OnInit, ViewChild } from '@angular/core';
import * as ApexCharts from "apexcharts";

@Component({
  selector: 'app-evolucion',
  templateUrl: './evolucion.component.html',
  styleUrls: ['./evolucion.component.css']
})
export class EvolucionComponent implements OnInit {

  isCollapsed = false;
  loading = false;
  first = true;

  // Labels
  labelYear = "Seleccione";
  labelMonth= "Todos";
  labelCluster = "Todos";
  labelCompany = "Seleccione";
  
  // Labels cards 
  labelCardLastYear = "";
  labelCardPresentYear = "";
  labelBrutoLast = "";
  labelBrutoPresent = "";
  labelBrutoPorcentLast = "";
  labelBrutoPorcentPresent = "";

  // radio values
  radioValue = "Acumulado";
  radioValueUnits = "Millones";

  // lists
  listCompanies: string[] = []
  listMonths: string[] = []
  listYears: number[] = []

  constructor() {

  }

  ngOnInit(): void {
    this.fillLists();
    
  }

  // method fill all lists
  fillLists() {
    this.listCompanies = ['El juri', 'UPS', 'Coral']
    this.listMonths = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
    this.listYears = [2018, 2019, 2020, 2021]
  }

  graphSales(last_year:number[], present_year:number[], pptoVNE:number[]) {
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
        id:'sales',
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
            position: 'top', // top, center, bottom
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
      title:{
        text:  this.labelYear,
        align: 'center',
        floating: false,
        position: 'top'
      }
    };

    var chart = new ApexCharts(document.querySelector("#chart_sales"), options);

    if (this.first){
      chart.render();
    }else{
      
    }
    
  }

  graphSpend(last_year:number[], present_year:number[], pptoGOP:number[]) {
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
      }
    };

    var chart = new ApexCharts(document.querySelector("#chart_spend"), options);
    chart.render();
  }

  graphMargin(last_year:number[]) {
    var options = {
      series: [{
        name: 'Gastos Anio Anterior',
        data: last_year
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
    chart.render();
  }

  graphOperation(year:number[]){
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
    chart.render();

  }
  updateGraphs(){
    console.log(this.labelYear+" "+ this.labelMonth+ " "+this.labelCompany+" "+ this.radioValue+" "+this.radioValueUnits)

    this.graphSales([44, 55, 57, 56, 61, 58, 63, 60, 66], [76, 85, 101, 98, 87, 105, 91, 114, 94], [35, 41, 36, 26, 45, 48, 52, 53, 41])
    this.graphSpend([44, 55, 57, 56, 61, 58, 63, 80,100], [76, 85, 101, 98, 87, 105, 91, 114, 94], [35, 41, 36, 26, 45, 48, 52, 53, 41])

    this.updateDataCard();
    
    this.graphMargin([44, 55, 57, 56, 61, 58, 63, 60, 66])

    this.graphOperation([44, 55, 57, 56, 61, 58, 63, 60, 66])
    
    this.first = false;

  }

  updateDataCard(){
    this.loading = true;
    this.labelCardLastYear=String(Number(this.labelYear)-1);
    this.labelCardPresentYear = this.labelYear;

    this.labelBrutoPresent="15 millones"
    this.labelBrutoLast="12 millones"

    this.labelBrutoPorcentPresent="Prese %"
    this.labelBrutoPorcentLast="Past %"

    
  }

  // methods update Labels with choice parameters of dropdown 
  updateLabelYear(data: number): void {
    console.log("Anio "+data)
    this.labelYear = data.toString();
  }

  updateLabelMonth(data: string): void {
    this.labelMonth = data;
  }

  updateLabelCluster(data: string): void {
    this.labelCluster = data;
  }

  updateLabelCompany(data: string): void {
    this.labelCompany = data;
  }

}
