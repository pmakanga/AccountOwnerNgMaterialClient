import { Component, OnInit } from '@angular/core';
import { Owner } from 'src/app/_models/owner.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RepositoryService } from 'src/app/_services/repository.service';
import { ErrorHandlerService } from 'src/app/_services/error-handler.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { MatDialog } from '@angular/material';
import { SuccessDialogComponent } from 'src/app/shared/dialogs/success-dialog/success-dialog.component';

@Component({
  selector: 'app-owner-update',
  templateUrl: './owner-update.component.html',
  styleUrls: ['./owner-update.component.css']
})
export class OwnerUpdateComponent implements OnInit {

  public errorMessage: string = '';
  public owner: Owner;
  public ownerForm: FormGroup;
  private dialogConfig;

  constructor(private repository: RepositoryService, private errorHandler: ErrorHandlerService,
              private activeRoute: ActivatedRoute, private router: Router,
              private location: Location, private dialog: MatDialog) { }

  ngOnInit() {
    this.ownerForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.maxLength(60)]),
      dateOfBirth: new FormControl(new Date()),
      address: new FormControl('', [Validators.required, Validators.maxLength(100)])
    })

    this.getOwnerById();

    this.dialogConfig = {
      height: '200px',
      width: '400px',
      disableClose: true,
      data: { }
    }
  }

  private getOwnerById() {
    let Id: string = this.activeRoute.snapshot.params['id'];

    let apiUrl: string = `api/owner/${Id}`;

    this.repository.getData(apiUrl)
    .subscribe(res => {
      this.owner = res as Owner;
      this.ownerForm.patchValue(this.owner);
    },
    (error) => {
      this.errorHandler.handleError(error);
      this.errorMessage = this.errorHandler.errorMessage;
    })
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.ownerForm.controls[controlName].hasError(errorName);
  }

  public onCancel = () => {
    this.location.back();
  }

  public updateOwner(ownerFormValue) {
    if (this.ownerForm.valid) {
      this.executeOwnerUpdate(ownerFormValue)
    }
  }
  private executeOwnerUpdate(ownerFormValue) {
    this.owner.name = ownerFormValue.name;
    this.owner.dateOfBirth = ownerFormValue.dateOfBirth;
    this.owner.address = ownerFormValue.address;

    let apiUrl = `api/owner/${this.owner.id}`;
    this.repository.update(apiUrl, this.owner)
    .subscribe(res => {
      // message goes here
      let dialogRef = this.dialog.open(SuccessDialogComponent, this.dialogConfig);

      dialogRef.afterClosed()
      .subscribe(result => {
        this.location.back();
      });
    },
    (error) => {
      this.errorHandler.dialogConfig = { ...this.dialogConfig }
      this.location.back();
    });
  }



}
