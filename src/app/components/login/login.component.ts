import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from './../../service/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor( public userService: UserService) { }

  dashboardLink : any = 'dashboard';

  ngOnInit(): void {
  }

  onLogin( form: NgForm){
    if(form.invalid){
      return;
    }
    this.userService.login(form.value.userId, this.dashboardLink);
  }

}
