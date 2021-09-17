import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {
  private URL = "https://localhost:44302"

  constructor(
    private http: HttpClient,
  ) { }

  // Get data of view : eeff_saldos_ebi_v
  getDBalance(year:number, month:string, company:string, typeVisualization: string, typeUnits: string): Observable<any>{
    return this.http.get(`${this.URL}/api/margino`, {params: new HttpParams({fromString:`year=${year}&month=${month}&company=${company}&typeVisualization=${typeVisualization}&typeUnits=${typeUnits}&typeGraph=VENTAS NETAS`})});
  }

  // Get data of view : eeff_valor_indicador_v
  getDataIndicatorV(){
    return this.http.get(`${this.URL}/api/indicatorv`);
  }

  //Get data of tags: tags of select 
  getDataTags(): Observable<any>{
    return this.http.get(`${this.URL}/api/datatags`)
  }

  // get spend operation 
  getSOperation(year:number, month:string, company:string, typeVisualization: string, typeUnits: string): Observable<any>{
    return this.http.get(`${this.URL}/api/spendo`, {params: new HttpParams({fromString:`year=${year}&month=${month}&company=${company}&typeVisualization=${typeVisualization}&typeUnits=${typeUnits}`})});
  }

  //get margin bruto
  getMBruto(year:number, month:string, company:string, typeVisualization: string, typeUnits: string): Observable<any>{
    return this.http.get(`${this.URL}/api/margino`, {params: new HttpParams({fromString:`year=${year}&month=${month}&company=${company}&typeVisualization=${typeVisualization}&typeUnits=${typeUnits}&typeGraph=UTILIDAD BRUTA`})});
  }

  // get margin operation
  getMOperation(year:number, month:string, company:string, typeVisualization: string, typeUnits: string): Observable<any>{
    return this.http.get(`${this.URL}/api/margino`, {params: new HttpParams({fromString:`year=${year}&month=${month}&company=${company}&typeVisualization=${typeVisualization}&typeUnits=${typeUnits}&typeGraph=UTILIDAD OPERACIONAL`})});
  }
}
