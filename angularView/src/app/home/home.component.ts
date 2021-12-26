import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { Subscription } from 'rxjs';
import { StoreQuery } from '../models/store-query';
import { AccountService } from '../services/account.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  constructor(private accountService: AccountService,
              private dialog: MatDialog) { }
  value = '';
  sub !: Subscription;
  stores : StoreQuery = {} as StoreQuery;

  ngOnInit(): void {
    this.stores.pages = 100;
    this.search(1);
  }

  search(pageNum: number): void {
    this.sub = this.accountService.getStores(this.value, pageNum).subscribe({
      next: data => {
        this.stores = data;
      },
      error: err => {
        this.dialog.open(SearchDialog, {
          data: {msg: err.msg}
        })
      }
    });
  }

  onPageChange(event: PageEvent) {
    this.search(event.pageIndex+1);
  }

  ngOnDestroy(): void {
    if (this.sub) this.sub.unsubscribe();
  }

}

@Component({
  selector: 'search-dialog',
  template: `<h1 mat-dialog-title>{{ data.msg }}</h1>`
})
export class SearchDialog{
  constructor(@Inject(MAT_DIALOG_DATA) public data: {msg: string}) {}
}