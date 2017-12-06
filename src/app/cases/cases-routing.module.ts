import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CasesComponent } from './cases.component';
import {CasesService} from './cases.service';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: '', component: CasesComponent }
    ])
  ],
  exports: [RouterModule],
  providers: [CasesService]
})
export class CasesRoutingModule {
}
