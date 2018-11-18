
// Import the core angular services.
import _ = require( "lodash" );
import { Component } from "@angular/core";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@Component({
	selector: "section-a",
	styleUrls: [ "./section.component.less" ],
	template: `
		<h2>
			Section A
		</h2>

		<nav class="nav">
			<a routerLink="./" fragment="sub-section-1" class="nav__item">Sub-Section A-One</a>
			<a routerLink="./" fragment="sub-section-2" class="nav__item">Sub-Section A-Two</a>
			<a routerLink="./" fragment="sub-section-3" class="nav__item">Sub-Section A-Three</a>
		</nav>

		<h3 id="sub-section-1">
			Sub-Section A-One
		</h3>

		<p *ngFor="let i of range">
			Content goes here and there and everywhere.
		</p>

		<h3 id="sub-section-2">
			Sub-Section A-Two
		</h3>

		<p *ngFor="let i of range">
			Content goes here and there and everywhere.
		</p>

		<h3 id="sub-section-3">
			Sub-Section A-Three
		</h3>

		<p *ngFor="let i of range">
			Content goes here and there and everywhere.
		</p>
	`
})
export class SectionAComponent {

	public range: number[] = _.range( 0, 20 );

}
