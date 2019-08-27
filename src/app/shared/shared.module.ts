import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material.module';
import { FlexLayoutModule } from '@angular/flex-layout';

import { SharedComponent } from './shared.component';
import { SuccessDialogComponent } from './dialogs/success-dialog/success-dialog.component';
import { ErrorDialogComponent } from './dialogs/error-dialog/error-dialog.component';


@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule
  ],
  entryComponents: [
    SuccessDialogComponent,
    ErrorDialogComponent
  ],
  declarations: [
    SharedComponent,
    SuccessDialogComponent,
    ErrorDialogComponent
  ]
})
export class SharedModule { }
