import { NgModule } from '@angular/core';
import { AuthModule } from 'angular-auth-oidc-client';

@NgModule({
  imports: [
    AuthModule.forRoot({
      config: {
        authority: 'https://localhost:4000',
        redirectUrl: window.location.origin,
        postLogoutRedirectUri: window.location.origin,
        clientId: 'frontend',
        scope:
          'openid profile email address phone roles offline_access cart_api product_api',
        responseType: 'code',
        silentRenew: true,
        useRefreshToken: true,
        autoUserInfo: true,
        refreshTokenRetryInSeconds: 30,
        triggerRefreshWhenIdTokenExpired: true,
        renewTimeBeforeTokenExpiresInSeconds: 30,
      },
    }),
  ],
  exports: [AuthModule],
})
export class AuthConfigModule {}
