import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Cart } from '../response/card';
import { CartRequest } from '../request/cart-request';

@Injectable({
	providedIn: 'root',
})
export class CartService {
	constructor(private httpClient: HttpClient) {}

	public getCartWithId(id: number): Observable<Cart> {
		return this.httpClient.get<Cart>(
			`${environment.urls.apiUrl}/api_cart/cart/${id}/`
		);
	}

	public getCartWithUserId(id: number): Observable<Cart> {
		return this.httpClient.get<Cart>(
			`${environment.urls.apiUrl}/api_cart/cart/user/${id}/`
		);
	}

	public createCart(cartRequest: CartRequest): Observable<Cart> {
		return this.httpClient.post<Cart>(
			`${environment.urls.apiUrl}/api_cart/cart/`,
			cartRequest
		);
	}

	public updateCart(id: number, cartRequest: CartRequest): Observable<Cart> {
		return this.httpClient.put<Cart>(
			`${environment.urls.apiUrl}/api_cart/cart/${id}/`,
			cartRequest
		);
	}

	public deleteCart(id: number): Observable<object> {
		return this.httpClient.delete(
			`${environment.urls.apiUrl}/api_cart/cart/${id}/`
		);
	}
}
