import { OidcSecurityService } from 'angular-auth-oidc-client';
import { OidcUserData } from 'src/app/response/oidc-user-data';

import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-default-layout',
	templateUrl: './default-layout.component.html',
	styleUrls: ['./default-layout.component.css'],
})
export class DefaultLayoutComponent implements OnInit {
	// Auth State
	isAuthenticated: boolean = false;
	userData: OidcUserData = {
		id: 0,
		username: '',
		firstName: '',
		lastName: '',
		email: '',
		emailVerified: false,
		isAdmin: false,
	};

	constructor(private oidcSecurityService: OidcSecurityService) {}

	ngOnInit(): void {
		if (!this.isAuthenticated) {
			this.oidcSecurityService.checkAuth().subscribe((response) => {
				this.isAuthenticated = response.isAuthenticated;

				if (response.isAuthenticated) {
					this.userData = {
						id: response.userData.sub,
						username: response.userData.profile.username,
						firstName: response.userData.profile.first_name,
						lastName: response.userData.profile.last_name,
						isAdmin: response.userData.profile.is_admin,
						email: response.userData.email,
						emailVerified: response.userData.email_verified,
					};
				}
			});
		}
	}
}
