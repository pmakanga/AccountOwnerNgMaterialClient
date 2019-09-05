import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { RepositoryService } from 'src/app/_services/repository.service';
import { OwnerForCreation } from 'src/app/_models/OwnerForCreation.model';
import { MatDialog } from '@angular/material';
import { SuccessDialogComponent } from 'src/app/shared/dialogs/success-dialog/success-dialog.component';
import { ErrorHandlerService } from 'src/app/_services/error-handler.service';

@Component({
  selector: 'app-owner-create',
  templateUrl: './owner-create.component.html',
  styleUrls: ['./owner-create.component.css']
})
export class OwnerCreateComponent implements OnInit {

  public ownerForm: FormGroup
  private dialogConfig;

  constructor(private location: Location, private repository: RepositoryService,
              private dialog: MatDialog, private errorService: ErrorHandlerService) { }

  ngOnInit() {
    this.ownerForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.maxLength(60)]),
      dateOfBirth: new FormControl(new Date()),
      address: new FormControl('', [Validators.required, Validators.maxLength(100)])
    });

    this.dialogConfig = {
      height: '200px',
      width: '400px',
      disableClose: true,
      data: { }
    }
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.ownerForm.controls[controlName].hasError(errorName);
  }


  public createOwner = (ownerFormValue) => {
    if(this.ownerForm.valid) {
      this.executeOwnerCreation(ownerFormValue)
    }
  }

  private executeOwnerCreation = (ownerFormValue) => {
    let owner: OwnerForCreation = {
      name: ownerFormValue.name,
      dateOfBirth: ownerFormValue.dateOfBirth,
      address: ownerFormValue.address
    }

    let apiUrl = 'api/owner';
    this.repository.create(apiUrl, owner)
      .subscribe(res => {
        let dialogRef = this.dialog.open(SuccessDialogComponent, this.dialogConfig);

        // We are subscribing on the [mat-dialog-close] attribute as soon as we click on the dialog button
        dialogRef.afterClosed()
        .subscribe(result => {
          this.location.back();
        });
      },
      (error) => {
        this.errorService.dialogConfig = { ...this.dialogConfig }
        this.location.back();
      });
  }

  public onCancel = () => {
    this.location.back();
  }

}
