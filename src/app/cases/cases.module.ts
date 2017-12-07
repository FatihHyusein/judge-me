import { NgModule } from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';

import { CasesComponent } from './cases.component';
import { CasesRoutingModule } from './cases-routing.module';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    CasesComponent
  ],
  imports: [
    CasesRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [CasesComponent]
})
export class CasesModule {
}
