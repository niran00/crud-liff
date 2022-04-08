import { Component, OnInit, NgZone } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from './../../service/user.service';
import { FormGroup, FormBuilder } from "@angular/forms";
 
@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {

  getId: any;
  updateForm: FormGroup;

  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private activatedRoute: ActivatedRoute,
    private userService: UserService
  ) 
  {
    this.getId = this.activatedRoute.snapshot.paramMap.get('id');
 
    this.userService.GetUser(this.getId).subscribe(res => {
      this.updateForm.setValue({
        userId: res['userId'],
        userName: res['userName'],
        userPhoneNumber: res['userPhoneNumber']
      });
    });
 
    this.updateForm = this.formBuilder.group({
      userId: [''],
      userName: [''],
      userPhoneNumber: ['']
    })   

  }

  ngOnInit(): void {
  }

  onUpdate(): any {
    this.userService.updateUser(this.getId, this.updateForm.value)
    .subscribe(() => {
        console.log('User updated successfully!')
        this.ngZone.run(() => this.router.navigateByUrl('/dashboard'))
      }, (err) => {
        console.log(err);
    });
  }

}
