import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { BooksListComponent } from './components/books-list/books-list.component';
import { AddBookComponent } from './components/add-book/add-book.component';
import { BookDetailComponent } from './components/book-detail/book-detail.component';
import { UserprofileComponent } from './components/userprofile/userprofile.component';
import { OtpComponent } from './components/otp/otp.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AddUserComponent } from './components/add-user/add-user.component';
import { UsersListComponent } from './components/users-list/users-list.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './service/auth.guard';


const routes: Routes = [
  {
    path: '',
    component: AddUserComponent
  },  
  { 
    path: 'dashboard',
    component: DashboardComponent
  },
  { 
    path: 'login',
    component: LoginComponent 
  },
  { 
    path: 'add-user',
    component: AddUserComponent 
  },
  { 
    path: 'users-list',
    component: UsersListComponent 
  },
  { 
    path: 'books-list',
    component: BooksListComponent 
  },
  { 
    path: 'add-book', 
    component: AddBookComponent 
  },
  { 
    path: 'edit-book/:id', 
    component: BookDetailComponent,
    canActivate: [AuthGuard] 
  },
  { 
    path: 'otp', 
    component: OtpComponent 
  },
  {
    path: '**', 
    component: UserprofileComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
