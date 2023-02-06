import { Injectable } from '@angular/core';
import {
	ActivatedRouteSnapshot,
	CanActivate,
	Router,
	RouterStateSnapshot,
	UrlTree,
} from '@angular/router';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { Observable, map } from 'rxjs';
import { OidcUserData } from 'src/app/response/oidc-user-data';

@Injectable({
	providedIn: 'root',
})
export class OidcAdminGuard implements CanActivate {
	constructor(
		private router: Router,
		private oidcSecurityService: OidcSecurityService
	) {}

	canActivate(
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot
	): Observable<boolean | UrlTree> {
		let userData: OidcUserData;

		this.oidcSecurityService.getUserData().subscribe((data) => {
			userData = {
				id: data.sub,
				username: data.profile.username,
				firstName: data.profile.first_name,
				lastName: data.profile.last_name,
				isAdmin: data.profile.is_admin,
				email: data.email,
				emailVerified: data.email_verified,
			};
		});

		return this.oidcSecurityService.isAuthenticated$.pipe(
			map(({ isAuthenticated }) => {
				if (isAuthenticated && userData.isAdmin) {
					return true;
				}

				return this.router.parseUrl('/unauthorized');
			})
		);
	}
}
