import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { NoAuthGuard } from './guards/no-auth.guard';
import { AdminGuard } from './guards/admin.guard';

const routes: Routes = [
   { path: '', pathMatch: 'full', redirectTo: 'home' },
  {
    path: '',
    canActivate: [NoAuthGuard],
    canActivateChild: [NoAuthGuard],
    children: [
      { path: 'login', loadChildren: () => import('src/app/modules/login/login.module').then(m => m.LoginModule) },
      { path: 'signup', loadChildren: () => import('src/app/modules/sign-up/sign-up.module').then(m => m.SignUpModule) },
    ]
  },
  {
    path: '',
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    children: [
      { path: 'home', loadChildren: () => import('src/app/modules/home/home.module').then(m => m.HomeModule) },
      { path: 'manage-documents', loadChildren: () => import('src/app/modules/docs-management/docs-management.module').then(m => m.DocsManagementModule) },
      { path: 'users-management', loadChildren: () => import('src/app/modules/user-management/user-management.module').then(m => m.UserManagementModule) },
      // { path: 'ask-question', loadChildren: () => import('src/app/modules/qa-interface/qa-interface.module').then(m => m.QaInterfaceModule) },
    ]
  },
  {
    path: '',
    canActivate: [AuthGuard,AdminGuard],
    canActivateChild: [AuthGuard,AdminGuard],
    children: [
      { path: 'ask-question', loadChildren: () => import('src/app/modules/qa-interface/qa-interface.module').then(m => m.QaInterfaceModule) },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
