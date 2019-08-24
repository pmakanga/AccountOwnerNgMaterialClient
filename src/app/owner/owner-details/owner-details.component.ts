import { Component, OnInit } from '@angular/core';
import { Owner } from 'src/app/_models/owner.model';
import { RepositoryService } from 'src/app/_services/repository.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ErrorHandlerService } from 'src/app/_services/error-handler.service';

@Component({
  selector: 'app-owner-details',
  templateUrl: './owner-details.component.html',
  styleUrls: ['./owner-details.component.css']
})
export class OwnerDetailsComponent implements OnInit {

  public owner: Owner;
  public showAccounts;

  constructor(private repository: RepositoryService, private router: Router,
              private activeRoute: ActivatedRoute, private errorHandler: ErrorHandlerService) { }

  ngOnInit() {
    this.getOwnersDetails();
  }

  private getOwnersDetails = () => {
    let id: string = this.activeRoute.snapshot.params['id'];
    let apiUrl: string = `api/owner/${id}/account`;

    this.repository.getData(apiUrl)
    .subscribe(res => {
      this.owner = res as Owner;
    },
    (error) => {
      this.errorHandler.handleError(error);
    }
    )
  }

}
