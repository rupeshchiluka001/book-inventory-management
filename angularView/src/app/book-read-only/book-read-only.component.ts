import { Component, Input, OnInit } from '@angular/core';
import { Book } from '../models/book';

@Component({
  selector: 'app-book-read-only',
  templateUrl: './book-read-only.component.html',
  styleUrls: ['./book-read-only.component.css']
})
export class BookReadOnlyComponent implements OnInit {

  constructor() { }
  @Input() book !: Book;
  inStock = false;

  ngOnInit(): void {
    this.inStock = this.book.copies > 0 ? true : false;
  }

}
