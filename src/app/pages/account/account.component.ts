import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Title } from '@angular/platform-browser';

import {
	OidcClientNotification,
	OidcSecurityService,
	OpenIdConfiguration,
	UserDataResult,
} from 'angular-auth-oidc-client';
import { FrontendTitle } from 'src/app/consts/FrontendDefaults';

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

	constructor(
		private titleService: Title,
		private oidcSecurityService: OidcSecurityService
	) {}

	ngOnInit() {
		this.titleService.setTitle(`Account ${FrontendTitle}`);

		this.configuration$ = this.oidcSecurityService.getConfiguration();
		this.userData$ = this.oidcSecurityService.userData$;

		this.oidcSecurityService.isAuthenticated$.subscribe(
			({ isAuthenticated }) => {
				this.isAuthenticated = isAuthenticated;
			}
		);
	}

	login() {
		this.oidcSecurityService.authorize();
	}

	refreshSession() {
		this.oidcSecurityService.forceRefreshSession().subscribe();
	}
}
