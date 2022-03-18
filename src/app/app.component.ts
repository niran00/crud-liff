import {  Component, ElementRef, ViewChild, AfterViewInit, OnInit, NgZone } from '@angular/core';
import liff from '@line/liff';
import * as liffApi from '@liff/is-api-available';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'my-crud-app';

  @ViewChild('body') body: ElementRef | any  ;
  @ViewChild('profile') profile: ElementRef | any  ;
  @ViewChild('picutreUrl') picutreUrl: ElementRef | any  ;
  @ViewChild('userId') userId: ElementRef | any  ;
  @ViewChild('displayName') displayName: ElementRef | any  ;
  @ViewChild('statusMessage') statusMessage: ElementRef | any  ;
  @ViewChild('email') email: ElementRef | any  ;
  

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
    let profilePicture : any = this.picutreUrl.nativeElement.src ;
    this.userId.nativeElement.innerHTML = '<b>UserID:</b>' + profile.userId;
    this.displayName.nativeElement.innerHTML = '<b>Display Name: </b>' + profile.displayName;
    this.statusMessage.nativeElement.innerHTML = '<b>Status : </b>' + profile.statusMessage;
    this.email.nativeElement.innerHTML = "<b>Email : </b>" + liff.getDecodedIDToken()?.email;

    profilePicture = profile.pictureUrl;
  }

  ngAfterViewInit(): void { 
    this.main();
  }
}

