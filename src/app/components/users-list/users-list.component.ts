import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {

 
  Users:any = [];
 
  constructor(private userService: UserService) { }
 
  ngOnInit(): void {
    this.userService.GetUsers().subscribe(res => {
      console.log(res)
      this.Users =res;
    });    
  }
 
  delete(id:any, i:any) {
    console.log(id);
    if(window.confirm('Do you want to go ahead?')) {
      this.userService.deleteUser(id).subscribe((res) => {
        this.Users.splice(i, 1);
      })
    }
  }
 

}
