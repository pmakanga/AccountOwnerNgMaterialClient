import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RepositoryService } from 'src/app/_services/repository.service';
import { ErrorHandlerService } from 'src/app/_services/error-handler.service';
import { Account } from 'src/app/_models/account.model';
import { OwnerList } from 'src/app/_models/ownerlist.model';
import { Owner } from 'src/app/_models/owner.model';

@Component({
  selector: 'app-account-details',
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.css']
})
export class AccountDetailsComponent implements OnInit {

  constructor(private activeRoute: ActivatedRoute, private repository: RepositoryService,
              private router: Router, private errorHandler: ErrorHandlerService) { }

  account: Account;
  owner: Owner;

  ngOnInit() {
    this.getAccountsDetails();
  }

  private getAccountsDetails = () => {
    let id: string = this.activeRoute.snapshot.params['id'];
    let aapiUrl: string = `api/account/${id}`;


    this.repository.getData(aapiUrl)
      .subscribe(res => {
        this.account = res as Account
        //console.log(`Owner Id is - ${this.account.ownerId}`);
      },
        (error) => {
          this.errorHandler.handleError(error);
      })


    let oapiUrl: string = `api/owner/${this.account.ownerId}`;
    console.log(oapiUrl);
    
    this.repository.getData(oapiUrl)
      .subscribe(res => {
        this.owner = res as Owner
        console.log(`Owner Name ${this.owner.name}`);
      },
        error => {
          this.errorHandler.handleError(error);
      });
  }

}
