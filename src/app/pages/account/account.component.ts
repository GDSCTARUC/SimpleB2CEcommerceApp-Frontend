import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import {
  OidcClientNotification,
  OidcSecurityService,
  OpenIdConfiguration,
  UserDataResult,
} from 'angular-auth-oidc-client';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
})
export class AccountComponent implements OnInit {
  configuration$!: Observable<OpenIdConfiguration>;
  userDataChanged$!: Observable<OidcClientNotification<any>>;
  userData$!: Observable<UserDataResult>;
  isAuthenticated = false;

  constructor(private oidcSecurityService: OidcSecurityService) {}

  ngOnInit() {
    this.configuration$ = this.oidcSecurityService.getConfiguration();
    this.userData$ = this.oidcSecurityService.userData$;

    this.oidcSecurityService.isAuthenticated$.subscribe(
      ({ isAuthenticated }) => {
        this.isAuthenticated = isAuthenticated;

        console.warn('authenticated: ', isAuthenticated);
      }
    );
  }

  login() {
    this.oidcSecurityService.authorize();
  }

  loginWithPopup() {
    this.oidcSecurityService
      .authorizeWithPopUp()
      .subscribe(({ isAuthenticated, userData, accessToken, errorMessage }) => {
        console.log(isAuthenticated);
        console.log(userData);
        console.log(accessToken);
        console.log(errorMessage);
      });
  }

  openWindow() {
    window.open('/', '_blank');
  }

  logout() {
    this.oidcSecurityService.logoff().subscribe(console.log);
  }

  refreshSession() {
    this.oidcSecurityService.forceRefreshSession().subscribe(console.log);
  }
}
