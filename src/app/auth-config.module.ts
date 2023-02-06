import { NgModule } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthModule } from 'angular-auth-oidc-client';

@NgModule({
	imports: [
		AuthModule.forRoot({
			config: {
				authority: environment.urls.authUrl,
				redirectUrl: window.location.origin,
				postLogoutRedirectUri: window.location.origin,
				clientId: 'frontend',
				scope: 'openid profile email address phone roles offline_access cart_api product_api',
				responseType: 'code',
				autoUserInfo: true,
				silentRenew: true,
				useRefreshToken: true,
				ignoreNonceAfterRefresh: true,
				refreshTokenRetryInSeconds: 30,
				triggerRefreshWhenIdTokenExpired: false,
				renewTimeBeforeTokenExpiresInSeconds: 30,
			},
		}),
	],
	exports: [AuthModule],
})
export class AuthConfigModule {}
