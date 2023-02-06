import {
	HttpErrorResponse,
	HttpEvent,
	HttpHandler,
	HttpHeaders,
	HttpInterceptor,
	HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
	providedIn: 'root',
})
export class OidcInterceptor implements HttpInterceptor {
	private token!: string;

	constructor(private oidcService: OidcSecurityService) {
		this.oidcService.getAccessToken().subscribe((token) => {
			this.token = token;
		});
	}

	intercept(
		req: HttpRequest<any>,
		next: HttpHandler
	): Observable<HttpEvent<any>> {
		if (req.url.startsWith(environment.urls.authUrl + '/connect'))
			return next.handle(req);

		const reqClone = req.clone({
			headers: new HttpHeaders({
				Authorization: `Bearer ${this.token}`,
			}),
		});

		return next.handle(reqClone).pipe(
			catchError((error: HttpErrorResponse): Observable<any> => {
				if (error.status === 401) window.location.replace('/login');

				return throwError(() => new Error(error.message));
			})
		);
	}
}
