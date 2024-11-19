import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { catchError, lastValueFrom, map, Observable, switchMap, take } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate, CanActivateChild {
  constructor(
    private authService: AuthService,
    private userService: UserService,
    private router: Router,
    private afAuth: AngularFireAuth,

  ) { }
  // canActivate(
  //   route: ActivatedRouteSnapshot,
  //   state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
  //   return this.afAuth.authState.pipe(
  //     take(1),
  //     map(async (user) => {
  //       if (user) {
  //         let id: any = user.uid
  //         let a = await lastValueFrom(this.afAuth.authState)
  //         console.log(a);

  //         let userSnapshot: any = await lastValueFrom(this.userService.getUser(id))
  //         console.log(userSnapshot.data());

  //         if (userSnapshot.data().role == "Admin") {
  //           return true
  //         }
  //         else {
  //           this.router.navigate(['/home'])
  //           return false
  //         }
  //         return true; // Allow access if the user is authenticated
  //       } else {
  //         this.router.navigate(['/login']); // Redirect to login if unauthenticated
  //         return false;
  //       }
  //     })
  //   );;
  // }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> {
    return this.afAuth.authState.pipe(
      take(1), // Take only the first value emitted by authState
      switchMap((user) => {
        if (user) {
          const uid = user.uid;
          console.log('Authenticated UID:', uid);

          // Fetch user data from Firestore
          return this.userService.getUser(uid).pipe(
            map((userSnapshot: any) => {
              const userData = userSnapshot.data();
              console.log('User Data:', userData);

              if (userData && userData.role === 'Admin') {
                return true; // Allow access if the user is an Admin
              } else {
                this.router.navigate(['/home']);
                return false; // Redirect if not an Admin
              }
            }),
            catchError((error) => {
              console.error('Error fetching user data:', error);
              this.router.navigate(['/home']);
              return [false]; // Deny access on error
            })
          );
        } else {
          this.router.navigate(['/login']); // Redirect to login if unauthenticated
          return [false]; // Deny access
        }
      })
    );
  }
  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> {
    return this.afAuth.authState.pipe(
      take(1), // Take only the first value emitted by authState
      switchMap((user) => {
        if (user) {
          const uid = user.uid;
          console.log('Authenticated UID:', uid);

          // Fetch user data from Firestore
          return this.userService.getUser(uid).pipe(
            map((userSnapshot: any) => {
              const userData = userSnapshot.data();
              console.log('User Data:', userData);

              if (userData && userData.role === 'Admin') {
                return true; // Allow access if the user is an Admin
              } else {
                this.router.navigate(['/home']);
                return false; // Redirect if not an Admin
              }
            }),
            catchError((error) => {
              console.error('Error fetching user data:', error);
              this.router.navigate(['/home']);
              return [false]; // Deny access on error
            })
          );
        } else {
          this.router.navigate(['/login']); // Redirect to login if unauthenticated
          return [false]; // Deny access
        }
      })
    );
  }

  // canActivateChild(
  //   childRoute: ActivatedRouteSnapshot,
  //   state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
  //   return this.checkUserRole();
  // }

  async checkUserRole() {

    let id: any = await this.authService.getdocId()
    console.log(id);
    let a = await lastValueFrom(this.afAuth.authState)
    console.log(a);

    let userSnapshot: any = await lastValueFrom(this.userService.getUser(id))
    console.log(userSnapshot.data());

    if (userSnapshot.data().role == "Admin") {
      return true
    }
    else {
      this.router.navigate(['/home'])
      return false
    }
  }
}
