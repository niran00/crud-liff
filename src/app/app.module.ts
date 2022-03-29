import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { NgOtpInputModule } from  'ng-otp-input';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';


import { AppComponent } from './app.component';
import { AddBookComponent } from './components/add-book/add-book.component';
import { BookDetailComponent } from './components/book-detail/book-detail.component';
import { BooksListComponent } from './components/books-list/books-list.component';
import { UserprofileComponent } from './components/userprofile/userprofile.component';
import { OtpComponent } from './components/otp/otp.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HeaderComponent } from './shared/header/header.component';
import { AddUserComponent } from './components/add-user/add-user.component';
import { UsersListComponent } from './components/users-list/users-list.component';


@NgModule({
  declarations: [
    AppComponent,
    AddBookComponent,
    BookDetailComponent,
    BooksListComponent,
    UserprofileComponent,
    OtpComponent,
    DashboardComponent,
    HeaderComponent,
    AddUserComponent,
    UsersListComponent
  ],
  imports: [
    BrowserModule,
    MatToolbarModule,
    NgOtpInputModule,
    MatButtonModule,
    MatInputModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
