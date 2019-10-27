import { UserService } from './../../core/services/user.service';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as CustomValidators from '../../utils/custom-validators';
import { BAD_REQUEST, CONFLICT, OK } from 'http-status-codes';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  authType = '';
  title = '';
  isSubmitting = false;
  authForm: FormGroup;
  isRegisterMode: boolean;
  errorMessage = '';
  authFailed = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private fb: FormBuilder
  ) {
    this.authForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  ngOnInit() {
    this.route.url.subscribe(data => {
      this.authType = data[data.length - 1].path;
      // Set a title for the page accordingly
      this.title = this.authType === 'login' ? 'Sign in' : 'Sign up';
      this.isRegisterMode = false;
      if (this.authType === 'register') {
        this.isRegisterMode = true;
        this.authForm.addControl(
          'username',
          new FormControl('', [Validators.required])
        );
        this.authForm.addControl(
          'confirmPassword',
          new FormControl('', [Validators.required])
        );
        this.authForm
          .get('password')
          .setValidators([
            Validators.required,
            CustomValidators.passwordComplexityValidator
          ]);

        this.authForm.setValidators(CustomValidators.passwordsMatchValidator);
      }
    });
  }

  get emailControl() {
    return this.authForm.get('email');
  }

  get usernameControl() {
    return this.authForm.get('username');
  }

  get passwordControl() {
    return this.authForm.get('password');
  }

  get confirmPasswordControl() {
    this.setConfirmPasswordErrors();
    return this.authForm.get('confirmPassword');
  }

  private setConfirmPasswordErrors(): void {
    if (this.authForm.errors && this.authForm.errors.notMatch) {
      this.authForm
        .get('confirmPassword')
        .setErrors(this.authForm.errors.notMatch);
    }
  }
  onSubmit() {
    this.userService
      .authentication(this.authType, this.authForm.value)
      .subscribe(
        res => this.router.navigate(['/']),
        errData => {
          console.log(errData);

          this.authFailed = true;
          if (!this.isRegisterMode && errData.status === BAD_REQUEST) {
            this.errorMessage = 'Email or Password are wrong';
          } else if (this.isRegisterMode && errData.status === CONFLICT) {
            this.errorMessage = `It's look like that you already have an account`;
          }
        }
      );
  }
}
