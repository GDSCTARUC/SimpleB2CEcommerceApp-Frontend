import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FormsModule } from '@angular/forms';

@NgModule({
	imports: [
		CommonModule,
		RouterModule,
		FormsModule,
		MatButtonModule,
		MatIconModule,
		MatToolbarModule,
		MatMenuModule,
		MatCardModule,
	],
	declarations: [],
	exports: [
		CommonModule,
		RouterModule,
		FormsModule,
		MatButtonModule,
		MatIconModule,
		MatToolbarModule,
		MatMenuModule,
		MatCardModule,
	],
})
export class SharedModule {}
