import { Component, OnInit } from '@angular/core';
import { RepositoryService } from 'src/app/_services/repository.service';
import { ErrorHandlerService } from 'src/app/_services/error-handler.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Account } from 'src/app/_models/account.model';
import { OwnerList } from 'src/app/_models/ownerlist.model';
import { AccountType } from 'src/app/_models/accounttype.models';
import { SuccessDialogComponent } from 'src/app/shared/dialogs/success-dialog/success-dialog.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-account-update',
  templateUrl: './account-update.component.html',
  styleUrls: ['./account-update.component.css']
})
export class AccountUpdateComponent implements OnInit {
  public errorMessage: string = '';
  public account: Account;
  public accountForm: FormGroup;
  private dialogConfig;

  owners: OwnerList[]

  accountTypes: AccountType[] = [
    { value: 'Domestic', display: 'Domestic' },
    { value: 'Foreign', display: 'Foreign' },
    { value: 'Savings', display: 'Savings' },
  ]


  constructor(private repository: RepositoryService, private errorHandler: ErrorHandlerService,
              private activeRoute: ActivatedRoute, private location: Location,
              private dialog: MatDialog) { }

  ngOnInit() {
    this.accountForm = new FormGroup({
      accountType: new FormControl('', [Validators.required]),
      dateCreated: new FormControl(new Date()),
      // owner: new FormControl('', [Validators.required])
      ownerId: new FormControl('', [Validators.required])
    })

    this.getAccountById();

    this.getOwnerList();

    this.dialogConfig = {
      height: '200px',
      width: '400px',
      disableClose: true,
      data: { }
    }
  }

  getAccountById() {
    let Id: string = this.activeRoute.snapshot.params['id'];

    let apiUrl: string = `api/account/${Id}`;

    this.repository.getData(apiUrl)
      .subscribe(res => {
        this.account = res as Account;
        this.accountForm.patchValue(this.account);
      },
      (error) => {
        this.errorHandler.handleError(error);
        this.errorMessage = this.errorHandler.errorMessage;
      })
  }

  getOwnerList() {
    let apiUrl: string = `api/owner/list`
    this.repository.getData(apiUrl)
      .subscribe(res => {
        this.owners = res as OwnerList[];
        console.log(this.owners);
        console.log(this.accountTypes);
      
      })

  }

  public hasError = (controlName: string, errorName: string) => {
    return this.accountForm.controls[controlName].hasError(errorName);
  }

  public onCancel = () => {
    this.location.back();
  }

  updateAccount(accountFormValue) {
    if(this.accountForm.valid) {
      this.executeAccountUpdate(accountFormValue);
    }
  }

  private executeAccountUpdate(accountFormValue) {
    this.account.accountType = accountFormValue.accountType;
    this.account.dateCreated = accountFormValue.dateCreated;
    this.account.ownerId = accountFormValue.ownerId

    let apiUrl = `api/account/${this.account.id}`
    this.repository.update(apiUrl, this.account)
      .subscribe(res => {
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


  get accountType() {
    return this.accountForm.get('accountType');
    
  }

  changeAccount(e) {
    this.accountType.setValue(e.target.value, {
      onlySelf: true
    })
  }
  
  get ownerId() {
    return this.accountForm.get('ownerId');
  }

  changeOwner(e) {
    this.ownerId.setValue(e.target.value, {
      onlySelf: true
    })
  }

}
