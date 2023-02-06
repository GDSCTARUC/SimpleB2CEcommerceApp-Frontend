import { NgModule } from '@angular/core';

import { SharedModule } from 'src/app/shared.module';
import { AdminPanelRoutingModule } from './admin-panel-routing.module';
import { AdminPanelComponent } from './admin-panel.component';

@NgModule({
	declarations: [AdminPanelComponent],
	imports: [SharedModule, AdminPanelRoutingModule],
})
export class AdminPanelModule {}
