import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from './../../service/user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  userIsAuthenicated = false;
  private authListenerSubs: Subscription;

  constructor(private userService: UserService) { }


  ngOnInit(): void {
    this.userIsAuthenicated = this.userService.getIsAuth();
    this.authListenerSubs = this.userService.getAuthStatusListener()
      .subscribe(isAuthenicated => {
        this.userIsAuthenicated = isAuthenicated;
      })
  }

  onLogout() {
    this.userService.logout();
  }

  ngOnDestroy(): void {

  }

}
