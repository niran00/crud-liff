import { Injectable } from '@angular/core';

import * as liffApi from '@liff/is-api-available';
import { Observable, Subject } from 'rxjs';

type UnPromise<T> = T extends Promise<infer X>? X : T;
declare var liff: any;
@Injectable({
  providedIn: 'root'
})
export class LineService {

  

  // os: ReturnType<typeof liff.getOS>;  
  // profile!: UnPromise<ReturnType<typeof liff.getProfile>>;
  // private liffValues: any = [];
  
  // getLineData() { 
  //   liff.init({liffId:'1656955187-j6JWxVQG'}).then(()=>{
  //     this.os=liff.getOS();
  //     if(liff.isLoggedIn()){
  //       liff.getProfile().then( profile =>{
  //         this.profile = profile;
  //         this.liffValues.push(this.profile.displayName);
  //         return this.liffValues;
  //       }).catch(console.error);
  //     }else{
  //       liff.login()
  //     }
  //   }).catch(console.error);
    
  // }
  
  
  initLineLiff() {
    return new Promise((resolve, reject) => {
      liff.init(data => {
        resolve(liff.getProfile())
      }, err=>{
        reject(err)
      })
    })
  }

  getLineProfile() {
    return new Promise((resolve, reject) => {
      liff.getProfile(data => {
        resolve(data)
      }, err=>{
        reject(err)
      })
    })
  }

  constructor() { }
}
