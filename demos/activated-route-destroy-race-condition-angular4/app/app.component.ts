
// Import the core angular services.
import { Component } from "@angular/core";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@Component({
	selector: "my-app",
	styleUrls: [ "./app.component.less" ],
	template:
	`
		<ul>
			<li>
				<a [routerLink]="[ 'child', 1 ]">Show Child 1</a> &mdash; (Router Link Property)
			</li>
			<li>
				<a routerLink="./child/2">Show Child 2</a> &mdash; (Router Link Attribute)
			</li>
			<li>
				<a href="#/child/3">Show Child 3</a> &mdash; (Vanilla HREF)

				&mdash;
				<strong>This one has FUNKY behavior</strong>.

				Now, before you go and write this off as an invalid use-case, remember
				that this is the same as if I copy/paste a URL into the browser; or, if I
				manually manipuate the URL.
			</li>
		</ul>

		<router-outlet></router-outlet>
	`
})
export class AppComponent {
	// ...
}
