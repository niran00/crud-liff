import { Component, ElementRef, ViewChild, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from "@angular/forms";
import { Observable } from 'rxjs';
import { UserService } from 'src/app/service/user.service';
import { Subscription } from 'rxjs';

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
  userIsAuthenicated = false;
  private authListenerSubs : Subscription;

  userForm: FormGroup;
   
  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private userService: UserService
  ) { 
    this.userForm = this.formBuilder.group({
      userId: [''],
      userName: [''],
      userPhoneNumber: ['']
    });
  }
 


   ngOnInit() {

    
   
    liff.init({liffId:'1656955187-j6JWxVQG'}).then(()=>{
      this.os = liff.getOS();
      if(liff.isLoggedIn()){
        liff.getProfile().then( profile =>{
          this.profile = profile;
         
           this.theId = this.profile.userId;  

           this.userForm = this.formBuilder.group({
            userId: [this.profile.userId],
            userName: [''],
            userPhoneNumber: ['']
          });

          this.userService.login(this.theId);

         

        }).catch(console.error);
      }else{
        // liff.login();
      }
    }).catch(console.error);

    this.authListenerSubs = this.userService.getAuthStatusListener()
    .subscribe(isAuthenicated => {
      this.userIsAuthenicated = isAuthenicated;
    })

     if(!this.userIsAuthenicated){
            alert(this.userIsAuthenicated);
          } else {
            alert("logged in failed" + this.userIsAuthenicated);
          }
   
  }
 
  onSubmit(): any {
    if(!this.userForm.valid){
      return;
    } else {
      this.userService.AddUser(this.userForm.value)
      .subscribe(() => {
          console.log('Data added successfully!')
          this.userService.login(this.theId);
          this.ngZone.run(() => this.router.navigateByUrl('/otp'));
        }, (err) => {
          console.log(err);
      });
    }
  }

}
