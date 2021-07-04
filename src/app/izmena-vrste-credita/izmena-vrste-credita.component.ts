import { Component, OnInit,TemplateRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../api.service';
import { Valuta } from '../_modeli/valuta';
import { VrstaKredita } from '../_modeli/vrstaKredita';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-izmena-vrste-credita',
  templateUrl: './izmena-vrste-credita.component.html',
  styleUrls: ['./izmena-vrste-credita.component.css']
})
export class IzmenaVrsteCreditaComponent implements OnInit {
 
  forma:FormGroup;
  formaIzmena:FormGroup;
  vrsteKredita:VrstaKredita[]=[];
  vrsteKredita1:VrstaKredita[]=[];
  izmena:boolean=false;
  vrsteValuta:Valuta[]=[];
  modalRef: BsModalRef;
  vk:VrstaKredita;
  selectValue:string;

  constructor(private apiService:ApiService,private modalService: BsModalService) { 
    this.apiService.vratiVrsteKredita().subscribe(response=>{
      this.vrsteKredita=response;
      this.vrsteKredita1=this.vrsteKredita;
    })

    this.apiService.vratiValute().subscribe(response=>{
      this.vrsteValuta=response;
    })
  }

  ngOnInit(): void {

    this.initializeForm();
  }

  initializeForm(){
    this.forma=new FormGroup({
      kriterijum:new FormControl('',[Validators.required]),
    });

    this.formaIzmena=new FormGroup({
      naziv:new FormControl('',[Validators.minLength(2),Validators.required]),
      sifraValute:new FormControl('',[Validators.required]),
      sifravrstekr:new FormControl()
    });

  }

  dodajVrstuKredista(){
    this.apiService.pretraziVrsteKredita(this.forma.controls['kriterijum'].value).subscribe(response=>{
      this.vrsteKredita1=response;
    })
  }

  izmeni(id:number){
    console.log(id);
    this.izmena=true;
    this.formaIzmena.patchValue({
      naziv:'aaaa'
    });
  }

  resetujListu(){
    this.vrsteKredita1=this.vrsteKredita;
  }

  openModal(template: TemplateRef<any>,id:number) {

    for (let i = 0; i < this.vrsteKredita.length; i++) {
      if(this.vrsteKredita[i].sifraVrsteKr===id)
      {
        this.vk=this.vrsteKredita[i];
        break;
      }
    }
    this.modalRef = this.modalService.show(template);
    this.formaIzmena.patchValue({
      naziv:this.vk.naziv,
      sifraValute:this.vk.valuta.sifraValute,
      sifravrstekr:id
    })
    this.selectValue=this.vk.valuta.naziv;
    console.log(this.selectValue);
  }

  ChangingValue(e){
    for (let i = 0; i < this.vrsteValuta.length; i++) {
      if(this.vrsteValuta[i].sifraValute==e.target.value)
      {
        this.selectValue=this.vrsteValuta[i].naziv;
        break;
      }
    }
  }

  izmeniVrstuKredista(){
    console.log(this.formaIzmena.value);
    this.apiService.izmeniVrstuKredita(this.formaIzmena.value).subscribe(()=>{
      alert('Vrsta kredita je uspesno izmenjena');
      this.apiService.vratiVrsteKredita().subscribe(response=>{
        this.vrsteKredita=response;
        this.vrsteKredita1=this.vrsteKredita;
      });
    })

  }

}
