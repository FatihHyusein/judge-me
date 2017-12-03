import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

import { ChartsModule } from 'ng2-charts';
import { LawyersComponent } from './lawyers.component';
import { LawyersRoutingModule } from './lawyers-routing.module';
import { LawyerDetailsComponent } from './details/lawyer-details.component';


@NgModule({
  declarations: [
    LawyersComponent, LawyerDetailsComponent
  ],
  imports: [
    LawyersRoutingModule,
    SharedModule,
    ChartsModule
  ],
  providers: [],
  bootstrap: [LawyersComponent]
})
export class LawyersModule { }
