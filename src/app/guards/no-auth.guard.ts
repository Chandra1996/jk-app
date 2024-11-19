import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { map, Observable, take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NoAuthGuard implements CanActivate, CanActivateChild {
  constructor(private afAuth: AngularFireAuth, private router: Router) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> {
    return this.afAuth.authState.pipe(
      take(1),
      map((user) => {
        if (user) {
          // Redirect authenticated users to the home page
          return this.router.parseUrl('/home');
        } else {
          // Allow access to unauthenticated users
          return true;
        }
      })
    );
  }
  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.afAuth.authState.pipe(
      take(1),
      map((user) => {
        if (user) {
          // Redirect authenticated users to the home page
          return this.router.parseUrl('/home');
        } else {
          // Allow access to unauthenticated users
          return true;
        }
      })
    );
  }

}
