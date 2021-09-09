import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-condensacion-ventas',
  templateUrl: './condensacion-ventas.component.html',
  styleUrls: ['./condensacion-ventas.component.css']
})
export class CondensacionVentasComponent implements OnInit {

  // labels 
  lblYear = "Seleccione";
  lblMonth = "Todos"
  lblDistribution = "Todas"
  lblCluster = "Todas"
  lblCompany = "Seleccione"

  // lists 
  listYears: number[] = [];
  listMonths: string[] = [];
  listCompanies: string[] = [];
  listDistributions: string[] = [];
  listClusters: string[] = []

  visible = false;

  radioCalcule = "Acumulado"

  constructor() { }

  ngOnInit(): void {
    this.fillLists();
  }

  // method fill all lists
  fillLists() {
    this.listCompanies = ['El juri', 'UPS', 'Coral']
    this.listMonths = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre','Todos']
    this.listYears = [2018, 2019, 2020, 2021]
    this.listDistributions = ['distribucion ', 'distribucion 1 ']
    this.listClusters = ['Cluster', 'Todos']
  }

  updateGraphs() {

    this.visible = true;
    this.graphParticipacionUnit([25, 45, 68, 95, 74]);
    this.graphParticipationDistri([]);
    this.graphLocations([]);
    this.graphEvolution([44, 55, 57, 56, 61, 58, 63, 80,100,15,12,16],[44, 55, 57, 56, 61, 58, 63, 80,100,87,98,74]);
  }

  graphParticipacionUnit(data: number[]) {
    var options = {
      series: [{
        name: 'Participacion por unidad de negocio',
        data: data
      },
      ],
      chart: {
        type: 'bar',
        height: 300,
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
        categories: ['Motos', 'Autos', 'Repuestos', 'Otros', ['Accesorios']],
        title: {
          text: 'Grupos'
        }
      },
      yaxis: {
        title: {
          text: 'Ventas'
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
        text: 'Participacion por unidad de negocio',
        align: 'center',
        floating: false,
        position: 'top'
      }
    };

    var chart = new ApexCharts(document.querySelector("#chart_participationUnit"), options);
    chart.render();

  }

  graphParticipationDistri(data: number[]) {
    var options = {
      series: [40, 50, 45],
      chart: {
        type: 'donut',

        height: 350,
        width: 400
      },
      responsive: [{
        breakpoint: 480,
        options: {
          legend: {
            position: 'bottom',

          }
        }
      }],
      labels: ['Clandestina', 'Retail', 'Cadenas'],
      title: {
        text: 'Participación por distribución '
      }
    }

    var chart = new ApexCharts(document.querySelector("#chart_participationDistri"), options);
    chart.render();
  }

  graphLocations(data: number[]) {
    var options = {
      series: [{
        data: [400, 430, 448, 470, 540]
      }],
      chart: {
        type: 'bar',
        height: 300,
        width: 350
      },
      plotOptions: {
        bar: {
          borderRadius: 4,
          horizontal: true,
        }
      },
      dataLabels: {
        enabled: false
      },
      xaxis: {
        categories: ['Cuenca Matriz', 'Guayaquil 1', 'Guayaquil 2', 'Quito ', 'Guayaqul 3'],
        title: {
          text: 'Ventas'
        }
      },
      yaxis: {
        title: {
          text: 'Almacen'
        }
      },
      tooltip: {
        y: {
          formatter: function (val: any, opt: any) {
            return opt.w.globals.labels[opt.dataPointIndex] + "$ " + val + " Dolares"
          }
        },
        x: {
          show: true,
        }
      },
      title: {
        text: 'Almacenes',
        align: 'center',
        position: 'top'
      }

    };

    var chart = new ApexCharts(document.querySelector("#chart_locations"), options);
    chart.render();

  }

  graphEvolution(last_year: number[], present_year: number[]) {
    var options = {
      series: [{
        name: 'Ventas Ant',
        data: last_year
      }, {
        name: 'Ventas',
        data: present_year
      }],
      chart: {
        type: 'bar',
        height: 350,
        width: 650
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '55%',
          endinShape: 'rounded',
          dataLabels: {
            position: 'top'
          }
        }
      },
      dataLabels: {
        enabled: true,
        formattet: function (val: any) {
          return "$" + val
        },
        offsetY: -20,
        style: {
          fontSize: '10px',
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
        title: {
          text: 'Mes'
        }
      },
      yaxis: {
        title: {
          text: 'Ventas Ant, Ventas y PPTO'
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
            return "$ " + val 
          }
        }
      }, 
      title:{
        text: 'Evaluacion de ventas por mes en el periodo 2020-2021',
        align:'center',
        floating: false,
        position: 'top'
      }
    }
    var chart = new ApexCharts(document.querySelector("#chart_evolution"), options);
    chart.render();
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
  updateLabelDistribution(data: string): void {
    this.lblDistribution = data;
  }

}
