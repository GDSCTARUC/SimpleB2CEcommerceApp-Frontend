import { NgModule, isDevMode } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AbstractSecurityStorage } from 'angular-auth-oidc-client';
import { LocalstoreService } from './components/oidc/localstorge-service.service';

import { DefaultLayoutComponent } from './components/layouts/default-layout/default-layout.component';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { AccountComponent } from './pages/account/account.component';
import { LoginComponent } from './pages/login/login.component';
import { LogoutComponent } from './pages/logout/logout.component';
import { UnauthorizedComponent } from './pages/unauthorized/unauthorized.component';

import { SharedModule } from './shared.module';
import { CartService } from './services/cart-service.service';
import { ProductService } from './services/product-service.service';
import { OidcInterceptor } from './components/oidc/interceptor/oidc-interceptor.interceptor';
import { OidcGuard } from './components/oidc/guards/oidc-guard.guard';
import { AuthConfigModule } from './auth-config.module';

@NgModule({
	declarations: [
		AppComponent,
		DefaultLayoutComponent,
		HomeComponent,
		AccountComponent,
		LoginComponent,
		LogoutComponent,
		UnauthorizedComponent,
	],
	imports: [
		SharedModule,
		AuthConfigModule,
		BrowserModule,
		BrowserAnimationsModule,
		AppRoutingModule,
	],
	providers: [
		{
			provide: HTTP_INTERCEPTORS,
			useClass: OidcInterceptor,
			multi: true,
		},
		{
			provide: AbstractSecurityStorage,
			useClass: LocalstoreService,
		},
		OidcGuard,
		CartService,
		ProductService,
	],
	bootstrap: [AppComponent],
})
export class AppModule {}
