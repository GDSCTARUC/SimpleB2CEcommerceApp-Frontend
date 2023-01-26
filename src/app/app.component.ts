import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { OidcSecurityService } from 'angular-auth-oidc-client';
import { FrontendTitle } from './consts/FrontendDefaults';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
	constructor(
		private titleService: Title,
		private oidcSecurityService: OidcSecurityService
	) {}

	ngOnInit(): void {
		this.titleService.setTitle(`Home ${FrontendTitle}`);

		this.oidcSecurityService
			.checkAuth()
			.subscribe(
				({ isAuthenticated, userData, accessToken, idToken }) => {
					console.log('App authenticated', isAuthenticated);
					console.log(`Current access token is '${accessToken}'`);
					console.log(`Current id token is '${idToken}'`);
					console.log(`Current user data: '${userData}'`);

					this.oidcSecurityService
						.getRefreshToken()
						.subscribe((refreshToken) =>
							console.log(
								`Current refresh token is '${refreshToken}'`
							)
						);

					fetch('https://localhost:5000/api/cart/secret', {
						headers: {
							Authorization: `Bearer ${accessToken}`,
						},
					});

					fetch('https://localhost:5010/cartServer/secret', {
						headers: {
							Authorization: `Bearer ${accessToken}`,
						},
					});
				}
			);
	}
}
