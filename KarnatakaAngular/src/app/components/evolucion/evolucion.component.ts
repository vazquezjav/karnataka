import { Component, OnInit } from '@angular/core';
import * as ApexCharts from 'apexcharts';
@Component({
  selector: 'app-evolucion',
  templateUrl: './evolucion.component.html',
  styleUrls: ['./evolucion.component.css']
})
export class EvolucionComponent implements OnInit {

  isCollapsed = false;
  constructor() { }

  ngOnInit(): void {
  }

}
