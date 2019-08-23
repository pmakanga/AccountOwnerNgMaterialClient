import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule,
          MatSidenavModule,
          MatToolbarModule,
          MatIconModule,
          MatButtonModule,
          MatListModule,
          MatMenuModule,
          MatTableModule,
          MatSortModule,
          MatInputModule
        } from '@angular/material';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatTabsModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatListModule,
    MatMenuModule,
    MatTableModule,
    MatSortModule,
    MatInputModule
  ],
  exports: [
    MatTabsModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatListModule,
    MatMenuModule,
    MatTableModule,
    MatSortModule,
    MatInputModule
  ],
})
export class MaterialModule { }
