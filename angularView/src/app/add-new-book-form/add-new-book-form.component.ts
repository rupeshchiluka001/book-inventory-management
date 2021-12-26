import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LoginDialog } from '../login/login.component';
import { Book } from '../models/book';
import { AccountService } from '../services/account.service';

@Component({
  selector: 'app-add-new-book-form',
  templateUrl: './add-new-book-form.component.html',
  styleUrls: ['./add-new-book-form.component.css']
})
export class AddNewBookFormComponent implements OnInit, OnDestroy {

  constructor(private accountService: AccountService,
    private router: Router,
    private dialog: MatDialog) { }

  bookForm = new FormGroup({
    bookName: new FormControl('', [Validators.required]),
    bookApi: new FormControl('', [Validators.required]),
    copies: new FormControl(1, [Validators.required])
  });
  sub !: Subscription;

  ngOnInit(): void {
  }

  submitForm(): void {
    this.sub = this.accountService.addBook(this.bookForm.value as Book).subscribe({
      next: data => {
        this.dialog.open(bookDialog, {
          data: {msg: `Book successfully added`}
        })
        this.router.navigate(['/my-store']);
      },
      error: err => {
        this.dialog.open(bookDialog, {
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
export class bookDialog{
  constructor(@Inject(MAT_DIALOG_DATA) public data: {msg: string}) {}
}