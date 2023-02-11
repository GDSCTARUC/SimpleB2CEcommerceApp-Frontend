import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { FormsModule } from '@angular/forms';

@NgModule({
	imports: [
		CommonModule,
		RouterModule,
		FormsModule,
		MatButtonModule,
		MatIconModule,
		MatListModule,
		MatToolbarModule,
		MatSidenavModule,
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
		MatListModule,
		MatToolbarModule,
		MatSidenavModule,
		MatMenuModule,
		MatCardModule,
	],
})
export class SharedModule {}
