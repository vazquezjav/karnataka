import { ValueTransformer } from '@angular/compiler/src/util';
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

  // list values 


  // Data of selects
  slCompany: string [] = []
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
    this.listCompanies = ['Indian Motos Inmot S.A.', 'Karnataka S.A.', 'Metrokia S.A.']
    this.listMonths = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre','Todos']
    this.listYears = [2018, 2019, 2020, 2021]
    this.listClusters = ['Vehiculos', 'Seguros']

    this.dataService.getDataTags().subscribe(tags=>{
      this.slCompany = tags
      console.log('Companias ', this.slCompany)
    })
  }

  graphSales(last_year: any[], present_year: any[], pptoVNE: number[]) {
    
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
        enabled: false,
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
        categories: this.listGetMonts(),
      },
      yaxis: {
        
        title: {
          text: '$ Dolares'
        },
        labels:{
          show:true,
          formatter: function (val: any) {
            return Math.round(val)
          }
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
            return ("$ " + val + " Dolares")
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
        enabled: false,
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
        categories: this.listGetMonts(),
      },
      yaxis: {
        title: {
          text: '$ (Dolares)'
        },
        labels:{
          formatter: function (val: any) {
            return Math.round(val)
          }
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

  graphMargin(year: number[]) {
    var options = {
      series: [{
        name: 'Gastos Anio Anterior',
        data: year
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
        enabled: false,
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
        categories: this.listGetMonts(),
      },
      yaxis: {
        title: {
          text: '$ (Dolares)'
        }, 
        labels:{
          formatter: function (val: any) {
            return Math.round(val)
          }
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
        name: 'Margen Bruto',
        data: year
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
        enabled: false,
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
        categories: this.listGetMonts(),
      },
      yaxis: {
        title: {
          text: '$ (Dolares Operation)'
        },
        labels:{
          formatter: function (val: any) {
            return Math.round(val)
          }
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
        name: 'Margen Operacional',
        data: year
      }])
    }

  }
  updateGraphs() {

    this.visible = true;
    const randomArray =[]
    //for(let i = 0; i<9; i++) {randomArray.push(Math.floor(Math.random() * 100) + 1)}
    

    this.consumeService();
    
    this.updateDataCard();

    

    this.createNotify();
    
    
    this.first = false;
  }

  consumeService(){
    var months:any={"Enero":1,"Febrero":2,"Marzo":3,"Abril":4,"Mayo":5,"Junio":6,"Julio":7,"Agosto":8,"Septiembre":9,"Octubre":10,"Noviembre":11,"Diciembre":12, "Todos":13}

    this.dataService.getDBalance(Number(this.lblYear), months[this.lblMonth], String(3), this.radioValue, this.radioValueUnits).subscribe(data =>{
      this.graphSales(this.roundedVectors(data.last_year), this.roundedVectors(data.present_year), this.roundedVectors(data.presupuest));
    });

    this.dataService.getSOperation(Number(this.lblYear), months[this.lblMonth], String(3), this.radioValue, this.radioValueUnits).subscribe(spendO =>{
      this.graphSpend(this.roundedVectors(spendO.last_year), this.roundedVectors(spendO.present_year), this.roundedVectors(spendO.presupuest));
    })

    this.dataService.getMBruto(Number(this.lblYear), months[this.lblMonth], String(3), this.radioValue, this.radioValueUnits).subscribe(marginB =>{
      this.graphMargin(this.roundedVectors(marginB.present_year));

      //update data card
      if(this.lblMonth =="Todos"){
        this.lblBSelect =this.sumValuesList(marginB.present_year).toFixed(2).toString(); 
        this.lblBLast = this.sumValuesList(marginB.last_year).toFixed(2).toString();
      }else{
        this.lblBSelect = marginB.present_year.toFixed(2);
        this.lblBLast = marginB.last_year.toFixed(2);
      }
    })

    this.dataService.getMOperation(Number(this.lblYear), months[this.lblMonth], String(3), this.radioValue, this.radioValueUnits).subscribe(marginO =>{
      this.graphOperation(this.roundedVectors(marginO.present_year));
      //update data card
      if(this.lblMonth =="Todos"){
        this.lblOSelect =this.sumValuesList(marginO.present_year).toFixed(2).toString(); 
        this.lblOLast = this.sumValuesList(marginO.last_year).toFixed(2).toString();
      }else{
        this.lblOSelect = marginO.present_year.toFixed(2);
        this.lblOLast = marginO.last_year.toFixed(2);
      }
    })
  }

  sumValuesList(year:any[]){
    var sum =0;
    var aux = 0;
    for(var i in year){
      if(aux ==year[i]){
        break
      }
      sum +=year[i];
      aux = year[i];
    }
    return sum;
  }
  listGetMonts(){
    if(this.lblMonth =="Todos"){
      return this.listMonths;
    }else{
      return [this.lblMonth];
    }
  }
  updateDataCard() {
    this.loading = true;
    this.lblCLastYear = String(Number(this.lblYear) - 1);
    this.lblCSelectYear = this.lblYear;

    // margin bruto
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
      'Anio: '+ this.lblYear+'\n Mes: '+this.lblMonth+'\n Visualizar: '+this.radioValue
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

  roundedVectors(year:any[]){
    var values=[]
    for(var i in year){
      values.push(year[i].toFixed(2));
    }
    return values;
  }
}
