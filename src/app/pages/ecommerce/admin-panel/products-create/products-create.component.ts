import { Component } from '@angular/core';
import {
	FormBuilder,
	FormControl,
	ReactiveFormsModule,
	Validators,
} from '@angular/forms';
import { ProductService } from 'src/app/services/product-service.service';
import { SharedModule } from 'src/app/shared.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
	standalone: true,
	selector: 'app-products-create',
	templateUrl: './products-create.component.html',
	styleUrls: ['./products-create.component.css'],
	imports: [
		SharedModule,
		ReactiveFormsModule,
		MatFormFieldModule,
		MatInputModule,
	],
})
export class ProductsCreateComponent {
	public productForm = this.formBuilder.group({
		name: new FormControl('', Validators.required),
		description: new FormControl('', Validators.required),
		originalPrice: new FormControl(0.0, Validators.required),
		discountPercentage: new FormControl(0, Validators.required),
	});

	public imageFile?: File;
	public errorMessage?: string;

	constructor(
		private router: Router,
		private productService: ProductService,
		private formBuilder: FormBuilder
	) {}

	onFormSubmit(event: Event) {
		event.preventDefault();

		let { name, description, originalPrice, discountPercentage } =
			this.productForm.value;

		if (this.imageFile !== undefined)
			this.productService.uploadImage(this.imageFile).subscribe({
				next: (imageUpload) => {
					this.productService
						.createProduct({
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
				.createProduct({
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
