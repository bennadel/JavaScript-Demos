
// Import the core angular services.
import { Component } from "@angular/core";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@Component({
	selector: "my-app",
	styles: [`
		:host {
			animation: enter-animation 10s ease ;
			border: 3px solid #EAEAEA ;
			box-sizing: border-box ;
			display: block ;
			font-size: 16px ;
			padding: 20px 20px 20px 20px ;
		}

		@keyframes enter-animation {
			from {
				opacity: 0.0 ;
			}
			to {
				opacity: 1.0 ;
			}
		}

		child-component {
			margin: 20px 0px 20px 0px ;
		}
	`],
	template:
	`
		<div>
			This is the <strong>App</strong> component.
		</div>

		<child-component></child-component>

		<div>
			When this runs, you will see that the <strong>height</strong> animation of
			the child-component <strong>overrides the opacity</strong> animation of the
			app component because they are both named <strong>"enter-animation"</strong>.
		</div>
	`
})
export class AppComponent {
	// ...
}
