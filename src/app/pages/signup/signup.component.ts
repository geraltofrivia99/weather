import {Component, OnInit} from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthService } from '../../services/auth/auth.service'; 
import { Router } from '@angular/router';
import {FormControl, Validators} from '@angular/forms';
import {LoginInStart} from '../../redux/actions';
import * as fromRoot from '../../redux/reducers';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private auth: AuthService, private router: Router, private store: Store<fromRoot.State> ) {
  }

  ngOnInit() {
  }
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required]);
  cpassword = new FormControl('', [Validators.required]);

  hide = true;
  hideC = true;
  
  getErrorMessage() {
    return this.email.hasError('required') ? 'You must enter a value' :
        this.email.hasError('email') ? 'Not a valid email' :
            '';
  }
  onSubmit(e) {
    e.preventDefault();
    const errors = [];
    const email = this.email.value;
    const password = this.password.value;
    const cpassword = this.cpassword.value;
    const user = {
      email,
      password
    }

    if (password != cpassword) {
      errors.push('Passwords do not match')
    }

    if (errors.length === 0 ) {
      // this.auth.registerUser(email, password).subscribe(data => {
      //   console.log(data);
      //   if (data.success) {
      //     this.router.navigate([''])
      //   }
      // });
      // LoginInStart(user)
      this.store.dispatch(new LoginInStart(user));
    }
    console.log(email, password)
  }
}
