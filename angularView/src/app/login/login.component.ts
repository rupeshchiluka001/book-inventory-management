import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AccountService } from '../services/account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  constructor(private accountService: AccountService,
              private router: Router,
              private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  sub!: Subscription;
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
  });
  hide = true;

  submitForm() {
    this.sub = this.accountService.loginStore(this.loginForm.value.email, this.loginForm.value.password).subscribe({
      next: data => {
        this.dialog.open(LoginDialog, {
          data: {msg: data.msg}
        })
        this.router.navigate(['']);
      },
      error: err => {
        this.dialog.open(LoginDialog, {
          data: {msg: `Login Unsuccessful`}
        })
        this.router.navigate(['']);
      }
    });
  }

  ngOnDestroy(): void {
    if ( this.sub ) this.sub.unsubscribe();
  }
}

@Component({
  selector: 'login-dialog',
  template: `<h1 mat-dialog-title>{{ data.msg }}</h1>`
})
export class LoginDialog{
  constructor(@Inject(MAT_DIALOG_DATA) public data: {msg: string}) {}
}