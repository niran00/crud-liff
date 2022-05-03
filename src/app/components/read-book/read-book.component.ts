import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CrudService } from './../../service/crud.service';

@Component({
  selector: 'app-read-book',
  templateUrl: './read-book.component.html',
  styleUrls: ['./read-book.component.scss']
})




export class ReadBookComponent implements OnInit {

  getId: any;
  Book: any = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private crudService: CrudService
  ) {
    this.getId = this.activatedRoute.snapshot.paramMap.get('id');




  }

  ngOnInit() {

    this.crudService.GetBook(this.getId).subscribe(res => {
      console.log(res)
      this.Book = res;
    });
  }



}
