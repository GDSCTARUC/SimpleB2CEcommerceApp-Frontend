import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DefaultLayoutComponent } from './components/layouts/default-layout/default-layout.component';
import { AccountComponent } from './pages/account/account.component';
import { UnauthorizedComponent } from './pages/unauthorized/unauthorized.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { LogoutComponent } from './pages/logout/logout.component';
import { OidcGuard } from './components/oidc/guards/oidc-guard.guard';

const routes: Routes = [
	{
		path: '',
		component: DefaultLayoutComponent,
		children: [
			{
				path: '',
				component: HomeComponent,
			},
			{
				path: 'account',
				component: AccountComponent,
			},
			{
				path: 'login',
				component: LoginComponent,
			},
			{
				path: 'logout',
				component: LogoutComponent,
			},
			{
				path: 'forbidden',
				component: UnauthorizedComponent,
			},
			{
				path: 'unauthorized',
				component: UnauthorizedComponent,
			},
			{
				path: 'ecommerce',
				loadChildren: () =>
					import('./pages/ecommerce/ecommerce.module').then(
						(m) => m.EcommerceModule
					),
				canActivate: [OidcGuard],
			},
		],
	},
	{
		path: '**',
		redirectTo: '',
	},
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
