import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Valuta } from './_modeli/valuta';
import { VrstaKredita } from './_modeli/vrstaKredita';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient) { }

  vratiValute(){
    return this.http.get<Valuta[]>('https://localhost:5001/api/kredit/valute');
  }

  vratiVrsteKredita(){
    return this.http.get<VrstaKredita[]>('https://localhost:5001/api/kredit/vrste-kredita');
  }

  pretraziVrsteKredita(naziv:string){
    return this.http.get<VrstaKredita[]>('https://localhost:5001/api/kredit/vrste-kredita/'+naziv);
  }


  sacuvajVrstuKredita(model:any){
    return this.http.post('https://localhost:5001/api/kredit',model,{});
  }

  izmeniVrstuKredita(model:any){
    return this.http.put('https://localhost:5001/api/kredit',model,{});
  }

}
