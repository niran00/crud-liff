import { Injectable } from '@angular/core'
import { OtpPin, User } from './User'
import { catchError, map } from 'rxjs/operators'
import { lastValueFrom, Observable, Subject, throwError } from 'rxjs'
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http'
import { Router } from '@angular/router'
import liff from '@line/liff/dist/lib'

@Injectable({
  providedIn: 'root',
})
export class UserService {
  // Node/Express API
  REST_API: string = 'https://afternoon-brook-66471.herokuapp.com/api'

  // Http Header
  // httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
  httpHeaders = new HttpHeaders({
    'Access-Control-Allow-Origin': '*/*',
    'content-type': 'application/json; charset=utf-8',
  })

  constructor(private httpClient: HttpClient, private router: Router) { }

  private token: string
  private isAuthenticated = false
  private tokenUserId: string
  private authStatusListener = new Subject<boolean>()
  private otpToken: string
  private otpPin: string
  private resetotpToken: string
  private resetotpPin: string
  private tokenTimer: any

  getToken() {
    return this.token
  }

  getIsAuth() {
    return this.isAuthenticated
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable()
  }

  getTokenUserId() {
    return this.tokenUserId
  }

  getOtpToken() {
    return this.otpToken
  }

  getOtpPin() {
    return this.otpPin
  }

  resetOtpToken() {
    return this.resetotpToken
  }

  resetOtpPin() {
    return this.resetotpPin
  }

  //Login
  login(userId: any, reRoute: any) {
    const authData: any = { userId: userId }
    let API_URL = `${this.REST_API}/login`
    return this.httpClient.post<{ token: string; tokenUserId: string; expiresIn: string }>(API_URL, authData).subscribe((response) => {
      console.log(response)
      const token = response.token
      this.token = token
      if (token) {
        const expiresInDuration: any = response.expiresIn

        this.setAuthTimer(expiresInDuration);
        this.isAuthenticated = true
        this.authStatusListener.next(true);
        const now = new Date();
        const expirationDate = new Date(now.getTime() + expiresInDuration * 1000);
        console.log(expirationDate);
        this.saveAuthData(token, expirationDate)
        this.tokenUserId = response.tokenUserId
      }
      this.router.navigate(['/' + reRoute])
    })
  }

  //Logout
  logout() {
    this.token = null
    this.isAuthenticated = false
    this.authStatusListener.next(false)
    this.router.navigate(['/login'])
    this.tokenUserId = null
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    if (liff.isLoggedIn()) {
      liff.logout()
      liff.closeWindow()
    }
  }

  test() {
    console.log("test");
  }

  autoAuthUser() {
    const authInformation = this.getAuthData();
    if (!authInformation) {
      return;
    }
    const now = new Date();
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
    console.log("ts" + authInformation, expiresIn);
    if (expiresIn > 0) {
      this.token = authInformation.token;
      this.isAuthenticated = true;
      this.setAuthTimer(expiresIn / 1000);
      this.authStatusListener.next(true);
    }
  }

  private setAuthTimer(duration: number) {
    console.log("Setting timer:" + duration)
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }

  private saveAuthData(token: string, expirationDate: Date) {
    localStorage.setItem('token', token);
    localStorage.setItem('expiration', expirationDate.toISOString());
  }

  private clearAuthData() {
    localStorage.removeItem("token");
    localStorage.removeItem("expiration");
  }

  private getAuthData() {
    const token = localStorage.getItem("token");
    const expirationDate = localStorage.getItem("expiration");
    if (!token || !expirationDate) {
      return;
    } return {
      token: token,
      expirationDate: new Date(expirationDate)
    }
  }

  //OTP
  async myOtp(userPhoneNumber?: any) {
    const authData: any = { userPhoneNumber: userPhoneNumber }
    let API_URL = `${this.REST_API}/verify`

    let data = this.httpClient.post<{ otpTok: string; otpPin: string }>(API_URL, authData, { headers: this.httpHeaders })
    const otpToken = await lastValueFrom(data)
    this.otpToken = otpToken.otpTok
    this.otpPin = otpToken.otpPin
  }

  // Add
  async addUser(data: User, otp: OtpPin, token: string): Promise<Observable<any>> {
    let neededPin = otp.otpConfirm
    let neededData = [data, neededPin, token]
    let API_URL = `${this.REST_API}/add-user`
    return this.httpClient.post(API_URL, neededData, { headers: this.httpHeaders }).pipe(catchError(this.handleError))
  }

  //OTP
  // myOtp(userPhoneNumber: any) {
  //   const authData : any = {userPhoneNumber: userPhoneNumber}
  //   let API_URL = `${this.REST_API}/add-user`;
  //   return this.httpClient.post<{token : string }>(API_URL , authData)
  //   .subscribe(response => {
  //     console.log(response);
  //     const token = response.token ;
  //     this.token = token ;
  //     if(token){
  //       console.log("this what you need")
  //     }

  //   })
  // }

  // Get all objects
  GetUsers() {
    return this.httpClient.get(`${this.REST_API}/user`)
  }

  // Get single object
  GetUser(id: any): Observable<any> {
    let API_URL = `${this.REST_API}/read-user/${id}`
    return this.httpClient.get(API_URL, { headers: this.httpHeaders }).pipe(
      map((res: any) => {
        return res || {}
      }),
      catchError(this.handleError)
    )
  }

  // Update
  updateUser(id: any, data: any): Observable<any> {
    let API_URL = `${this.REST_API}/update-user/${id}`
    return this.httpClient.put(API_URL, data, { headers: this.httpHeaders }).pipe(catchError(this.handleError))
  }

  //OTP
  async newOtp(userPhoneNumber?: any) {
    const authData: any = { userPhoneNumber: userPhoneNumber }
    let API_URL = `${this.REST_API}/verify-new-number`

    let data = this.httpClient.post<{ otpTok: string; otpPin: string }>(API_URL, authData, { headers: this.httpHeaders })
    const newotpToken = await lastValueFrom(data)
    this.resetotpToken = newotpToken.otpTok
    this.resetotpPin = newotpToken.otpPin
  }

  // Add
  // async addUser(data: User, otp: OtpPin, token: string): Promise<Observable<any>> {
  //   let neededPin = otp.otpConfirm
  //   let neededData = [data, neededPin, token]
  //   let API_URL = `${this.REST_API}/add-user`
  //   return this.httpClient.post(API_URL, neededData, { headers: this.httpHeaders }).pipe(catchError(this.handleError))
  // }

  // Update
  async updateNewNumber(id: any, data: any, otp: OtpPin, token: string): Promise<Observable<any>> {
    let neededPin = otp.otpConfirm
    let neededData = [id, data, neededPin, token]
    let API_URL = `${this.REST_API}/update-new-number/${id}`
    return this.httpClient.put(API_URL, neededData, { headers: this.httpHeaders }).pipe(catchError(this.handleError))
  }

  // Delete
  deleteUser(id: any): Observable<any> {
    let API_URL = `${this.REST_API}/delete-user/${id}`
    return this.httpClient.delete(API_URL, { headers: this.httpHeaders }).pipe(catchError(this.handleError))
  }

  // Error
  handleError(error: HttpErrorResponse) {
    let errorMessage = ''
    if (error.error instanceof ErrorEvent) {
      // Handle client error
      errorMessage = error.error.message
    } else {
      // Handle server error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`
    }
    console.log(errorMessage)
    return throwError(errorMessage)
  }
}
