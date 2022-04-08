import { Component, ElementRef, ViewChild, AfterViewInit, OnInit, NgZone } from '@angular/core';
import liff from '@line/liff';
import * as liffApi from '@liff/is-api-available';
import { Router } from '@angular/router';
import { CrudService } from './../../service/crud.service';
import { UserService } from './../../service/user.service';
import { Subscription } from 'rxjs';

type UnPromise<T> = T extends Promise<infer X>? X : T;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit {

    Users:any = [];
   
    userIsAuthenicated = false;
    tokenUserId : string; 
    private authStatusSub : Subscription;

  constructor(
    private router: Router,
    private ngZone: NgZone,
    private crudService: CrudService,
    private userService: UserService
  ) { }


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
    this.picutreUrl.nativeElement.src = profile.pictureUrl;
    this.userId.nativeElement.innerHTML = '<b>UserID:</b>' + profile.userId;
    // this.displayName.nativeElement.innerHTML = '<b>ชื่อในไลน์: </b>' + profile.displayName;
    this.email.nativeElement.innerHTML = "<b>อีเมล : </b>" + liff.getDecodedIDToken()?.email;
  }
  
  
  ngOnInit(): void {

     
    // this.crudService.GetBooks().subscribe(res => {
    //   console.log(res)
    //   this.Books =res;
    // });  

    this.tokenUserId = this.userService.getTokenUserId();

    this.userService.GetUsers().subscribe(res => {
      console.log(res)
      this.Users =res;
    });  

    this.userIsAuthenicated = this.userService.getIsAuth(); 

    this.authStatusSub = this.userService
    .getAuthStatusListener()
    .subscribe(isAuthenticated => {
      this.userIsAuthenicated = isAuthenticated;
      this.tokenUserId = this.userService.getTokenUserId();
    });

    this.main();
    this.getUserProfile();
  }  

  ngOnDestroy(): void {
    this.authStatusSub.unsubscribe(); 
  }
  
}
