import { Injectable } from '@angular/core';
import { Book } from './Book';
import { catchError, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})

export class CrudService {

  // Node/Express API
  REST_API: string = 'https://afternoon-brook-66471.herokuapp.com/api';

  // Http Header
  // httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
  httpHeaders = new HttpHeaders({ 'Access-Control-Allow-Origin': '*/*', 'content-type': 'application/json; charset=utf-8' })

  constructor(private httpClient: HttpClient) { }

  // Add
  AddBook(name: string, price: string, description: string, details1: string, details2: string, details3: string, image: File): Observable<any> {
    const postData = new FormData();
    postData.append("name", name);
    postData.append("price", price);
    postData.append("description", description);

    postData.append("details1", details1);
    postData.append("details2", details2);
    postData.append("details3", details3);

    postData.append("image", image, name);
    console.log("this nthe file" + image.name)
    let API_URL = `${this.REST_API}/add-book`;
    return this.httpClient.post(API_URL, postData)
      .pipe(
        catchError(this.handleError)
      )
  }

  // Get all objects
  GetBooks() {
    return this.httpClient.get(`${this.REST_API}`);
  }

  // Get single object
  GetBook(id: any): Observable<any> {
    let API_URL = `${this.REST_API}/read-book/${id}`;
    return this.httpClient.get(API_URL, { headers: this.httpHeaders })
      .pipe(map((res: any) => {
        return res || {}
      }),
        catchError(this.handleError)
      )
  }

  // Update
  updateBook(id: any, data: any): Observable<any> {
    let API_URL = `${this.REST_API}/update-book/${id}`;
    return this.httpClient.put(API_URL, data, { headers: this.httpHeaders })
      .pipe(
        catchError(this.handleError)
      )
  }

  // Delete
  deleteBook(id: any): Observable<any> {
    let API_URL = `${this.REST_API}/delete-book/${id}`;
    return this.httpClient.delete(API_URL, { headers: this.httpHeaders }).pipe(
      catchError(this.handleError)
    )
  }


  // Error 
  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Handle client error
      errorMessage = error.error.message;
    } else {
      // Handle server error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }

}