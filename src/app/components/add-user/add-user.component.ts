import { Component, ElementRef, ViewChild, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from "@angular/forms";
import { UserService } from 'src/app/service/user.service';

import liff from '@line/liff';
import * as liffApi from '@liff/is-api-available';


import { Hero } from './hero';


@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {


 
  @ViewChild('userId') userId: ElementRef | any  ;

  

  async  main() {
    liff.ready.then(() => {
      if (liff.getOS() === 'android') {
       
      }
      if (liff.isInClient()) {
        this.getUserProfile();
      }
    });
    await liff.init({ liffId: '1656955187-j6JWxVQG' });
  }
  
  theUserId : string = ''; 

  async getUserProfile() {
    const profile = await liff.getProfile();
    this.userId.nativeElement.value =  profile.userId;
    let theUserId = profile.userId;
  }

  

  userForm: FormGroup;
   
  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private userService: UserService
  ) { 
    this.userForm = this.formBuilder.group({
      userId: [this.theUserId],
      userName: [''],
      userPhoneNumber: ['']
    })
    this.heroForm = this.formBuilder.group({
      userId: [this.theUserId],
      userName: [this.theUserId],
      userPhoneNumber: [this.theUserId]
    })
  }
 
  ngOnInit() { 
    this.main();
    this.getUserProfile();
  }
 
  onSubmit(): any {
    this.userService.AddUser(this.userForm.value)
    .subscribe(() => {
        console.log('Data added successfully!')
        this.ngZone.run(() => this.router.navigateByUrl('/users-list'))
      }, (err) => {
        console.log(err);
    });
  }


  theValue: string = 'my ID';

  model = new Hero(this.theUserId, this.theUserId, this.theUserId);

  submitted = false;

  heroForm: FormGroup;

  
  onSubmitForm() {
    this.submitted = true;
    this.userService.AddUser(this.heroForm.value)
    .subscribe(() => {
        console.log('Data added successfully!')
        this.ngZone.run(() => this.router.navigateByUrl('/users-list'))
      }, (err) => {
        console.log(err);
    });
  }

}
