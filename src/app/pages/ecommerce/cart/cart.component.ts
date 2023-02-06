import { Component, OnInit } from '@angular/core';

import { SharedModule } from 'src/app/shared.module';

import { OidcSecurityService } from 'angular-auth-oidc-client';
import { CartService } from 'src/app/services/cart-service.service';
import { Cart } from 'src/app/response/card';
import { Product } from 'src/app/response/product';
import { OidcUserData } from 'src/app/response/oidc-user-data';
import { ProductService } from 'src/app/services/product-service.service';

@Component({
	selector: 'app-cart',
	standalone: true,
	imports: [SharedModule],
	templateUrl: './cart.component.html',
	styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
	public userData!: OidcUserData;
	public cart!: Cart;
	public products: Product[] = [];

	constructor(
		private oidcService: OidcSecurityService,
		private cartService: CartService,
		private productService: ProductService
	) {}

	ngOnInit(): void {
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

		this.cartService
			.getCartWithUserId(this.userData.id)
			.subscribe((response) => {
				this.cart = response;

				response.productIds.forEach((productId) => {
					this.productService
						.getProductWithId(productId)
						.subscribe((product) => {
							this.products.push(product);
						});
				});
			});
	}

	removeFromCart(productId: number) {
		var index = this.cart.productIds.indexOf(productId);
		if (index !== -1) this.cart.productIds.splice(index, 1);

		this.products = this.products.filter(
			(product) => product.id !== productId
		);

		this.cartService.updateCart(this.cart.id, this.cart).subscribe();
	}
}
