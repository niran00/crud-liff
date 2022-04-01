import { Component, ElementRef, ViewChild, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from "@angular/forms";
import { UserService } from 'src/app/service/user.service';

import liff from '@line/liff';
import * as liffApi from '@liff/is-api-available';
 

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {

 
  @ViewChild('userId') userId: ElementRef | any  ;
  profId: any;
  profId2: any;
  profId3: any;

  

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
  
  async getUserProfile() {
    const profile = await liff.getProfile();
    this.userId.nativeElement.value =  profile.userId;
    const profId = profile.userId
    const profId2 = profile.userId
    const profId3 = profile.userId
  }


  userForm: FormGroup;
   
  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private userService: UserService
  ) { 
    this.userForm = this.formBuilder.group({
      userId: [this.profId],
      userName: [this.profId2],
      userPhoneNumber: [this.profId3]
    })
  }
 
  ngOnInit() { 
    this.main();
    this.getUserProfile();
    this.onSubmit();
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

}
