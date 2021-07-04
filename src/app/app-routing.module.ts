import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IzmenaVrsteCreditaComponent } from './izmena-vrste-credita/izmena-vrste-credita.component';
import { UnosVrsteCreditaComponent } from './unos-vrste-credita/unos-vrste-credita.component';

const routes: Routes = [
  {path:'',component:UnosVrsteCreditaComponent},
  {path:'izmena',component:IzmenaVrsteCreditaComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
