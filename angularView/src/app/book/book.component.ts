import { Component, Inject, Input, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Book } from '../models/book';
import { AccountService } from '../services/account.service';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit, OnDestroy {

  constructor(private accountService: AccountService,
              private router: Router,
              private dialog: MatDialog) { }

  @Input() book !: Book;
  inStock = false;
  deleteSub!: Subscription;

  ngOnInit(): void {
    this.inStock = this.book.copies > 0 ? true : false;
  }

  deleteBook(): void {
    this.deleteSub = this.accountService.deleteBook(this.book._id).subscribe({
      next: data => {
        this.router.navigate(['/my-store']);
      },
      error: err => {
        this.dialog.open(BookDialog, {
          data: {msg: err.error.msg}
        })
        this.router.navigate(['/my-store']);
      }
    });
  }

  ngOnDestroy(): void {
    if ( this.deleteSub ) this.deleteSub.unsubscribe();
  }
}

@Component({
  selector: 'book-dialog',
  template: `<h1 mat-dialog-title>{{ data.msg }}</h1>`
})
export class BookDialog{
  constructor(@Inject(MAT_DIALOG_DATA) public data: { msg: string }) {}
}