import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RepositoryService } from 'src/app/_services/repository.service';
import { MatDialog } from '@angular/material';
import { ErrorHandlerService } from 'src/app/_services/error-handler.service';
import { Location } from '@angular/common';
import { AccountForCreation } from 'src/app/_models/accountforcreation.model';
import { SuccessDialogComponent } from 'src/app/shared/dialogs/success-dialog/success-dialog.component';
import { AccountType } from 'src/app/_models/accounttype.models';
import { OwnerList } from 'src/app/_models/ownerlist.model';


@Component({
  selector: 'app-account-create',
  templateUrl: './account-create.component.html',
  styleUrls: ['./account-create.component.css']
})
export class AccountCreateComponent implements OnInit {

  public accountForm: FormGroup;

  private dialogConfig;

  owners: OwnerList[]

  accountTypes: AccountType[] = [
    { value: 'Domestic', display: 'Domestic' },
    { value: 'Foreign', display: 'Foreign' },
    { value: 'Savings', display: 'Savings' },
  ]


  constructor(private repository: RepositoryService, private errorService: ErrorHandlerService,
              private dialog: MatDialog, private location: Location) { }

  ngOnInit() {

    this.accountForm = new FormGroup({
      accountType: new FormControl('', [Validators.required]),
      dateCreated: new FormControl(new Date()),
      ownerId: new FormControl('', [Validators.required])
    });

    this.getOwnerList();

    this.dialogConfig = {
      height: '200px',
      width: '400px',
      disableClose: true,
      data: { }
    }
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

  public createAccount = (accountFormValue) => {
    
    if(this.accountForm.valid) {
      this.executeAccountCreation(accountFormValue);
    }else {
      console.log(`An Issue occured!`);
    }
  }
 

  private executeAccountCreation(accountFormValue) {
    let account: AccountForCreation = {
      accountType: accountFormValue.accountType,
      dateCreated: accountFormValue.dateCreated,
      ownerId: accountFormValue.ownerId,
    }

    let apiUrl = `api/account`;
    this.repository.create(apiUrl, account)
      .subscribe(res => {
        let dialogRef = this.dialog.open(SuccessDialogComponent, this.dialogConfig);

        dialogRef.afterClosed()
          .subscribe(res => {
            this.location.back();
          });
      },
      (error) => {
        this.errorService.dialogConfig = { ...this.dialogConfig }
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

  public hasError = (controlName: string, errorName: string) => {
    return this.accountForm.controls[controlName].hasError(errorName);
  }

  onCancel() {
    this.location.back();
  }

}
