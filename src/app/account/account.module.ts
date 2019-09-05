import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountComponent } from './account.component';
import { Routes, RouterModule } from '@angular/router';
import { AccountListComponent } from './account-list/account-list.component';
import { AccountDetailsComponent } from './account-details/account-details.component';
import { AccountCreateComponent } from './account-create/account-create.component';
import { AccountUpdateComponent } from './account-update/account-update.component';
import { AccountDeleteComponent } from './account-delete/account-delete.component';

import { MaterialModule } from '../material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';


const routes: Routes = [
  { path: 'accounts', component: AccountListComponent },
  { path: 'details/:id', component: AccountDetailsComponent },
  { path: 'create', component: AccountCreateComponent },
  { path: 'update/:id', component: AccountUpdateComponent },
  { path: 'delete/:id', component: AccountDeleteComponent }
]



@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    SharedModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ],
  declarations: [
    AccountComponent,
    AccountListComponent,
    AccountDetailsComponent,
    AccountCreateComponent,
    AccountUpdateComponent,
    AccountDeleteComponent
  ]
})
export class AccountModule { }
