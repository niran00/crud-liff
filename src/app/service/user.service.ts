import { Injectable } from '@angular/core';
import { User } from './User';
import { catchError, map } from 'rxjs/operators';
import { Observable, Subject, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
 

@Injectable({
  providedIn: 'root'
})

export class UserService {


  // Node/Express API
  REST_API: string = 'https://afternoon-brook-66471.herokuapp.com/api';
 
  // Http Header
  // httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
  httpHeaders = new HttpHeaders({ 'Access-Control-Allow-Origin': '*/*', 'content-type': 'application/json; charset=utf-8' }  )
  http: any;
 
  constructor(private httpClient: HttpClient, private router: Router) {}

  private token : string ;
  private isAuthenticated = false;
  private tokenUserId : string; 
  private authStatusListener = new Subject<boolean>(); 
  
  getToken(){
    return this.token;
  }

  getIsAuth(){
    return this.isAuthenticated;
  }

  getAuthStatusListener(){
    return this.authStatusListener.asObservable();
  }

  getTokenUserId(){
    return this.tokenUserId;
  }

  //Login
  login(userId: any, reRoute: any) {
    const authData : any = {userId: userId}
    let API_URL = `${this.REST_API}/login`;
    return this.httpClient.post<{token : string , tokenUserId: string }>(API_URL , authData)
    .subscribe(response => {
      console.log(response); 
      const token = response.token ;
      this.token = token ;
      if(token){
        this.isAuthenticated = true;
        this.authStatusListener.next(true);
        this.tokenUserId = response.tokenUserId;
      }
      this.router.navigate(['/' + reRoute]);
    })
  }

  //Logout
  logout(){
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    this.router.navigate(['/login']);
    this.tokenUserId = null;
  }


  // Add
  AddUser(data: User): Observable<any> {
    let API_URL = `${this.REST_API}/add-user`;
    return this.httpClient.post(API_URL, data)
      .pipe(
        catchError(this.handleError)
      )
  }
 
  // Get all objects
  GetUsers() {
    return this.httpClient.get(`${this.REST_API}/user`);
  }
 
  // Get single object
  GetUser(id:any): Observable<any> {
    let API_URL = `${this.REST_API}/read-user/${id}`;
    return this.httpClient.get(API_URL, { headers: this.httpHeaders })
      .pipe(map((res: any) => {
          return res || {}
        }),
        catchError(this.handleError)
      )
  }
 
  // Update
  updateUser(id:any, data:any): Observable<any> {
    let API_URL = `${this.REST_API}/update-user/${id}`;
    return this.httpClient.put(API_URL, data, { headers: this.httpHeaders })
      .pipe(
        catchError(this.handleError)
      )
  }
 
  // Delete
  deleteUser(id:any): Observable<any> {
    let API_URL = `${this.REST_API}/delete-user/${id}`;
    return this.httpClient.delete(API_URL, { headers: this.httpHeaders}).pipe(
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
