
// Import the core angular services.
import { Component } from "@angular/core";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@Component({
	selector: "layout-wrapper",
	styleUrls: [ "./layout-wrapper.component.css" ],
	template: 
	`
		<p>
			<a routerLink="./layout-a">Layout A</a> &mdash;
			<a routerLink="./layout-b">Layout B</a> &mdash;
			
			<strong>Chat:</strong>
			<a [routerLink]="[{ outlets: { chat: 'open' } }]">Open</a> /
			<a [routerLink]="[{ outlets: { chat: null } }]">Close</a>
		</p>

		<!-- The PRIMARY outlet. -->
		<router-outlet></router-outlet>
		
		<!-- The NAMED outlet for the CHAT widget. -->
		<router-outlet name="chat"></router-outlet>
	`
})
export class LayoutWrapperComponent {
	// ...
}
