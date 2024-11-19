import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { map, Observable, take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(
    private afAuth: AngularFireAuth, 
    private router: Router
  ) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return this.afAuth.authState.pipe(
        take(1),
        map((user) => {
          if (user) {
            return true; // Allow access if the user is authenticated
          } else {
            this.router.navigate(['/login']); // Redirect to login if unauthenticated
            return false;
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
            return true; // Allow access if the user is authenticated
          } else {
            this.router.navigate(['/login']); // Redirect to login if unauthenticated
            return false;
          }
        })
      );
  }
  
}
