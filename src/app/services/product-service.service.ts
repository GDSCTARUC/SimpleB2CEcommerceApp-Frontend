import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { Product } from '../response/product';
import { ProductRequest } from '../request/product-request';
import { ImageUpload } from '../response/image-upload';

@Injectable({
	providedIn: 'root',
})
export class ProductService {
	constructor(private httpClient: HttpClient) {}

	public uploadImage(imageFile: File): Observable<ImageUpload> {
		const formData = new FormData();

		formData.append('imageFile', imageFile);

		return this.httpClient.post<ImageUpload>(
			`${environment.urls.apiUrl}/api_product/static/image/upload/`,
			formData
		);
	}

	public getProducts(): Observable<Product[]> {
		return this.httpClient.get<Product[]>(
			`${environment.urls.apiUrl}/api_product/product/`
		);
	}

	public getProductWithId(id: number): Observable<Product> {
		return this.httpClient.get<Product>(
			`${environment.urls.apiUrl}/api_product/product/${id}/`
		);
	}

	public createProduct(productRequest: ProductRequest): Observable<Product> {
		return this.httpClient.post<Product>(
			`${environment.urls.apiUrl}/api_product/product/`,
			productRequest
		);
	}

	public updateProduct(
		id: number,
		productRequest: ProductRequest
	): Observable<object> {
		return this.httpClient.put(
			`${environment.urls.apiUrl}/api_product/product/${id}/`,
			productRequest
		);
	}

	public deleteProductWithId(id: number) {
		return this.httpClient.delete(
			`${environment.urls.apiUrl}/api_product/product/${id}/`
		);
	}
}
