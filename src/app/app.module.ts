import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AuthConfigModule } from './auth-config.module';

import { DefaultLayoutComponent } from './components/layouts/default-layout/default-layout.component';
import { AppComponent } from './app.component';
import { AccountComponent } from './pages/account/account.component';
import { UnauthorizedComponent } from './pages/unauthorized/unauthorized.component';
import { HomeComponent } from './pages/home/home.component';

@NgModule({
	declarations: [
		AppComponent,
		DefaultLayoutComponent,
		HomeComponent,
		AccountComponent,
		UnauthorizedComponent,
	],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		AppRoutingModule,
		AuthConfigModule,
	],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}
