import { Component, ElementRef, ViewChild, OnInit, NgZone } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'
import { UserService } from './../../service/user.service'
import { FormGroup, FormBuilder } from '@angular/forms'

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss'],
})
export class UserDetailComponent implements OnInit {
  @ViewChild('otpform') otpform: ElementRef | any
  @ViewChild('phoneError') phoneError: ElementRef | any
  @ViewChild('userupdateForm') userupdateForm: ElementRef | any

  getId: any
  updateForm: FormGroup
  otpForm: FormGroup

  defvalue = ''
  resetToken: string = ''
  resetPin: string = ''

  constructor(public formBuilder: FormBuilder, private router: Router, private ngZone: NgZone, private activatedRoute: ActivatedRoute, private userService: UserService) {
    this.getId = this.activatedRoute.snapshot.paramMap.get('id')

    this.userService.GetUser(this.getId).subscribe((res) => {
      this.updateForm.setValue({
        userId: res['userId'],
        userName: res['userName'],
        userPhoneNumber: res['userPhoneNumber'],
      })
      this.defvalue = this.updateForm.controls['userPhoneNumber'].value
    })

    this.updateForm = this.formBuilder.group({
      userId: [''],
      userName: [''],
      userPhoneNumber: [''],
    })

    this.otpForm = this.formBuilder.group({
      otpConfirm: [''],
    })
  }

  ngOnInit(): void { }

  async onUpdate(): Promise<any> {
    let newval = this.updateForm.controls['userPhoneNumber'].value
    if (newval == this.defvalue) {


      this.userService.updateUser(this.getId, this.updateForm.value).subscribe(
        () => {
          console.log('User updated successfully!')
          this.ngZone.run(() => this.router.navigateByUrl('/dashboard'))
        },
        (err) => {
          console.log(err)
        }
      )
      console.log(this.updateForm.value + ' ' + this.resetToken + ' ' + this.resetPin)
    } else {



      await this.userService.newOtp(this.updateForm.value.userPhoneNumber)
      this.resetToken = this.userService.resetOtpToken()
      this.resetPin = this.userService.resetOtpPin()
      // this.otpform.nativeElement.style.display = 'block'
      // this.userupdateForm.nativeElement.style.display = 'none'
      console.log('test agian' + ' ' + this.resetToken + ' ' + this.resetPin)

      if (this.resetToken === 'none') {
        console.log('number already used')
        this.phoneError.nativeElement.style.display = 'block'
      } else {
        this.otpform.nativeElement.style.display = 'block'
        this.userupdateForm.nativeElement.style.display = 'none'
        this.phoneError.nativeElement.style.display = 'none'
      }


    }



  }

  async otpSubmit() {
    if (!this.updateForm.valid) {
      return
    } else {
      ; (await this.userService.updateNewNumber(this.getId, this.updateForm.value, this.otpForm.value, this.resetToken)).subscribe(
        () => {
          console.log('Data added successfully!')
          this.ngZone.run(() => this.router.navigateByUrl('/dashboard'))
        },
        (err) => {
          console.log(err)
        }
      )
    }
  }
}
