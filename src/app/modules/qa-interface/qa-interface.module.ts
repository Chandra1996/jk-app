import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QaInterfaceComponent } from './qa-interface.component';
import { Route, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';

const route: Route[] = [
  {
    path: '',
    component: QaInterfaceComponent
  }
];

@NgModule({
  declarations: [QaInterfaceComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(route),
    HttpClientModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    FormsModule,
    MatInputModule
  ]
})
export class QaInterfaceModule { }
