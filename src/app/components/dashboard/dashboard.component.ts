import {  Component, VERSION, ViewChild, OnInit, NgZone } from '@angular/core';
import liff from '@line/liff';
import * as liffApi from '@liff/is-api-available';

import { Router } from '@angular/router';
import { CrudService } from './../../service/crud.service';

type UnPromise<T> = T extends Promise<infer X>? X : T;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  os: ReturnType<typeof liff.getOS>;  
  profile!: UnPromise<ReturnType<typeof liff.getProfile>>;
  Books:any = [];

  constructor(
    private router: Router,
    private ngZone: NgZone,
    private crudService: CrudService
  ) { }


  ngOnInit(): void {
   
      this.os=liff.getOS();
      liff.getProfile().then( profile =>{
        this.profile = profile;
      }).catch(console.error);
   
  }
}
