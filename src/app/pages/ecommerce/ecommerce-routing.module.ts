import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './cart/cart.component';
import { OidcAdminGuard } from 'src/app/components/oidc/guards/oidc-admin-guard.guard';

const routes: Routes = [
	{
		path: '',
		children: [
			{
				path: 'admin',
				loadChildren: () =>
					import('./admin-panel/admin-panel.module').then(
						(m) => m.AdminPanelModule
					),
				canActivate: [OidcAdminGuard],
			},
			{
				path: 'cart',
				component: CartComponent,
			},
			{
				path: 'products',
				loadComponent: () =>
					import('./products/products.component').then(
						(m) => m.ProductsComponent
					),
			},
		],
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class EcommerceRoutingModule {}
