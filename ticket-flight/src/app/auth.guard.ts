import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { SharedServiceService } from './shared-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private service: SharedServiceService, private route: Router) { }

  canActivate() {
    if (this.service.IsLogedIn()) {
      return true;
    }
    else {
      this.route.navigate(["login"]);
      return false;
    }
  }

}