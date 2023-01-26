import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DefaultLayoutComponent } from './components/layouts/default-layout/default-layout.component';
import { AccountComponent } from './pages/account/account.component';
import { UnauthorizedComponent } from './pages/unauthorized/unauthorized.component';
import { HomeComponent } from './pages/home/home.component';

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
				path: 'forbidden',
				component: UnauthorizedComponent,
			},
			{
				path: 'unauthorized',
				component: UnauthorizedComponent,
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
