import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from "@angular/forms";
import { UserService } from 'src/app/service/user.service';
 

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {

  
  userForm: FormGroup;
   
  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private userService: UserService
  ) { 
    this.userForm = this.formBuilder.group({
      userId: [''],
      userName: [''],
      userPhoneNumber: ['']
    })
  }
 
  ngOnInit() { }
 
  onSubmit(): any {
    this.userService.AddUser(this.userForm.value)
    .subscribe(() => {
        console.log('Data added successfully!')
        this.ngZone.run(() => this.router.navigateByUrl('/books-list'))
      }, (err) => {
        console.log(err);
    });
  }

}
