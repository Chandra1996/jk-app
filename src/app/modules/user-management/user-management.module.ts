import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';
import { UserManagementComponent } from './user-management.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';

const route: Route[] = [
  {
    path: '',
    component: UserManagementComponent
  }
];

@NgModule({
  declarations: [UserManagementComponent],
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    FormsModule,
    MatSelectModule,
    RouterModule.forChild(route),
    MatInputModule
  ]
})
export class UserManagementModule { }
