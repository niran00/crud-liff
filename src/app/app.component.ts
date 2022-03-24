import {  Component, ElementRef, VERSION, ViewChild, AfterViewInit, OnInit, NgZone } from '@angular/core';
import { LineService } from './service/line.service';
import liff from '@line/liff';
import * as liffApi from '@liff/is-api-available';

type UnPromise<T> = T extends Promise<infer X>? X : T;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  messages: string;
  userProfile: any;
  
  constructor(
    private lineService: LineService,
  ) { 
    this.messages = "";
    this.initLineLiff();
  }

  async ngOnInit() {
    await this.initLineLiff();
  }

  async initLineLiff() {
    try {
      const data: any = await this.lineService.initLineLiff();
      this.userProfile = await liff.getProfile();
      alert(`Hi ${this.userProfile.displayName}!`);
    } catch (err) {
      // alert(err)
    }
  }

  async sendMessages() {
    try {
      const successMsgs = await liff.sendMessages([
        {
          type: 'text',
          text: this.messages
        }
      ])
      liff.closeWindow()


    } catch (e) {
      alert(e)
    }

  }

  

}
