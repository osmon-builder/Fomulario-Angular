import { Component, OnInit } from '@angular/core';
import {Store} from '@ngrx/store'
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/services/auth.service';
import { login } from 'src/app/store/actions/auth.actions';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent  {

  loggin$: Observable<boolean>;
  isLoggedIn = false;
  loginForm: FormGroup;
  constructor( 
    private formBuilder: FormBuilder, 
    private store: Store<{auth: boolean}>,
    private router: Router,
    private authService: AuthService
    ) {
      this.loginForm = this.formBuilder.group({
        username: ['', Validators.required],
        password: ['', Validators.required]
      });
      this.loggin$ = store.select('auth');
   }
    



   onSubmit() {
    const { username, password } = this.loginForm.value;
    this.authService.login(username, password).subscribe(
      {
        next: response => {
         
        },
      
     
      }
        
      )
      this.router.navigate(['/home/home']);
      localStorage.setItem('logged', 'true')
    return this.store.dispatch(login(({logged: true}) ));
    }

  }
  
  


