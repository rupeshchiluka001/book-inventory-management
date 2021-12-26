import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Book } from '../models/book';
import { Store } from '../models/store';
import { AccountService } from '../services/account.service';

@Component({
  selector: 'app-store-read-only',
  templateUrl: './store-read-only.component.html',
  styleUrls: ['./store-read-only.component.css']
})
export class StoreReadOnlyComponent implements OnInit, OnDestroy {

  constructor(private accountService: AccountService,
              private router: Router,
              private dialog: MatDialog,
              private route: ActivatedRoute) { }

  store: Store = {} as Store;
  books: Book[] = [];
  sub !: Subscription;
  booksSub !: Subscription;

  ngOnInit(): void {
    this.store._id = this.route.snapshot.paramMap.get('id') || '';

    this.sub = this.accountService.getStoreDetails(this.store._id).subscribe({
      next: data => {
        this.store = data;
      },
      error: err => {
        this.dialog.open(storeDialog, {
          data: {msg: err.error.msg}
        })
        this.router.navigate(['']);
      }
    });

    this.booksSub = this.accountService.getBooks(this.store._id).subscribe({
      next: data => {
        this.books = data.books;
      },
      error: err => {
        this.dialog.open(booksDialog, {
          data: {msg: err.error.msg}
        })
        this.router.navigate(['']);
      }
    });
  }

  ngOnDestroy(): void {
    if (this.sub) this.sub.unsubscribe();
    if (this.booksSub) this.booksSub.unsubscribe();
  }
}

@Component({
  selector: 'store-dialog',
  template: `<h1 mat-dialog-title>{{ data.msg }}</h1>`
})
export class storeDialog{
  constructor(@Inject(MAT_DIALOG_DATA) public data: {msg: string}) {}
}

@Component({
  selector: 'books-dialog',
  template: `<h1 mat-dialog-title>{{ data.msg }}</h1>`
})
export class booksDialog{
  constructor(@Inject(MAT_DIALOG_DATA) public data: {msg: string}) {}
}
