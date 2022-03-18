import { Component, OnInit, NgZone, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.scss']
})
export class OtpComponent implements OnInit {

  
  constructor(
    private router: Router,
    private ngZone: NgZone,
  ) { 
    
  }

  otp: string | any[] = [];

  @ViewChild('ngOtpInput') ngOtpInputRef:any;

  onOtpChange(otp: string | any[] ) {
    this.otp = otp;
    if (otp.length > 3) {
      this.ngZone.run(() => this.router.navigateByUrl('/dashboard'))
    }
  }

  ngOnInit(): void {

    
  }

}
