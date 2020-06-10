import { Injectable } from '@angular/core';
import { CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivateChild {

  constructor(
    private _authService: AuthService,
    private _router: Router
  ){
  }

  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this._authService.isLoggedIn) {
      console.log(`LoggedIn: ${this._authService.isLoggedIn}`)
      this._authService.checkWhoIsSignIn().then(
        (isCompanie)=>{
          console.log(`isCompanie: ${isCompanie}`)
          if (isCompanie) {
            this._router.navigate(['operators-list'])
          } else {
            this._router.navigate(['tests-list'])
          }
        }
      )
    } else{
      return true;
    }
  }
  
}
