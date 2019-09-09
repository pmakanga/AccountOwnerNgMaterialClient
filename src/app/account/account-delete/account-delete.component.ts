import { Component, OnInit } from '@angular/core';
import { RepositoryService } from 'src/app/_services/repository.service';
import { ErrorHandlerService } from 'src/app/_services/error-handler.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Account } from 'src/app/_models/account.model';
import { Location } from '@angular/common';
import { MatDialog } from '@angular/material';
import { SuccessDialogComponent } from 'src/app/shared/dialogs/success-dialog/success-dialog.component';
import { Owner } from 'src/app/_models/owner.model';

@Component({
  selector: 'app-account-delete',
  templateUrl: './account-delete.component.html',
  styleUrls: ['./account-delete.component.css']
})
export class AccountDeleteComponent implements OnInit {

  errorMessage: string = '';
  account: Account;
  owner: Owner;
  dialogConfig;

  constructor(private repository: RepositoryService, private errorHandler: ErrorHandlerService,
              private activeRoute: ActivatedRoute, private router: Router,
              private location: Location, private dialog: MatDialog) { }

  ngOnInit() {

    this.getAccountById();

    this.dialogConfig = {
      height: '200px',
      width: '400px',
      disableClose: true,
      data: { }
    }
  }

  getAccountById = () => {
    let Id: string = this.activeRoute.snapshot.params['id'];
    let apiUrl = `api/account/${Id}`;

    this.repository.getData(apiUrl)
      .subscribe(res => {
        this.account = res as Account;
        let oApiUrl: string = `api/owner/${this.account.ownerId}`;
        this.repository.getData(oApiUrl)
          .subscribe(res => {
            this.repository.getData(oApiUrl)
            this.owner = res as Owner
          })

      },
      (error) => {
        this.errorHandler.handleError(error)
        this.errorMessage = this.errorHandler.errorMessage;
      }
      )
  }

  onCancel = () => {
    this.location.back();
  }

  deleteAccount() {
    let apiUrl = `api/account/${this.account.id}`;

    console.log(`this is the Api url:- ${apiUrl}`);

    this.repository.delete(apiUrl)
      .subscribe(res => {
        let dialogRef = this.dialog.open(SuccessDialogComponent, this.dialogConfig);

        dialogRef.afterClosed()
        .subscribe(result => {
          this.location.back();
        });
      },
      (error) => {
        this.errorHandler.handleError(error);
        this.errorMessage = this.errorHandler.errorMessage;
      });
  }

}
