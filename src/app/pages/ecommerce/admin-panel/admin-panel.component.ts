import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Product } from 'src/app/response/product';
import { ProductService } from 'src/app/services/product-service.service';

@Component({
	selector: 'app-admin-panel',
	templateUrl: './admin-panel.component.html',
	styleUrls: ['./admin-panel.component.css'],
})
export class AdminPanelComponent implements OnInit {
	public imageFileUrl = `${environment.urls.apiUrl}/api_product/static/image/`;
	public products!: Product[];

	constructor(private productService: ProductService) {}

	ngOnInit(): void {
		this.productService.getProducts().subscribe((products) => {
			this.products = products;
		});
	}
}
