import { Injectable } from '@angular/core';
import liff from '@line/liff';
import * as liffApi from '@liff/is-api-available';
import { Observable, Subject } from 'rxjs';

type UnPromise<T> = T extends Promise<infer X> ? X : T;

@Injectable({
  providedIn: 'root'
})
export class LineService {



  os: ReturnType<typeof liff.getOS>;
  profile!: UnPromise<ReturnType<typeof liff.getProfile>>;
  private liffValues: any = [];

  getLineData(): Observable<any> {
    liff.init({ liffId: '1657130826-Oywmoxqw' }).then(() => {
      this.os = liff.getOS();
      if (liff.isLoggedIn()) {
        liff.getProfile().then(profile => {
          this.profile = profile;
          this.liffValues.push(this.profile.displayName);
          alert(this.liffValues);
        }).catch(console.error);
      } else {
        liff.login()
      }
    }).catch(console.error);
    return this.liffValues;
  }


  constructor() { }
}
