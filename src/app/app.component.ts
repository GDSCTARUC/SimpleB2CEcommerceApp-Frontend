import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { FrontendTitle } from './consts/FrontendDefaults';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
	constructor(private titleService: Title) {}

	ngOnInit(): void {
		this.titleService.setTitle(`Home ${FrontendTitle}`);
	}
}
