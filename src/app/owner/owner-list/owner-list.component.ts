import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Owner } from 'src/app/_models/owner.model';
import { MatTableDataSource, MatSort } from '@angular/material';
import { RepositoryService } from 'src/app/_services/repository.service';

@Component({
  selector: 'app-owner-list',
  templateUrl: './owner-list.component.html',
  styleUrls: ['./owner-list.component.css']
})
export class OwnerListComponent implements OnInit, AfterViewInit {

  public displayedColumns = ['name', 'dateOfBirth', 'address', 'details', 'update', 'delete'];

  public dataSource = new MatTableDataSource<Owner>()

  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private repoService: RepositoryService) { }

  ngOnInit() {
    this.getAllOwners();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

  public getAllOwners = () => {
    this.repoService.getData('api/owner')
      .subscribe(res => {
        this.dataSource.data = res as Owner[];
      })
  }

  public redirectToDetails = (id: string) => {
    
  }

  public redirectToUpdate = (id: string) => {
    
  }

  public redirectToDelete = (id: string) => {
    
  }

  public doFilter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

}
