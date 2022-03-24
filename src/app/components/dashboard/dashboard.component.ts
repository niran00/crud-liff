import {  Component, ElementRef, VERSION, ViewChild, AfterViewInit, OnInit, NgZone } from '@angular/core';
import liff from '@line/liff';
import * as liffApi from '@liff/is-api-available';

import { Router } from '@angular/router';
import { CrudService } from './../../service/crud.service';


type UnPromise<T> = T extends Promise<infer X>? X : T;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit {

    Books:any = [];

  constructor(
    private router: Router,
    private ngZone: NgZone,
    private crudService: CrudService
  ) { }


  // @ViewChild('body') body: ElementRef | any  ;
  // @ViewChild('profile') profile: ElementRef | any  ;
  // @ViewChild('picutreUrl') picutreUrl: ElementRef | any  ;
  // @ViewChild('userId') userId: ElementRef | any  ;
  // @ViewChild('displayName') displayName: ElementRef | any  ;
  // @ViewChild('statusMessage') statusMessage: ElementRef | any  ;
  // @ViewChild('email') email: ElementRef | any  ;
  

  // async  main() {
  //   liff.ready.then(() => {
  //     if (liff.getOS() === 'android') {
  //       this.body.nativeElement.style.backgroundColor = '#888';
  //     }
  //     if (liff.isInClient()) {
  //       this.getUserProfile();
  //     }
  //   });
  //   await liff.init({ liffId: '1656955187-j6JWxVQG' });
  // }
  
  async getUserProfile() {
    const profile = await liff.getProfile();
    // this.picutreUrl.nativeElement.src = profile.pictureUrl;
    // this.userId.nativeElement.innerHTML = '<b>UserID:</b>' + profile.userId;
    // this.displayName.nativeElement.innerHTML = '<b>Display Name: </b>' + profile.displayName;
    // this.statusMessage.nativeElement.innerHTML = '<b>Status : </b>' + profile.statusMessage;
    // this.email.nativeElement.innerHTML = "<b>Email : </b>" + liff.getDecodedIDToken()?.email;
  }
  

  os: ReturnType<typeof liff.getOS>;  
  theprofile!: UnPromise<ReturnType<typeof liff.getProfile>>;

  ngOnInit(): void {

    this.crudService.GetBooks().subscribe(res => {
      console.log(res)
      this.Books =res;
    });  

    // this.main();
    // this.getUserProfile();

    this.os=liff.getOS();
    liff.getProfile().then( profile =>{
      this.theprofile = profile;
    }).catch(console.error);

  }  
}
