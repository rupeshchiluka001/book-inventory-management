import { Component, Input, OnInit } from '@angular/core';
import { Store } from '../models/store';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css']
})
export class StoreComponent implements OnInit {

  constructor() { }
  @Input() store!: Store;

  ngOnInit(): void {
  }

  openBookStore() {
    //
  }

}
