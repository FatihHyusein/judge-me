import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forRoot([
      {
        path: '',
        children: [
          {
            path: '',
            loadChildren: 'app/cases/cases.module#CasesModule'
          },
          {
            path: 'lawyers',
            loadChildren: 'app/lawyers/lawyers.module#LawyersModule'
          }
        ]
      }
    ])
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
