import {  Component, ElementRef, VERSION, ViewChild, AfterViewInit, OnInit, NgZone } from '@angular/core';
import { LineService } from './service/line.service';
import liff from '@line/liff';
import * as liffApi from '@liff/is-api-available';

// type UnPromise<T> = T extends Promise<infer X>? X : T;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {


  constructor(
    private lineService: LineService,
  ) { }

  os: ReturnType<typeof liff.getOS>;  

  ngOnInit(): any {
    
    this.lineService.getLineData().subscribe();
      
  }

  

}
