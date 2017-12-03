import { NgModule } from '@angular/core';


import { CasesComponent } from './cases.component';
import { CasesRoutingModule } from './cases-routing.module';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    CasesComponent
  ],
  imports: [
    CasesRoutingModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [CasesComponent]
})
export class CasesModule {
}
