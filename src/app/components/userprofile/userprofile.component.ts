import { Component, ElementRef, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import liff from '@line/liff';
import * as liffApi from '@liff/is-api-available';

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.scss']
})


export class UserprofileComponent implements AfterViewInit {

  @ViewChild('body') body: ElementRef | any  ;
  @ViewChild('profile') profile: ElementRef | any  ;
  @ViewChild('picutreUrl') picutreUrl: ElementRef | any  ;
  @ViewChild('userId') userId: ElementRef | any  ;
  @ViewChild('displayName') displayName: ElementRef | any  ;
  @ViewChild('statusMessage') statusMessage: ElementRef | any  ;
  @ViewChild('email') email: ElementRef | any  ;
  

  constructor() { }

  async  main() {
    liff.ready.then(() => {
      if (liff.getOS() === 'android') {
        this.body.nativeElement.style.backgroundColor = '#888';
      }
      if (liff.isInClient()) {
        this.getUserProfile();
      }
    });
    await liff.init({ liffId: '1656955187-j6JWxVQG' });
  }
  
  async getUserProfile() {
    const profile = await liff.getProfile();
    this.picutreUrl.nativeElement.src = profile.pictureUrl;
    this.userId.nativeElement.innerHTML = '<b>UserID:</b>' + profile.userId;
    this.displayName.nativeElement.innerHTML = '<b>Display Name: </b>' + profile.displayName;
    this.statusMessage.nativeElement.innerHTML = '<b>Status : </b>' + profile.statusMessage;
    this.email.nativeElement.innerHTML = "<b>Email : </b>" + liff.getDecodedIDToken()?.email;
  }

  ngAfterViewInit(): void { 
    this.main();
  }

}