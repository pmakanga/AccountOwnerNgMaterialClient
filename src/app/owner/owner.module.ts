import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material.module';

import { OwnerComponent } from './owner.component';
import { Routes, RouterModule } from '@angular/router';
import { OwnerListComponent } from './owner-list/owner-list.component';
import { FlexLayoutModule } from '@angular/flex-layout';



const routes: Routes = [
  { path: 'owners', component: OwnerListComponent }
]

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ],
  declarations: [
    OwnerComponent,
    OwnerListComponent
  ]
})
export class OwnerModule { }
