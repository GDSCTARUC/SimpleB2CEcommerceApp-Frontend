import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import {
	FormBuilder,
	FormControl,
	ReactiveFormsModule,
	Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/services/product-service.service';
import { SharedModule } from 'src/app/shared.module';

@Component({
	standalone: true,
	selector: 'app-products-update',
	templateUrl: './products-update.component.html',
	styleUrls: ['./products-update.component.css'],
	imports: [
		SharedModule,
		ReactiveFormsModule,
		MatFormFieldModule,
		MatInputModule,
	],
})
export class ProductsUpdateComponent implements OnInit {
	public imageFileUrl = `${environment.urls.apiUrl}/api_product/static/image/`;
	public productId!: number;
	public productForm = this.formBuilder.group({
		name: new FormControl('', Validators.required),
		description: new FormControl('', Validators.required),
		originalPrice: new FormControl(0.0, Validators.required),
		discountPercentage: new FormControl(0, Validators.required),
	});
	public imageFile?: File;
	public imageFileName!: string;
	public updatedAt!: string;
	public createdAt!: string;
	public errorMessage?: string;

	constructor(
		private route: ActivatedRoute,
		private router: Router,
		private productService: ProductService,
		private formBuilder: FormBuilder
	) {}

	ngOnInit(): void {
		this.productId = this.route.snapshot.params['id'];

		this.productService
			.getProductWithId(this.productId)
			.subscribe((response) => {
				this.productForm.patchValue({
					name: response.name,
					description: response.description,
					originalPrice: response.originalPrice,
					discountPercentage: response.discountPercentage,
				});

				this.imageFileName = response.imageFileName;
				this.updatedAt = response.updatedAt;
				this.createdAt = response.createdAt;
			});
	}

	onFormSubmit(event: Event) {
		event.preventDefault();

		let { name, description, originalPrice, discountPercentage } =
			this.productForm.value;

		if (this.imageFile !== undefined)
			this.productService.uploadImage(this.imageFile).subscribe({
				next: (imageUpload) => {
					this.productService
						.updateProduct(this.productId, {
							name: name!,
							description: description!,
							originalPrice: originalPrice!,
							discountPercentage: discountPercentage!,
							imageFileName: imageUpload.imageName,
						})
						.subscribe({
							next: () => this.router.navigateByUrl('/admin'),
							error: (err) => {
								this.errorMessage = 'Product create failed';
							},
						});
				},
				error: (err) => {
					this.errorMessage = 'Product image upload failed';
				},
			});
		else
			this.productService
				.updateProduct(this.productId, {
					name: name!,
					description: description!,
					originalPrice: originalPrice!,
					discountPercentage: discountPercentage!,
					imageFileName: '',
				})
				.subscribe({
					next: () => this.router.navigateByUrl('/admin'),
					error: (err) => {
						this.errorMessage = 'Product create failed';
					},
				});
	}

	onFileChange(event: Event) {
		let target = event.target as HTMLInputElement;

		if (target.files !== null && target.files !== undefined) {
			this.imageFile = target.files[0];
		}
	}
}
