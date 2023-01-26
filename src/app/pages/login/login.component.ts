import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { OidcSecurityService } from 'angular-auth-oidc-client';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
	constructor(private oidcSecurityService: OidcSecurityService) {}

	ngOnInit(): void {
		this.oidcSecurityService.authorize();
	}
}
