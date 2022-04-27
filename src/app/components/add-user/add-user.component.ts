import { Component, ElementRef, ViewChild, OnInit, NgZone } from '@angular/core'
import { Router } from '@angular/router'
import { FormGroup, FormBuilder } from '@angular/forms'
import { Observable } from 'rxjs'
import { UserService } from 'src/app/service/user.service'

import liff from '@line/liff'
import * as liffApi from '@liff/is-api-available'

type UnPromise<T> = T extends Promise<infer X> ? X : T

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss'],
})
export class AddUserComponent implements OnInit {
  isLoading = false;
  os: ReturnType<typeof liff.getOS>
  profile: UnPromise<ReturnType<typeof liff.getProfile>>

  @ViewChild('userId') userId: ElementRef | any
  @ViewChild('otpform') otpform: ElementRef | any
  @ViewChild('phoneError') phoneError: ElementRef | any
  @ViewChild('signupForm') signupForm: ElementRef | any

  async main() {
    liff.ready.then(() => {
      if (liff.getOS() === 'android') {
      }
      if (liff.isInClient()) {
        this.getUserProfile()
      }
    })
    await liff.init({ liffId: '1656955187-j6JWxVQG' })
  }

  finalUserId: any = ''
  async getUserProfile() {
    const profile = await liff.getProfile()

    alert(profile.userId + ' ' + profile.displayName)
    this.userId.nativeElement.value = profile.userId

    return profile.userId
  }

  theId: any = ''
  theEmail: string = ''
  dashboardLink: string = 'dashboard'
  otpLink: string = 'otp'

  setName: string = ''
  setNumber: string = ''
  setToken: any = ''
  setPin: string = ''

  userForm: FormGroup
  otpForm: FormGroup

  constructor(public formBuilder: FormBuilder, private router: Router, private ngZone: NgZone, private userService: UserService) {
    this.userForm = this.formBuilder.group({
      userId: [''],
      userEmail: [''],
      userName: [''],
      userPhoneNumber: [''],
      userOtpToken: [''],
    })

    this.otpForm = this.formBuilder.group({
      otpConfirm: [''],
    })
  }

  ngOnInit() {
    liff
      .init({ liffId: '1656955187-j6JWxVQG' })
      .then(() => {
        this.os = liff.getOS()
        if (liff.isLoggedIn()) {
          liff
            .getProfile()
            .then((profile) => {
              this.profile = profile

              this.theId = this.profile.userId
              this.theEmail = liff.getDecodedIDToken()?.email
              this.dashboardLink = 'dashboard'

              this.userForm = this.formBuilder.group({
                userId: [this.profile.userId],
                userEmail: [this.theEmail],
                userName: [''],
                userPhoneNumber: [''],
                userOtpToken: ['unverifed'],
              })

              this.userService.login(this.theId, this.dashboardLink)
              this.isLoading = true;
            })
            .catch(console.error)

        } else {
          // liff.login();
          this.userForm = this.formBuilder.group({
            userId: ['this.theId'],
            userEmail: ['this.theEmail'],
            userName: [''],
            userPhoneNumber: [''],
            userOtpToken: ['unverifed'],
          })
          this.isLoading = false;
        }
      })
      .catch(console.error)
  }

  async onSubmit(): Promise<any> {
    if (!this.userForm.valid) {
      return
    } else {
      this.setName = this.userForm.value.userName
      this.setNumber = this.userForm.value.userPhoneNumber
      await this.userService.myOtp(this.userForm.value.userPhoneNumber)
      this.setToken = this.userService.getOtpToken()
      this.setPin = this.userService.getOtpPin()
      // this.setToken = this.userService.myOtp();
      console.log('test agian' + ' ' + this.setToken + ' ' + this.setPin)

      if (this.setToken === 'none') {
        console.log('number already used')
        this.phoneError.nativeElement.style.display = 'block'
      } else {
        this.otpform.nativeElement.style.display = 'block'
        this.signupForm.nativeElement.style.display = 'none'
        this.phoneError.nativeElement.style.display = 'none'
      }

      // this.userService.AddUser(this.userForm.value)
      // .subscribe(() => {
      //     console.log('Data added successfully!')
      //     this.ngZone.run(() => this.router.navigateByUrl('/otp'));
      //     this.userService.login(this.theId, this.otpLink);
      //     this.userService.myOtp(this.userForm.value.userPhoneNumber);
      //   }, (err) => {
      //     console.log(err);
      // });
    }
  }

  async otpSubmit() {
    if (!this.userForm.valid) {
      return
    } else {
      // console.log(this.setName + ' ' + this.setNumber + ' ' + this.setToken)
      // console.log(this.userForm)
      // console.log(this.otpForm)
      ; (await this.userService.addUser(this.userForm.value, this.otpForm.value, this.setToken)).subscribe(
        () => {
          console.log('Data added successfully!')
          this.userService.login(this.theId, this.dashboardLink)
        },
        (err) => {
          console.log(err)
        }
      )
    }
  }
}
