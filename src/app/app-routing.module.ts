import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BooksListComponent } from './components/books-list/books-list.component';
import { AddBookComponent } from './components/add-book/add-book.component';
import { BookDetailComponent } from './components/book-detail/book-detail.component';
import { UserprofileComponent } from './components/userprofile/userprofile.component';
import { AppComponent } from './app.component';

const routes: Routes = [
  {
    path: '',
    component: BooksListComponent
  },  
  { 
    path: 'books-list',
    component: BooksListComponent },
  { 
    path: 'add-book', 
    component: AddBookComponent },
  { 
    path: 'edit-book/:id', 
    component: BookDetailComponent 
  },
  {
    path: '**', 
    component: AppComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
