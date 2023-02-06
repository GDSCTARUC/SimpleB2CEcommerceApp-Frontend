import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminPanelComponent } from './admin-panel.component';
import { ProductsCreateComponent } from './products-create/products-create.component';
import { ProductsUpdateComponent } from './products-update/products-update.component';

const routes: Routes = [
	{
		path: '',
		children: [
			{
				path: '',
				component: AdminPanelComponent,
			},
			{
				path: 'product-create',
				component: ProductsCreateComponent,
			},
			{
				path: 'product-update/:id',
				component: ProductsUpdateComponent,
			},
		],
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class AdminPanelRoutingModule {}
