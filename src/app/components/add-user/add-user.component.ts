import { Component, ElementRef, ViewChild, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from "@angular/forms";
import { Observable } from 'rxjs';
import { UserService } from 'src/app/service/user.service';


import liff from '@line/liff';
import * as liffApi from '@liff/is-api-available';



type UnPromise<T> = T extends Promise<infer X>? X : T;

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {

  os: ReturnType<typeof liff.getOS>;  
  profile: UnPromise<ReturnType<typeof liff.getProfile>>;
 
  @ViewChild('userId') userId: ElementRef | any  ;
  

  

  async  main() {
    liff.ready.then(() => {
      if (liff.getOS() === 'android') {
       
      }
      if (liff.isInClient()) {
        this.getUserProfile();
      }
    });
    await liff.init({ liffId: '1656955187-j6JWxVQG' });
  }
  
  finalUserId : any = "";
  async getUserProfile() {
    const profile = await liff.getProfile();

    alert(profile.userId + " " + profile.displayName);
    this.userId.nativeElement.value =  profile.userId;

    return profile.userId;
  }

  theId : any = '';
  theEmail: string = '';
  dashboardLink : string = '';
  otpLink : string = 'otp';

  userForm: FormGroup;
   
  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private userService: UserService
  ) { 
    this.userForm = this.formBuilder.group({
      userId: [''],
      userEmail: [''],
      userName: [''],
      userPhoneNumber: [''],
      userOtpToken: ['']
    });
  }
 


   ngOnInit() {
   
    liff.init({liffId:'1656955187-j6JWxVQG'}).then(()=>{
      this.os = liff.getOS();
      if(liff.isLoggedIn()){
        liff.getProfile().then( profile =>{
          this.profile = profile;
         
           this.theId = this.profile.userId;
           this.theEmail = liff.getDecodedIDToken()?.email;
           this.dashboardLink = "dashboard";

           this.userForm = this.formBuilder.group({
            userId: [this.profile.userId],
            userEmail: [this.theEmail],
            userName: [''],
            userPhoneNumber: [''],
            userOtpToken: ['unverifed']
          });

          this.userService.login(this.theId, this.dashboardLink);

        }).catch(console.error);
      }else{
        // liff.login();
        this.userForm = this.formBuilder.group({
          userId: [this.theId],
          userEmail: [this.theEmail],
          userName: [''],
          userPhoneNumber: [''],
          userOtpToken: ['unverifed']
        });
      }
    }).catch(console.error);

   
  }
 
  onSubmit(): any {
    if(!this.userForm.valid){
      return;
    } else {
      this.userService.AddUser(this.userForm.value)
      .subscribe(() => {
          console.log('Data added successfully!')
          this.ngZone.run(() => this.router.navigateByUrl('/otp'));
          this.userService.login(this.theId, this.otpLink);
        }, (err) => {
          console.log(err);
      });
    }
  }

}
