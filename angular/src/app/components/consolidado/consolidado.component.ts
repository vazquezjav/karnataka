import { THIS_EXPR } from "@angular/compiler/src/output/output_ast";
import { Component, OnInit, ViewChild } from "@angular/core";
import { DataServiceService } from "src/app/services/data-service.service";


@Component({
  selector: 'app-consolidado',
  templateUrl: './consolidado.component.html',
  styleUrls: ['./consolidado.component.css']
})
export class ConsolidadoComponent implements OnInit {

  // Labels
  lblYear = "";
  lblMonth = "";
  lblCluster = "Todos";
  lblCompany = "Seleccione";

  // radio values
  radioValue = "Mes";
  radioValueUnits = "Millones";

  // **** LABELS CARDS ***
  lblCLastYear = "";
  lblCSelectYear = "";

  // Sales
  lblSLast = "";
  lblSSelect = "";

  // Margin Bruto
  lblBLast = ""
  lblBSelect = "";
  lblBPorcentLast = ""
  lblBPorcentSelect = "";

  // Spend Operation 
  lblSOLast = "";
  lblSOSelect = "";
  lblSOPorcentLast = "";
  lblSOPorcentSelect = "";

  // Margin Operation 
  lblMOLast = "";
  lblMOSelect = "";
  lblMOPorcentLast = "";
  lblMOPorcentSelect = "";

  // Spend No Operation 
  lblNOLast = "";
  lblNOSelect = "";
  lblNOPorcentLast = "";
  lblNOPorcentSelect = "";

  // Margin Neto
  lblMNLast = "";
  lblMNSelect = "";
  lblMNPorcentLast = "";
  lblMNPorcentSelect = "";

  // EBITDA
  lblELast = "";
  lblESelect = "";

  // labels value datas colors 
  valueSales = 0;
  valueMarginBruto = 0;
  valueSpendOperation = 0;
  valueMarginOperation = 0;
  valueSpendNOperation = 0;
  valueMarginNeto = 0;
  valueEBITDA = 0;


  visible = false;
  first = true;

  // lists
  listCompanies: string[] = []
  listMonths: string[] = []
  listYears: number[] = []
  listClusters: string[] = []

  constructor(
    private service: DataServiceService
  ) {

  }

  ngOnInit(): void {
    this.fillLists();
  }

  fillLists() {
    this.listMonths = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    this.listYears = [2018, 2019, 2020, 2021];
    var date = new Date();
    this.lblYear=String(date.getFullYear());
    
    var months: any = { "Enero": 1, "Febrero": 2, "Marzo": 3, "Abril": 4, "Mayo": 5, "Junio": 6, "Julio": 7, "Agosto": 8, "Septiembre": 9, "Octubre": 10, "Noviembre": 11, "Diciembre": 12, "Todos": 13 }

    this.lblMonth=String(Object.keys(months).find(key => months[key] === date.getUTCMonth() + 1));

    this.updateGraphs();
  }

  // method graphs diferents charts
  /*
  graphSales(year: number[]) {
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
        toolbar: {
          show: false,
          tools: {
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

      title: {
        text: 'Ventas por Mes',
        align: 'left',
        floating: false,
        position: 'top'
      }
    };

    var chart = new ApexCharts(document.querySelector("#chart_sales"), options);
    if (this.first) {
      chart.render();
    } else {
      chart.render();
      chart.updateSeries([{
        name: 'Ventas',
        data: year
      }])
    }

  }

  graphMarginBruto(year: number[]) {
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
        toolbar: {
          show: false,
          tools: {
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
      title: {
        text: 'Margen Bruto por Mes',
        align: 'left',
        floating: false,
        position: 'top'
      }
    };

    var chart = new ApexCharts(document.querySelector("#chart_marginBruto"), options);
    if (this.first) {
      chart.render();
    } else {
      chart.render();
      chart.updateSeries([{
        name: 'Margen bruto',
        data: year
      }])
    }
  }

  graphSpendOperation(year: number[]) {
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
        toolbar: {
          show: false,
          tools: {
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
      title: {
        text: 'Gastos Operacionales',
        align: 'left',
        floating: false,
        position: 'top'
      }
    };

    var chart = new ApexCharts(document.querySelector("#chart_spendOperation"), options);
    if (this.first) {
      chart.render();
    } else {
      chart.render();
      chart.updateSeries([{
        name: 'Gasto Operacional',
        data: year
      }])
    }
  }

  graphMarginOperation(year: number[]) {
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
        toolbar: {
          show: false,
          tools: {
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
      title: {
        text: 'Margen Operacional por Mes',
        align: 'left',
        floating: false,
        position: 'top'
      }
    };

    var chart = new ApexCharts(document.querySelector("#chart_marginOperation"), options);
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

  graphSpendNOperation(year: number[]) {
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
        toolbar: {
          show: false,
          tools: {
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
      title: {
        text: 'Gastos No Operacionales por Mes',
        align: 'left',
        floating: false,
        position: 'top'
      }
    };

    var chart = new ApexCharts(document.querySelector("#chart_spendNOperation"), options);
    if (this.first) {
      chart.render();
    } else {
      chart.render();
      chart.updateSeries([{
        name: 'Gastos no Operacionales',
        data: year
      }])
    }
  }

  graphMarginNeto(year: number[]) {
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
        toolbar: {
          show: false,
          tools: {
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
      title: {
        text: 'Margen Neto por Mes',
        align: 'left',
        floating: false,
        position: 'top'
      }
    };

    var chart = new ApexCharts(document.querySelector("#chart_marginNeto"), options);
    if (this.first) {
      chart.render();
    } else {
      chart.render();
      chart.updateSeries([{
        name: 'Margen Neto',
        data: year
      }])
    }
  }

  graphEBITDA(year: number[]) {
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
        toolbar: {
          show: false,
          tools: {
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
      title: {
        text: 'EBITDA por Mes',
        align: 'left',
        floating: false,
        position: 'top'
      }
    };

    var chart = new ApexCharts(document.querySelector("#chart_ebitda"), options);
    if (this.first) {
      chart.render();
    } else {
      chart.render();
      chart.updateSeries([{
        name: 'EBITDA',
        data: year
      }])
    }
  }*/

  graphGeneral(id:string, nombre:string, year: number[]) {
    var options = {
      series: [{
        name: nombre,
        data: year
      },
      ],
      chart: {
        type: 'bar',
        height: 220,
        width: 350,
        toolbar: {
          show: false,
          tools: {
            download: false
          }
        },
        color:['#e1b1bc']
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
        categories: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      },
      yaxis: {
        show:true,
        labels:{
          show:true,
          formatter: function (val: any) {
            return Math.round(val)
          }
        }
      },
      fill: {
        opacity: 1,
        colors: ['#bf9780']
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
        text: nombre +" por Mes",
        align: 'left',
        floating: false,
        position: 'top'
      }
    };

    var chart = new ApexCharts(document.querySelector("#"+id), options);
    if (this.first) {
      chart.render();
    } else {
      chart.render();
      chart.updateSeries([{
        name: nombre,
        data: year
      }])
    }
  }


  updateGraphs() {
    this.visible = true;

    this.consumeService();
  }

  consumeService() {
    
    var months: any = { "Enero": 1, "Febrero": 2, "Marzo": 3, "Abril": 4, "Mayo": 5, "Junio": 6, "Julio": 7, "Agosto": 8, "Septiembre": 9, "Octubre": 10, "Noviembre": 11, "Diciembre": 12, "Todos": 13 }

    console.log("mes ",  Object.keys(months).find(key => months[key] === new Date().getUTCMonth() + 1))

    this.lblCSelectYear = this.lblYear;
    this.lblCLastYear = String(Number(this.lblYear) - 1);

    this.service.getConsolidated(Number(this.lblYear), months[this.lblMonth], String(3), this.radioValue, this.radioValueUnits, "Venta Neta").subscribe(sales => {
      this.lblSLast = sales.value_last.toFixed(2) + " " + this.radioValueUnits;
      this.lblSSelect = sales.value_present.toFixed(2) + " " + this.radioValueUnits;
      this.valueSales = Number((sales.value_present - sales.value_last).toFixed(2));
      console.log("salesss ",sales )
      this.graphGeneral("chart_sales","Ventas",sales.present_year);

    });

    this.service.getConsolidated(Number(this.lblYear), months[this.lblMonth], String(3), this.radioValue, this.radioValueUnits, "Margen Bruto").subscribe(marginB => {
      this.lblBLast = marginB.value_last.toFixed(2) + " " + this.radioValueUnits;
      this.lblBSelect = marginB.value_present.toFixed(2) + " " + this.radioValueUnits;
      this.lblBPorcentLast = marginB.porcent_last + "%";
      this.lblBPorcentSelect = marginB.porcent_present + "%";
      this.valueMarginBruto = Number((marginB.porcent_present - marginB.porcent_last).toFixed(2));
      this.graphGeneral("chart_marginBruto","Margen Bruto",marginB.present_year);
    })

    this.service.getConsolidated(Number(this.lblYear), months[this.lblMonth], String(3), this.radioValue, this.radioValueUnits, "Gastos Operacionales").subscribe(spendO=>{
      this.lblSOLast = spendO.value_last.toFixed(2) + " " + this.radioValueUnits;
      this.lblSOSelect = spendO.value_present.toFixed(2) + " " + this.radioValueUnits;
      this.lblSOPorcentLast = spendO.porcent_last + "%";
      this.lblSOPorcentSelect = spendO.porcent_present + "%";
      this.valueSpendOperation = Number((spendO.porcent_present - spendO.porcent_last).toFixed(2));
      this.graphGeneral("chart_spendOperation","Gastos Operacionales",spendO.present_year);
    })
    
    this.service.getConsolidated(Number(this.lblYear), months[this.lblMonth], String(3), this.radioValue, this.radioValueUnits, "Utilidad Operacional").subscribe(marginO=>{
      this.lblMOLast = marginO.value_last.toFixed(2) + " " + this.radioValueUnits;
      this.lblMOSelect = marginO.value_present.toFixed(2) + " " + this.radioValueUnits;
      this.lblMOPorcentLast = marginO.porcent_last + "%";
      this.lblMOPorcentSelect = marginO.porcent_present+"%";
      this.valueMarginOperation = Number((marginO.porcent_present - marginO.porcent_last).toFixed(2));
      this.graphGeneral("chart_marginOperation","Margen Operacional",marginO.present_year);
    })

    this.service.getConsolidated(Number(this.lblYear), months[this.lblMonth], String(3), this.radioValue, this.radioValueUnits, "Gastos No Operacionales").subscribe(spendNO=>{
      this.lblNOLast = spendNO.value_last.toFixed(2) + " " + this.radioValueUnits;
      this.lblNOSelect = spendNO.value_present.toFixed(2) + " " + this.radioValueUnits;
      this.lblNOPorcentLast = spendNO.porcent_last + "%";
      this.lblNOPorcentSelect = spendNO.porcent_present+"%";
      this.valueSpendNOperation = Number((spendNO.porcent_present - spendNO.porcent_last).toFixed(2));
      this.graphGeneral("chart_spendNOperation","Gastos No Operacionales",spendNO.present_year);
    })

    this.service.getConsolidated(Number(this.lblYear), months[this.lblMonth], String(3), this.radioValue, this.radioValueUnits, "Utilidad Neta").subscribe(marginN =>{
      console.log(marginN)
      this.lblMNLast = marginN.value_last.toFixed(2) + " " + this.radioValueUnits;
      this.lblMNSelect = marginN.value_present.toFixed(2) + " " + this.radioValueUnits;
      this.lblMNPorcentLast = marginN.porcent_last + "%";
      this.lblMNPorcentSelect = marginN.porcent_present+"%";
      this.valueMarginNeto = Number((marginN.porcent_present - marginN.porcent_last).toFixed(2));
      this.graphGeneral("chart_marginNeto","Margen Neto",marginN.present_year);
    })

    this.service.getConsolidated(Number(this.lblYear), months[this.lblMonth], String(3), this.radioValue, this.radioValueUnits, "EBITDA").subscribe(ebi =>{
      this.lblELast = ebi.value_last.toFixed(2) + " " + this.radioValueUnits;
      this.lblESelect = ebi.value_present.toFixed(2) + " " + this.radioValueUnits;
      this.graphGeneral("chart_ebitda","EBITDA",ebi.present_year);
      this.valueEBITDA = Number((ebi.value_present - ebi.value_last).toFixed(2));
      this.first = false;
    })
    
  }
  // methods update Labels with choice parameters of dropdown 
  updateLabelYear(data: number): void {
    this.lblYear = data.toString();
    this.consumeService()
  }

  updateLabelMonth(data: string): void {
    this.lblMonth = data;
    this.consumeService()
  }

  updateUnits(data: string){
    this.consumeService()
  }

}
