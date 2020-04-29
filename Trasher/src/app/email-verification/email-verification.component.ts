import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service' 

@Component({
  selector: 'app-email-verification',
  templateUrl: './email-verification.component.html',
  styleUrls: ['./email-verification.component.css']
})
export class EmailVerificationComponent implements OnInit {

  constructor(
    public authService: AuthService
  ) { }


  ngOnInit(): void {
  }

}
