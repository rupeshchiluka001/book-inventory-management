import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Book } from '../models/book';
import { Store } from '../models/store';
import { AccountService } from '../services/account.service';
import { CookieService } from '../services/cookie.service';

@Component({
  selector: 'app-store-home',
  templateUrl: './store-home.component.html',
  styleUrls: ['./store-home.component.css']
})
export class StoreHomeComponent implements OnInit, OnDestroy {

  constructor(private cookieService: CookieService,
              private accountService: AccountService,
              private router: Router,
              private dialog: MatDialog) { }
  store: Store = {} as Store;
  id = "";
  books: Book[] = [];
  sub !: Subscription;
  booksSub !: Subscription;

  ngOnInit(): void {
    this.id = this.cookieService.getId();
    if (this.id) {
      this.sub = this.accountService.getStoreDetails(this.id).subscribe({
        next: data => {
          this.store = data;
        },
        error: err => {
          this.dialog.open(shDialog, {
            data: {msg: err.error.msg}
          })
          this.router.navigate(['']);
        }
      });

      this.booksSub = this.accountService.getBooks('').subscribe({
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
  }

  addNewForm(): void {
    this.router.navigate(['/add-book']);
  }

  ngOnDestroy(): void {
    if (this.sub) this.sub.unsubscribe();
    if (this.booksSub) this.booksSub.unsubscribe();
  }
}

@Component({
  selector: 'sh-dialog',
  template: `<h1 mat-dialog-title>{{ data.msg }}</h1>`
})
export class shDialog{
  constructor(@Inject(MAT_DIALOG_DATA) public data: {msg: string}) {}
}

@Component({
  selector: 'books-dialog',
  template: `<h1 mat-dialog-title>{{ data.msg }}</h1>`
})
export class booksDialog{
  constructor(@Inject(MAT_DIALOG_DATA) public data: {msg: string}) {}
}
