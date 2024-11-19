import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';
import { DocsManagementComponent } from './docs-management.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';

const route: Route[] = [
  {
    path: '',
    component: DocsManagementComponent
  }
];

@NgModule({
  declarations: [DocsManagementComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(route),
    MatProgressBarModule,
    MatIconModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    AngularFireStorageModule,
    MatSnackBarModule,
    MatDialogModule
  ]
})
export class DocsManagementModule { }
