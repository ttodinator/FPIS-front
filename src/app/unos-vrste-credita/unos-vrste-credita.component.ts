import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../api.service';
import { Valuta } from '../_modeli/valuta';

@Component({
  selector: 'app-unos-vrste-credita',
  templateUrl: './unos-vrste-credita.component.html',
  styleUrls: ['./unos-vrste-credita.component.css']
})
export class UnosVrsteCreditaComponent implements OnInit {

  
  forma:FormGroup;
  vrsteValuta:Valuta[]=[];

  constructor(private apiService:ApiService) { 
    this.apiService.vratiValute().subscribe(response=>{
      this.vrsteValuta=response;
    })
  }

  ngOnInit(): void {

    this.initializeForm();
  }

  initializeForm(){
    this.forma=new FormGroup({
      naziv:new FormControl('',[Validators.minLength(2),Validators.required]),
      sifraValute:new FormControl('',[Validators.required])
    });

  }

  dodajVrstuKredista(){
    console.table(this.forma.value);
    this.apiService.sacuvajVrstuKredita(this.forma.value).subscribe(()=>{
      alert('Uspesno');
      this.forma.reset();
    })
  }

  resetujFormu(){
    this.forma.reset();
  }

}
