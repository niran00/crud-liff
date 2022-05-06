import { Component, ElementRef, ViewChild, OnInit, NgZone } from '@angular/core'
import { Router } from '@angular/router'
import { FormGroup, FormBuilder } from '@angular/forms'
import { Observable } from 'rxjs'
import { UserService } from 'src/app/service/user.service'

import liff from '@line/liff'
import * as liffApi from '@liff/is-api-available'

type UnPromise<T> = T extends Promise<infer X> ? X : T


@Component({
  selector: 'app-entrytype',
  templateUrl: './entrytype.component.html',
  styleUrls: ['./entrytype.component.scss']
})
export class EntrytypeComponent implements OnInit {
  isLoading = false;

  userIsAuthenicated = false;
  constructor(private userService: UserService, private router: Router,) { }

  os: ReturnType<typeof liff.getOS>
  profile: UnPromise<ReturnType<typeof liff.getProfile>>

  async main() {
    liff.ready.then(() => {
      if (liff.getOS() === 'android') {
      }
      if (liff.isInClient()) {
        this.getUserProfile()
      }
    })
    await liff.init({ liffId: '1656955187-j6JWxVQG' })
  }

  finalUserId: any = ''
  async getUserProfile() {
    const profile = await liff.getProfile()

    alert(profile.userId + ' ' + profile.displayName)


    return profile.userId
  }

  theId: any = ''
  theEmail: string = ''
  dashboardLink: string = 'dashboard'


  async ngOnInit() {

    await liff
      .init({ liffId: '1656955187-j6JWxVQG' })
      .then(() => {
        this.os = liff.getOS()
        if (liff.isLoggedIn()) {
          liff
            .getProfile()
            .then(async (profile) => {
              this.profile = profile

              this.theId = this.profile.userId
              this.theEmail = liff.getDecodedIDToken()?.email
              this.dashboardLink = 'dashboard'


              await this.userService.login(this.theId, this.dashboardLink)
              this.isLoading = true;
              this.userIsAuthenicated = true;
            })
            .catch(console.error)

        }
      })
      .catch(console.error)

    if (!this.userIsAuthenicated) {
      this.router.navigate(['add-user']);
    }

  }


}
