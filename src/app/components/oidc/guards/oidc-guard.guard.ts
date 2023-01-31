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

@Injectable({
	providedIn: 'root',
})
export class OidcGuard implements CanActivate {
	constructor(
		private router: Router,
		private oidcSecurityService: OidcSecurityService
	) {}

	canActivate(
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot
	): Observable<boolean | UrlTree> {
		return this.oidcSecurityService.isAuthenticated$.pipe(
			map(({ isAuthenticated }) => {
				if (isAuthenticated) {
					return true;
				}

				return this.router.parseUrl('/unauthorized');
			})
		);
	}
}
