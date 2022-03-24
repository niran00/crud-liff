import { Component, ElementRef, ViewChild, AfterViewInit, OnInit, NgZone } from '@angular/core';
import liff from '@line/liff';
import * as liffApi from '@liff/is-api-available';
import { Router } from '@angular/router';
import { CrudService } from './../../service/crud.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(
    private router: Router,
    private ngZone: NgZone,
    private crudService: CrudService,
  ) { }



  ngOnInit(): any {
  
  }

}
