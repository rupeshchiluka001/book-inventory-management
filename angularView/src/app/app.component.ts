import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AccountService } from './services/account.service';
import { CookieService } from './services/cookie.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {

  constructor(private cookieService: CookieService,
              private accountService: AccountService,
              private dialog: MatDialog,
              private router: Router) {}

  id = '';
  sub !: Subscription;

  ngOnInit(): void {
    this.id = this.cookieService.getId();
    console.log(this.id);
  }

  logout(): void {
    this.accountService.logoutStore().subscribe({
      next: () => {
        this.router.navigate(['']);
      },
      error: err => {
        this.dialog.open(logoutDialog, {
          data: {msg: err.error.msg}
        });
        this.router.navigate(['']);
      }
    });
  }

  ngOnDestroy(): void {
    if (this.sub) this.sub.unsubscribe();
  }
}

@Component({
  selector: 'logout-dialog',
  template: `<h1 mat-dialog-title>{{ data.msg }}</h1>`
})
export class logoutDialog{
  constructor(@Inject(MAT_DIALOG_DATA) public data: {msg: string}) {}
}
