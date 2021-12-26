import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Book } from '../models/book';
import { BookQuery } from '../models/book-query';
import { Store } from '../models/store';
import { StoreQuery } from '../models/store-query';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/x-www-form-urlencoded',
    })
};

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http: HttpClient) { }

  private apiUrl = 'http://localhost';
  private port = 3000;
  private getStoresUrl = `${this.apiUrl}:${this.port}/api/stores`;
  private getStoreDetailsUrl = `${this.apiUrl}:${this.port}/api/store-details`;
  private signupUrl = `${this.apiUrl}:${this.port}/api/register`;
  private loginUrl = `${this.apiUrl}:${this.port}/api/login`;
  private logoutUrl = `${this.apiUrl}:${this.port}/api/logout`;
  private addBookUrl = `${this.apiUrl}:${this.port}/api/add-book`;
  private editBookUrl = `${this.apiUrl}:${this.port}/api/edit-book`;
  private deleteBookUrl = `${this.apiUrl}:${this.port}/api/delete-book`;
  private getBooksUrl = `${this.apiUrl}:${this.port}/api/get-books`;

  getStores(value: string, page: number): Observable<StoreQuery> {
    return this.http.get<StoreQuery>(this.getStoresUrl, {params: {value, page}});
  }

  getStoreDetails(id: string): Observable<Store> {
    return this.http.post<Store>(this.getStoreDetailsUrl, id);
  }

  addBook(bookData: Book): Observable<any> {
    return this.http.post(this.addBookUrl, bookData);
  }

  editBook(bookData: Book): Observable<any> {
    return this.http.post(this.editBookUrl, bookData);
  }

  deleteBook(bookId: string): Observable<any> {
    return this.http.post(this.deleteBookUrl, {bookId: bookId});
  }

  getBooks(storeId: string): Observable<BookQuery> {
    return this.http.get<BookQuery>(this.getBooksUrl, {params: {storeId}});
  }

  registerStore(storeData: Store): Observable<any> {
    return this.http.post<any>(this.signupUrl, storeData);
  }

  loginStore(email: string, password: string): Observable<any> {
    return this.http.post(this.loginUrl, {email, password});
  }

  logoutStore(): Observable<any> {
    return this.http.get(this.logoutUrl);
  }
}
