import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Store } from '../models/store';
import { AccountService } from '../services/account.service';
import { MatDialog } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit, OnDestroy {

  constructor(private accountService: AccountService,
              private router: Router,
              private dialog: MatDialog) { }

  sub!: Subscription;
  signupForm = new FormGroup({
    ownerName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    storeName: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required]),
  })
  hide = true;

  ngOnInit(): void {
  }

  submitForm() {
    this.sub = this.accountService.registerStore(this.signupForm.value as Store).subscribe({
      next: data => {
        this.dialog.open(SignupDialog, {
          data: {msg: data.msg}
        })
        this.router.navigate(['']);
      },
      error: err => {
        this.dialog.open(SignupDialog, {
          data: {msg: err.msg}
        })
        this.router.navigate(['']);
      }
    })
  }

  ngOnDestroy(): void {
    if ( this.sub ) this.sub.unsubscribe();
  }
}

@Component({
  selector: 'signup-dialog',
  template: `<h1 mat-dialog-title>{{ data.msg }}</h1>`
})
export class SignupDialog{
  constructor(@Inject(MAT_DIALOG_DATA) public data: {msg: string}) {}
}