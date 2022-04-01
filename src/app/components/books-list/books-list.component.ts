import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/service/user.service';
import { CrudService } from './../../service/crud.service';
 
@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.scss']
})
 
export class BooksListComponent implements OnInit, OnDestroy {
   
  Books:any = [];

  userIsAuthenicated = false;
  private authStatusSub : Subscription;
 
  constructor(private crudService: CrudService, private userService: UserService ) { }
 
  ngOnInit(): void {
    this.crudService.GetBooks().subscribe(res => {
      console.log(res)
      this.Books =res;
    });
    this.userIsAuthenicated = this.userService.getIsAuth(); 

    this.authStatusSub = this.userService
    .getAuthStatusListener()
    .subscribe(isAuthenticated => {
      this.userIsAuthenicated = isAuthenticated;
    });
    
  }
  
  ngOnDestroy(): void {
    this.authStatusSub.unsubscribe(); 
  }
 
  delete(id:any, i:any) {
    console.log(id);
    if(window.confirm('Do you want to go ahead?')) {
      this.crudService.deleteBook(id).subscribe((res) => {
        this.Books.splice(i, 1);
      })
    }
  }
 
}