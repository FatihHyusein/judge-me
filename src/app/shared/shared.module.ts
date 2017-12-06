import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import {
  IgxAvatarModule,
  IgxBadgeModule,
  IgxButtonModule,
  IgxCardModule,
  IgxDialogModule,
  IgxGridModule,
  IgxIconModule,
  IgxInput,
  IgxNavbarModule,
  IgxProgressBarModule,
  IgxSnackbarModule,
  IgxToastModule,
  NavigationDrawerModule
} from 'igniteui-js-blocks/main';

const IgxModules = [IgxGridModule, IgxNavbarModule, IgxDialogModule,
  IgxButtonModule, IgxCardModule, IgxAvatarModule, IgxInput, IgxIconModule, IgxSnackbarModule,
  IgxToastModule, IgxBadgeModule, NavigationDrawerModule, IgxProgressBarModule];

@NgModule({
  imports: [CommonModule, ...IgxModules],
  declarations: [],
  exports: [CommonModule, FormsModule, ...IgxModules]
})
export class SharedModule {
}
