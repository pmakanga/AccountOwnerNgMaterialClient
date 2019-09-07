import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { RepositoryService } from 'src/app/_services/repository.service';
import { ErrorHandlerService } from 'src/app/_services/error-handler.service';
import { Router } from '@angular/router';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { Account } from 'src/app/_models/account.model';

@Component({
  selector: 'app-account-list',
  templateUrl: './account-list.component.html',
  styleUrls: ['./account-list.component.css']
})
export class AccountListComponent implements OnInit, AfterViewInit {

  public displayedColumns = ['account', 'dateCreated', 'owner', 'details', 'update', 'delete'];

  public dataSource = new MatTableDataSource<Account>()


  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator

  constructor(private repository: RepositoryService, private errorService: ErrorHandlerService,
              private router: Router) { }

  ngOnInit() {
    this.getAllAccounts();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  getAllAccounts() {
    this.repository.getData('api/account/owner')
      .subscribe(res => {
        this.dataSource.data = res as Account[];
        console.log(this.dataSource);
      },
      error => {
        this.errorService.handleError(error)
      });
  }

  public redirectToDetails = (id: string) => {
    let url: string = `/account/details/${id}`;
    this.router.navigate([url]);
  }

  public redirectToUpdate = (id: string) => {
    let url: string = `/account/update/${id}`;
    this.router.navigate([url]);
  }

 public redirectToDelete = (id: string) => {
    let url: string = `/account/delete/${id}`;
    this.router.navigate([url]);
  }

  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }


}
