import { NgModule } from '@angular/core';

import { EcommerceRoutingModule } from './ecommerce-routing.module';
import { EcommerceComponent } from './ecommerce.component';

import { SharedModule } from 'src/app/shared.module';

@NgModule({
	declarations: [EcommerceComponent],
	imports: [SharedModule, EcommerceRoutingModule],
})
export class EcommerceModule {}
