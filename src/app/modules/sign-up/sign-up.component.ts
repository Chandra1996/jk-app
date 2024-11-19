import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { User, UserMaster } from 'src/app/interfaces/user.type';
import { AuthService } from 'src/app/services/auth.service';
import { MasterService } from 'src/app/services/master.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  signupForm: FormGroup;
  hidePassword: boolean = true;
  spinner: boolean = false;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private userService: UserService,
    private afs: AngularFirestore,
    private masterService: MasterService,
    private _snackBar: MatSnackBar,
    private router: Router
  ) {
    this.signupForm = this.fb.group({
      fullName: ['', [Validators.required]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit(): void {
  }

  async onSubmit() {
    this.spinner = true;
    if (this.signupForm.valid) {
      console.log('Form submitted:', this.signupForm.value);
    }

    let userObj: User = {
      fullName: this.signupForm.value.fullName.trim(),
      phone: this.signupForm.value.phone,
      email: this.signupForm.value.email.trim(),
      password: this.signupForm.value.password,
      docId: '',
      createdAt: new Date(),
      updatedAt: new Date(),
      role:'Viewer'
    }

    let userMasterObj: UserMaster = {
      fullName: this.signupForm.value.fullName.trim(),
      phone: this.signupForm.value.phone,
      email: this.signupForm.value.email.trim(),
      docId: '',
      role:'Viewer'
    }

    try {
      // Create user with email and password
      let userAuthInfo= await this.authService.signUp(userObj.email, userObj.password);
      console.log('User Auth Info:', userAuthInfo.user.uid);
      userObj.docId = userAuthInfo.user.uid;
      userMasterObj.docId = userAuthInfo.user.uid;
      await this.authService.logout(); // Logout after signup
      // Add user to your user service
      await this.userService.createUser(userObj);

      // Add user to user master
      await this.masterService.addToUserMaster(userMasterObj);
      this._snackBar.open('Signup successful', 'Success', { duration: 3000 })
      this.signupForm.reset();
      this.router.navigate(['/login']); // Redirect after successful signup
      this.spinner = false;
    } catch (error) {
      this._snackBar.open('Error during signup', 'Error', {
        duration: 3000
      })
      console.error('Error during signup:', error);
      this.spinner = false;
    }
  }
}
