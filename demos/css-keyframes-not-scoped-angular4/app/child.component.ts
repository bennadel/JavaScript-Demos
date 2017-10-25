
// Import the core angular services.
import { Component } from "@angular/core";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@Component({
	selector: "child-component",
	styles: [`
		:host {
			animation: enter-animation 10s ease ;
			border: 3px solid #CCCCCC ;
			box-sizing: border-box ;
			display: block ;
			height: 100px ;
			padding: 20px 20px 20px 20px ;
		}

		@keyframes enter-animation {
			from {
				height: 0px ;
			}
			to {
				height: 100px ;
			}
		}
	`],
	template: 
	`
		This is the <strong>Child</strong> component.
	`
})
export class ChildComponent {
	// ...
}
