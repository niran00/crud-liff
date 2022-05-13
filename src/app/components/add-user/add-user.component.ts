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

  checked = false;
  disabled = false;
  isLoading = false;
  os: ReturnType<typeof liff.getOS>
  profile: UnPromise<ReturnType<typeof liff.getProfile>>

  @ViewChild('userId') userId: ElementRef | any
  @ViewChild('otpform') otpform: ElementRef | any
  @ViewChild('phoneError') phoneError: ElementRef | any
  @ViewChild('signupForm') signupForm: ElementRef | any
  @ViewChild('popupbtn') popupbtn: ElementRef | any
  @ViewChild('popclick') popclick: ElementRef | any

  async main() {
    liff.ready.then(() => {
      if (liff.getOS() === 'android') {
      }
      if (liff.isInClient()) {
        this.getUserProfile()
      }
    })
    await liff.init({ liffId: '1657129933-glzmWkkP' })
  }

  finalUserId: any = ''
  async getUserProfile() {
    const profile = await liff.getProfile()

    alert(profile.userId + ' ' + profile.displayName)
    this.userId.nativeElement.value = profile.userId

    return profile.userId
  }

  public saveUsername: boolean = false;

  public onSaveUsernameChanged(value: boolean) {
    this.saveUsername = value;
    console.log(this.saveUsername)
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
      agreeCheck: ['']

    })

    this.otpForm = this.formBuilder.group({
      otpConfirm: [''],
    })
  }


  async ngOnInit() {

    await liff
      .init({ liffId: '1657129933-glzmWkkP' })
      .then(() => {
        this.os = liff.getOS()
        if (liff.isLoggedIn()) {
          liff
            .getProfile()
            .then(async (profile) => {
              this.profile = profile

              this.theId = this.profile.userId
              this.theEmail = liff.getDecodedIDToken()?.email
              this.dashboardLink = 'dashboard'

              this.userForm = this.formBuilder.group({
                userId: [this.profile.userId],
                userEmail: [this.theEmail],
                userName: [''],
                userPhoneNumber: [''],
                userConsent: ['']
              })

              await this.userService.login(this.theId, this.dashboardLink)
              this.isLoading = true;

            })
            .catch(console.error)

        } else {
          // liff.login();
          this.userForm = this.formBuilder.group({
            userId: ['U4a20ad686ba7827c293b71dc77930331'],
            userEmail: ['this.theEmail'],
            userName: [''],
            userPhoneNumber: [''],
            userConsent: ['']
          })
          this.isLoading = true;
          this.popclick.nativeElement.click();


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
