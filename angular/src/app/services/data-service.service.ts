import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {
  private URL = "https://localhost:44302"

  constructor(
    private http: HttpClient,
  ) { }

  // Get data of view : eeff_saldos_ebi_v
  getDataBalance(year:number, month:string, company:string){
    return this.http.get(`${this.URL}/api/balancee`, {params: new HttpParams({fromString:`year=${year}&month=${month}&company=${company}`})});
  }

  // Get data of view : eeff_valor_indicador_v
  getDataIndicatorV(){
    return this.http.get(`${this.URL}/api/indicatorv`);
  }
}
