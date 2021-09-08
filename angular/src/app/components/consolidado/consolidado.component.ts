import { THIS_EXPR } from "@angular/compiler/src/output/output_ast";
import { Component, OnInit, ViewChild } from "@angular/core";


@Component({
  selector: 'app-consolidado',
  templateUrl: './consolidado.component.html',
  styleUrls: ['./consolidado.component.css']
})
export class ConsolidadoComponent implements OnInit {

  // Labels
  lblYear = "Seleccione";
  lblMonth = "Todos";
  lblCluster= "Todos";
  lblCompany = "Seleccione";

  // radio values
  radioValue = "Acumulado";
  radioValueUnits = "Millones";

  // lists
  listCompanies: string[] = []
  listMonths: string[] = []
  listYears: number[] = []

  // **** LABELS CARDS ***
  lblCLastYear="";
  lblCSelectYear ="";

  // Sales
  lblSLast = "";
  lblSSelect = "";

  // Margin Bruto
  lblBLast = ""
  lblBSelect = "";
  lblBPorcentLast = ""
  lblBPorcentSelect = "";
  

  // labels value datas colors 
  valueSales=0;
  valueMarginBruto=0;
  valueSpendOperation=0;
  valueMarginOperation=0;
  valueSpendNOperation=0;
  valueMarginNeto=0;
  valueEBITDA=0;

  visible=false;

  constructor() {
    
   }

  ngOnInit(): void {
   this.fillLists();
  }

  fillLists() {
    this.listCompanies = ['El juri', 'UPS', 'Coral']
    this.listMonths = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
    this.listYears = [2018, 2019, 2020, 2021]
  }

  // method graphs diferents charts
  graphSales(year:number[]){
    var options = {
      series: [{
        name: 'Ventas por mes',
        data: year
      },
      ],
      chart: {
        type: 'bar',
        height: 200,
        width: 350,
        toolbar:{
          show:false,
          tools:{
            download: false
          }
        },
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '55%',
          endingShape: 'rounded',
        },
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
          text: this.radioValueUnits
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
            return "$" + val + " Dolares"
          }
        }
      },
      dataLabels: {
        enabled: false
      },
      
      title:{
        text:  'Ventas por Mes',
        align: 'left',
        floating: false,
        position: 'top'
      }
    };

    var chart = new ApexCharts(document.querySelector("#chart_sales"), options);
    chart.render();

  }

  graphMarginBruto(year:number[]){
    var options = {
      series: [{
        name: 'Margen Bruto por Mes',
        data: year
      },
      ],
      chart: {
        type: 'bar',
        height: 200,
        width: 350,
        toolbar:{
          show:false,
          tools:{
            download: false
          }
        },
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
      },
      title:{
        text:  'Margen Bruto por Mes',
        align: 'left',
        floating: false,
        position: 'top'
      }
    };

    var chart = new ApexCharts(document.querySelector("#chart_marginBruto"), options);
    chart.render();
  }

  graphSpendOperation(year:number[]){
    var options = {
      series: [{
        name: 'Gastos Operacionales',
        data: year
      },
      ],
      chart: {
        type: 'bar',
        height: 200,
        width: 350,
        toolbar:{
          show:false,
          tools:{
            download: false
          }
        },
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
      },
      title:{
        text:  'Gastos Operacionales',
        align: 'left',
        floating: false,
        position: 'top'
      }
    };

    var chart = new ApexCharts(document.querySelector("#chart_spendOperation"), options);
    chart.render();
  }

  graphMarginOperation(year:number[]){
    var options = {
      series: [{
        name: 'Margen Operacional por Mes',
        data: year
      },
      ],
      chart: {
        type: 'bar',
        height: 200,
        width: 350,
        toolbar:{
          show:false,
          tools:{
            download: false
          }
        },
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
      },
      title:{
        text:  'Margen Operacional por Mes',
        align: 'left',
        floating: false,
        position: 'top'
      }
    };

    var chart = new ApexCharts(document.querySelector("#chart_marginOperation"), options);
    chart.render();
  }

  graphSpendNOperation(year:number[]){
    var options = {
      series: [{
        name: 'Gastos No Operacionales por Mes',
        data: year
      },
      ],
      chart: {
        type: 'bar',
        height: 200,
        width: 350,
        toolbar:{
          show:false,
          tools:{
            download: false
          }
        },
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
      },
      title:{
        text:  'Gastos No Operacionales por Mes',
        align: 'left',
        floating: false,
        position: 'top'
      }
    };

    var chart = new ApexCharts(document.querySelector("#chart_spendNOperation"), options);
    chart.render();
  }

  graphMarginNeto(year:number[]){
    var options = {
      series: [{
        name: 'Margen Neto por Mes',
        data: year
      },
      ],
      chart: {
        type: 'bar',
        height: 200,
        width: 350,
        toolbar:{
          show:false,
          tools:{
            download: false
          }
        },
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
      },
      title:{
        text:  'Margen Neto por Mes',
        align: 'left',
        floating: false,
        position: 'top'
      }
    };

    var chart = new ApexCharts(document.querySelector("#chart_marginNeto"), options);
    chart.render();
  }

  graphEBITDA(year:number[]){
    var options = {
      series: [{
        name: 'EBITDA por Mes',
        data: year
      },
      ],
      chart: {
        type: 'bar',
        height: 200,
        width: 350,
        toolbar:{
          show:false,
          tools:{
            download: false
          }
        },
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
      },
      title:{
        text:  'EBITDA por Mes',
        align: 'left',
        floating: false,
        position: 'top'
      }
    };

    var chart = new ApexCharts(document.querySelector("#chart_ebitda"), options);
    chart.render();
  }


  updateGraphs(){
    this.visible = true;

    this.graphSales([44, 55, 57, 56, 61, 58, 63, 60, 66])
    this.graphMarginBruto([44, 55, 57, 56, 61, 58, 63, 60, 66])
    this.graphSpendOperation([44, 55, 57, 56, 61, 58, 63, 60, 66])
    this.graphMarginOperation([44, 55, 57, 56, 61, 58, 63, 60, 66])
    this.graphSpendNOperation([44, 55, 57, 56, 61, 58, 63, 60, 66])
    this.graphMarginNeto([44, 55, 57, 56, 61, 58, 63, 60, 66])
    this.graphEBITDA([44, 55, 57, 56, 61, 58, 63, 60, 66])
    
    this.updateValues();
    this.updateLabelCards();
  }

  updateValues(){
    this.valueSales=-1;
    this.valueEBITDA=-25;
  }

  updateLabelCards(){
    this.lblCSelectYear = this.lblYear;
    this.lblCLastYear = String(Number(this.lblYear)-1);

    // Sales 
     this.lblSLast = String(Math.floor(Math.random() * 1000) + 1) + " millones";
     this.lblSSelect = String(Math.floor(Math.random() * 1000) + 1) + " millones";

     // Margin Bruto 
     this.lblBLast = String(Math.floor(Math.random() * 1000) + 1) + " millones";
     this.lblBSelect = String(Math.floor(Math.random() * 1000) + 1) + " millones";
     this.lblBPorcentLast = String(Math.floor(Math.random() * 1000) + 1) + "%";
     this.lblBPorcentSelect = String(Math.floor(Math.random() * 1000) + 1) + "%";

     // Margin Operation
  }

  // methods update Labels with choice parameters of dropdown 
  updateLabelYear(data: number): void {
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
