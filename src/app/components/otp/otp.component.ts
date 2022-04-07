import { Component, OnInit, NgZone, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './../../service/user.service';


import liff from '@line/liff';
import * as liffApi from '@liff/is-api-available';

type UnPromise<T> = T extends Promise<infer X>? X : T;


@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.scss']
})
export class OtpComponent implements OnInit {

  os: ReturnType<typeof liff.getOS>;  
  profile: UnPromise<ReturnType<typeof liff.getProfile>>;
 
  
  constructor(
    private router: Router,
    private ngZone: NgZone,
    private userService : UserService,
  ) { 
    
  }

  otp: string | any[] = [];

  @ViewChild('ngOtpInput') ngOtpInputRef:any;

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
  
  theId : string = '';
  async getUserProfile() {
    const profile = await liff.getProfile();
    const theId = profile.userId;
  }

  onOtpChange(otp: string | any[] ) {
    this.otp = otp;
    if (otp.length > 3) {

      this.userService.login(this.theId);
      this.ngZone.run(() => this.router.navigateByUrl('/dashboard'))
    }
  }

  ngOnInit(): void {

    liff.init({liffId:'1656955187-j6JWxVQG'}).then(()=>{
      this.os = liff.getOS();
      if(liff.isLoggedIn()){
        liff.getProfile().then( profile =>{

          alert(this.theId);

        }).catch(console.error);
      }else{
        // liff.login();
      }
    }).catch(console.error);
  }

}
