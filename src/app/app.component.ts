import { Component, ElementRef, VERSION, ViewChild, AfterViewInit, OnInit, NgZone } from '@angular/core';
import liff from '@line/liff';
import * as liffApi from '@liff/is-api-available';
import { UserService } from './service/user.service';

type UnPromise<T> = T extends Promise<infer X> ? X : T;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title(title: any) {
    throw new Error('Method not implemented.');
  }
  constructor(private userService: UserService) { }
  os: ReturnType<typeof liff.getOS>;
  profile!: UnPromise<ReturnType<typeof liff.getProfile>>;
  ngOnInit(): void {
    this.userService.autoAuthUser();



    // liff.init({liffId:'1656955187-j6JWxVQG'}).then(()=>{
    //   this.os=liff.getOS();
    //   if(liff.isLoggedIn()){
    //     liff.getProfile().then( profile =>{
    //       this.profile = profile;
    //     }).catch(console.error);
    //   }else{
    //     liff.login()
    //   }
    // }).catch(console.error);
  }

}
