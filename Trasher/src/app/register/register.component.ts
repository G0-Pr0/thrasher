import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  
  Roles: any = ['Admin', 'Author', 'Reader'];
  registerForm: FormGroup;
  errorMessage: string;
  successMessage: string;
  password: string;
  
  constructor(public authService: AuthService)  {
  }
  

    ngOnInit() {
      // ...
    }

}
