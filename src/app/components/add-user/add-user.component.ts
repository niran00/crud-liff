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

 
  @ViewChild('userId') userId: ElementRef | any  ;
  profile: any;

  

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

  

  userForm: FormGroup;
   
  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private userService: UserService
  ) { 
    this.userForm = this.formBuilder.group({
      userId: [this.profile.userId],
      userName: [''],
      userPhoneNumber: ['']
    })
  }
 
  // ngOnInit() { 
  //   this.main();
  //   this.getUserProfile();

  //   this.finalUserId = this.getUserProfile();
  //   alert(this.finalUserId);
   
  // }


   ngOnInit() {
    liff.init({liffId:'1656955187-j6JWxVQG'}).then(()=>{
      const os = liff.getOS();
      if(liff.isLoggedIn()){
        liff.getProfile().then( profile =>{
          this.profile = profile;
          alert( this.profile.userId);
        }).catch(console.error);
      }else{
        // liff.login();
        alert( "yes");
      }
    }).catch(console.error);

   
  }
 
  onSubmit(): any {
    this.userService.AddUser(this.userForm.value)
    .subscribe(() => {
        console.log('Data added successfully!')
        this.ngZone.run(() => this.router.navigateByUrl('/users-list'))
      }, (err) => {
        console.log(err);
    });
  }

}
