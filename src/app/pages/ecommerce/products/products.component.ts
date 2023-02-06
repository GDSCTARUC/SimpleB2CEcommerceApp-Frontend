import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { environment } from 'src/environments/environment';

import { SharedModule } from 'src/app/shared.module';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { ProductService } from 'src/app/services/product-service.service';
import { CartService } from 'src/app/services/cart-service.service';
import { Product } from 'src/app/response/product';
import { OidcUserData } from 'src/app/response/oidc-user-data';

@Component({
	standalone: true,
	selector: 'app-products',
	templateUrl: './products.component.html',
	styleUrls: ['./products.component.css'],
	imports: [SharedModule, MatCardModule],
})
export class ProductsComponent implements OnInit {
	public imageFileUrl = `${environment.urls.apiUrl}/api_product/static/image/`;
	public products!: Product[];
	public userData!: OidcUserData;

	constructor(
		private oidcService: OidcSecurityService,
		private cartService: CartService,
		private productService: ProductService
	) {}

	ngOnInit(): void {
		this.productService.getProducts().subscribe((response) => {
			this.products = response;
		});

		this.oidcService.getUserData().subscribe((data) => {
			this.userData = {
				id: data.sub,
				username: data.profile.username,
				firstName: data.profile.first_name,
				lastName: data.profile.last_name,
				isAdmin: data.profile.is_admin,
				email: data.email,
				emailVerified: data.email_verified,
			};
		});
	}

	addToCart(productId: number) {
		this.cartService.getCartWithUserId(this.userData.id).subscribe({
			next: (value) => {
				if (!value.productIds.includes(productId)) {
					this.cartService
						.updateCart(value.id, {
							...value,
							productIds: [...value.productIds, productId],
						})
						.subscribe();
				}
			},
			error: (err) => {
				this.cartService.createCart({
					userId: this.userData.id,
					productIds: [productId],
				});
			},
		});
	}
}
