
// Import the core angular services.
import _ = require( "lodash" );
import { Component } from "@angular/core";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@Component({
	selector: "section-c",
	styleUrls: [ "./section.component.less" ],
	template: `
		<h2>
			Section C
		</h2>

		<nav class="nav">
			<a routerLink="./" fragment="sub-section-1" class="nav__item">Sub-Section C-One</a>
			<a routerLink="./" fragment="sub-section-2" class="nav__item">Sub-Section C-Two</a>
			<a routerLink="./" fragment="sub-section-3" class="nav__item">Sub-Section C-Three</a>
		</nav>

		<h3 id="sub-section-1">
			Sub-Section C-One
		</h3>

		<p *ngFor="let i of range">
			Content goes here and there and everywhere.
		</p>

		<h3 id="sub-section-2">
			Sub-Section C-Two
		</h3>

		<p *ngFor="let i of range">
			Content goes here and there and everywhere.
		</p>

		<h3 id="sub-section-3">
			Sub-Section C-Three
		</h3>

		<p *ngFor="let i of range">
			Content goes here and there and everywhere.
		</p>
	`
})
export class SectionCComponent {

	public range: number[] = _.range( 0, 20 );

}
