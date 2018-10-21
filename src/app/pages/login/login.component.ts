import {Component, OnInit} from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthService } from '../../services/auth/auth.service'; 
import { Router } from '@angular/router';
import {FormControl, Validators} from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  private errors: string;
  constructor(private auth: AuthService, private router: Router ) {
  }

  ngOnInit() {
    // this.auth.isAuth();
  }
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required]);
  
  hide = true;

  getErrorMessage() {
    return this.email.hasError('required') ? 'You must enter a value' :
        this.email.hasError('email') ? 'Not a valid email' :
            '';
  }
  onSubmit(e) {
    e.preventDefault();
    const email = this.email.value;
    const password = this.password.value;
    console.log()
    this.auth.LoginStart(email, password)
    .subscribe(({data: {signIn: {ok, token, errors, user}}}) => {
      if (ok) {
        console.log(ok, token, user)
        localStorage.setItem('x-token', token);
        this.auth.setUserId(user.id);
        this.router.navigate([`home/files/${user.id}`]);
      }
      else {
        console.log(errors)
      }
    });

    // if (errors.length === 0 ) {
      // this.auth.registerUser(email, password).subscribe(data => {
      //   console.log(data);
      //   if (data.success) {
      //     this.router.navigate([''])
      //   }
      // });
      // LoginInStart(user)
    // }
  }

}
