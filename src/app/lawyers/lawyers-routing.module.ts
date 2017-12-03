import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LawyersComponent } from './lawyers.component';
import { LawyerDetailsComponent } from './details/lawyer-details.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: '', component: LawyersComponent },
      { path: ':lawyerId', component: LawyerDetailsComponent }
    ])
  ],
  exports: [RouterModule]
})
export class LawyersRoutingModule {
}
