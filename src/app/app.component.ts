import {  Component, ElementRef, VERSION, ViewChild, AfterViewInit, OnInit, NgZone } from '@angular/core';
import { Observable } from 'rxjs';
import liff from '@line/liff';
import * as liffApi from '@liff/is-api-available';

type UnPromise<T> = T extends Promise<infer X>? X : T;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})



export class AppComponent implements OnInit {
  os: ReturnType<typeof liff.getOS>;  
  profile: UnPromise<ReturnType<typeof liff.getProfile>> | undefined;
  ngOnInit(): void {
    liff.init({liffId:'1653761629-AMDmoZ6p'}).then(()=>{
      this.os=liff.getOS();
      if(liff.isLoggedIn()){
        liff.getProfile().then( profile =>{
          this.profile = profile;
        }).catch(console.error);
      }else{
        liff.login()
      }
    }).catch(console.error);
  }

  displayName: string | any | []; 

}
