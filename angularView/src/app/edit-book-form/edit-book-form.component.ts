import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Book } from '../models/book';
import { AccountService } from '../services/account.service';

@Component({
  selector: 'app-edit-book-form',
  templateUrl: './edit-book-form.component.html',
  styleUrls: ['./edit-book-form.component.css']
})
export class EditBookFormComponent implements OnInit, OnDestroy {

  constructor(private accountService: AccountService,
              private router: Router,
              private dialog: MatDialog,
              private route: ActivatedRoute) { }

  bookForm = new FormGroup({
    bookName: new FormControl('', [Validators.required]),
    bookApi: new FormControl('', [Validators.required]),
    copies: new FormControl(1, [Validators.required])
  });
  sub !: Subscription;
  book : Book = {} as Book;

  ngOnInit(): void {
    this.book._id = this.route.snapshot.paramMap.get('id') || '';
  }

  submitForm(): void {
    this.book.bookName = this.bookForm.value.bookName;
    this.book.bookApi = this.bookForm.value.bookApi;
    this.book.copies = this.bookForm.value.copies;

    this.sub = this.accountService.editBook(this.book).subscribe({
      next: data => {
        this.dialog.open(editBookDialog, {
          data: {msg: `Book successfully Edited`}
        })
        this.router.navigate(['/my-store']);
      },
      error: err => {
        this.dialog.open(editBookDialog, {
          data: {msg: err.error.msg}
        })
        this.router.navigate(['/my-store']);
      }
    });
  }

  ngOnDestroy(): void {
    if (this.sub) this.sub.unsubscribe();
  }
}

@Component({
  selector: 'book-dialog',
  template: `<h1 mat-dialog-title>{{ data.msg }}</h1>`
})
export class editBookDialog{
  constructor(@Inject(MAT_DIALOG_DATA) public data: {msg: string}) {}
}