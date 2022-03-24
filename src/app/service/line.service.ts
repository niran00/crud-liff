import { Injectable } from '@angular/core';
import liff from '@line/liff';
import * as liffApi from '@liff/is-api-available';
import { Observable, Subject } from 'rxjs';

type UnPromise<T> = T extends Promise<infer X>? X : T;

@Injectable({
  providedIn: 'root'
})
export class LineService {

  private osData : any = [];
  
  os: ReturnType<typeof liff.getOS>;  
  profile!: UnPromise<ReturnType<typeof liff.getProfile>>;
  
  getLineData(): Observable<any[]> { 
    
    liff.init({liffId:'1656955187-j6JWxVQG'}).then(()=>{
      this.os=liff.getOS();
      if(liff.isLoggedIn()){
        liff.getProfile().then( profile =>{
          this.profile = profile;
        }).catch(console.error);
        this.osData.push(this.os);
        
        
      }else{
        liff.login()
      }
    }).catch(console.error);
    let osData = this.os + this.profile; 
    return this.osData; 
  }

  constructor() { }
}
