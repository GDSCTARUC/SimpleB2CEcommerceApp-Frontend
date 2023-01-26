import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { OidcSecurityService } from 'angular-auth-oidc-client';

@Component({
	selector: 'app-logout',
	templateUrl: './logout.component.html',
	styleUrls: ['./logout.component.css'],
})
export class LogoutComponent implements OnInit {
	constructor(private oidcSecurityService: OidcSecurityService) {}

	ngOnInit(): void {
		this.oidcSecurityService.logoff().subscribe();
	}
}
