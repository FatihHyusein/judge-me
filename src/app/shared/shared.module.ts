import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import {
  IgxAvatarModule,
  IgxButtonModule,
  IgxCardModule,
  IgxDialogModule,
  IgxGridModule,
  IgxIconModule,
  IgxIcon,
  IgxInput,
  IgxNavbarModule
} from 'igniteui-js-blocks/main';

const IgxModules = [IgxGridModule, IgxNavbarModule, IgxDialogModule,
  IgxButtonModule, IgxCardModule, IgxAvatarModule, IgxInput, IgxIconModule];

@NgModule({
  imports: [CommonModule, ...IgxModules],
  declarations: [],
  exports: [CommonModule, FormsModule, ...IgxModules]
})
export class SharedModule {
}
