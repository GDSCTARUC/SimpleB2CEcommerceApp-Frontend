import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AuthConfigModule } from './auth-config.module';
import { AbstractSecurityStorage } from 'angular-auth-oidc-client';
import { LocalstoreService } from './components/oidc/localstorge-service.service';

import { DefaultLayoutComponent } from './components/layouts/default-layout/default-layout.component';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { AccountComponent } from './pages/account/account.component';
import { LoginComponent } from './pages/login/login.component';
import { LogoutComponent } from './pages/logout/logout.component';
import { UnauthorizedComponent } from './pages/unauthorized/unauthorized.component';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatCardModule } from '@angular/material/card';
import { OidcGuard } from './components/oidc/guards/oidc-guard.guard';

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
		BrowserModule,
		BrowserAnimationsModule,
		AppRoutingModule,
		AuthConfigModule,
		MatButtonModule,
		MatIconModule,
		MatToolbarModule,
		MatMenuModule,
		MatCardModule,
	],
	providers: [
		{
			provide: AbstractSecurityStorage,
			useClass: LocalstoreService,
		},
		OidcGuard,
	],
	bootstrap: [AppComponent],
})
export class AppModule {}
