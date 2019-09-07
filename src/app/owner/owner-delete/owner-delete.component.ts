import { Component, OnInit } from '@angular/core';
import { Owner } from 'src/app/_models/owner.model';
import { FormGroup, FormControl } from '@angular/forms';
import { RepositoryService } from 'src/app/_services/repository.service';
import { ErrorHandlerService } from 'src/app/_services/error-handler.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { MatDialog } from '@angular/material';
import { SuccessDialogComponent } from 'src/app/shared/dialogs/success-dialog/success-dialog.component';

@Component({
  selector: 'app-owner-delete',
  templateUrl: './owner-delete.component.html',
  styleUrls: ['./owner-delete.component.css']
})
export class OwnerDeleteComponent implements OnInit {

  errorMessage: string = '';
  owner: Owner;
  dialogConfig;

  constructor(private repository: RepositoryService, private errorHandler: ErrorHandlerService,
              private activeRoute: ActivatedRoute, private router: Router,
              private location: Location, private dialog: MatDialog) { }

  ngOnInit() {
    this.getOwnerById();

    this.dialogConfig = {
      height: '200px',
      width: '400px',
      disableClose: true,
      data: { }
    }
    
  }

  getOwnerById() {
    let Id: string = this.activeRoute.snapshot.params['id'];
    let apiUrl: string = `api/owner/${Id}`;

    this.repository.getData(apiUrl)
      .subscribe(res => {
        this.owner = res as Owner;
        console.log(this.owner.address)
      },
      (error) => {
        this.errorHandler.handleError(error);
        this.errorMessage = this.errorHandler.errorMessage;
      })
  }

  onCancel = () => {
    this.location.back();
  }
  
  deleteOwner() {
    let apiUrl: string = `api/owner/${this.owner.id}`;
    this.repository.delete(apiUrl)
      .subscribe(res => {
        //meesege goes here
        let dialogRef = this.dialog.open(SuccessDialogComponent, this.dialogConfig);

        dialogRef.afterClosed()
        .subscribe(result => {
          this.location.back();
        });
      },
      error => {
        this.errorHandler.handleError(error);
        this.errorMessage = this.errorHandler.errorMessage;
      });
  }

  
}
