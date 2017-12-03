import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularFireModule } from 'angularfire2';
import { environment } from '../../environments/environment';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { LoginComponent } from './auth/login.component';
import { SharedModule } from '../shared/shared.module';
import { AngularFirestoreModule } from 'angularfire2/firestore';

@NgModule({
  imports: [CommonModule, SharedModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule
  ],
  declarations: [LoginComponent],
  exports: [LoginComponent],
  providers: []
})
export class CoreModule {
}
