import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm:any;
  hidePassword: boolean = true;
  spinner: boolean = false;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService, 
    private router: Router,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });


  }
   async onSubmit() {
    this.spinner = true;
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      try {
        await this.auth.login(email, password);
        console.log('Login successful!');
        this.router.navigate(['/home']); // Redirect after successful login
      } catch (error) {
        this._snackBar.open('Invalid Credentials', 'Error', {
          duration: 3000
        })
        console.error('Error during login:', error);
        this.spinner = false;
      }
    }
  }
}
