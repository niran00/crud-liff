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
  
  finalMovies : any = '';
  async getUserProfile() {
    const profile = await liff.getProfile();
    return profile.userId;
  }


  userForm: FormGroup;
   
  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private userService: UserService
  ) { 
    this.userForm = this.formBuilder.group({
      userId: [this.finalMovies],
      userName: [''],
      userPhoneNumber: ['']
    })
  }
 
  ngOnInit() { 
    this.main();
    this.getUserProfile();
    this.finalMovies = this.getUserProfile();
    alert(this.finalMovies.JSON.stringify());
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
