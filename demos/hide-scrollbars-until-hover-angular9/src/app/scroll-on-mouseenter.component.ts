
// Import the core angular services.
import { Component } from "@angular/core";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@Component({
	selector: "app-scroll-on-mouseenter",
	styles: [
		`
			:host {
				display: block ;
				overflow: hidden ;
			}
			.wrapper {
				width: calc( 100% - 16px ) ;
			}

			:host:hover {
				overflow: auto ;
				overscroll-behavior: contain ;
			}
			:host:hover .wrapper {
				width: 100% ;
			}
		`
	],
	template:
	`
		<div class="wrapper">
			<ng-content></ng-content>
		</div>
	`
})
export class ScrollOnMouseenterComponent {
	// ....
}
