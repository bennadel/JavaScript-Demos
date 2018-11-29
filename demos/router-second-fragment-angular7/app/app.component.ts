
// Import the core angular services.
import _ = require( "lodash" );
import { Component } from "@angular/core";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@Component({
	selector: "my-app",
	styleUrls: [ "./app.component.less" ],
	template:
	`
		<p id="top-of-page" class="nav">
			<a routerLink="." fragment="section-a">Section A</a>
			<a routerLink="." fragment="section-b">Section B</a>
		</p>

		<section id="section-a">

			<h2>
				Section A
			</h2>

			<p *ngFor="let i of range">
				Filler content goes here...
			</p>

		</section>

		<p>
			<a routerLink="." fragment="top-of-page">Back to Top</a>
		</p>

		<section id="section-b">

			<h2>
				Section B
			</h2>

			<p *ngFor="let i of range">
				Filler content goes here...
			</p>

		</section>

		<p>
			<a routerLink="." fragment="top-of-page">Back to Top</a>
		</p>
	`
})
export class AppComponent {

	public range: number[] = _.range( 1, 30 );

}
