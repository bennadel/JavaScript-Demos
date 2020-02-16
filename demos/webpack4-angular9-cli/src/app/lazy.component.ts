
// Import the core angular services.
import { Component } from "@angular/core";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@Component({
	selector: "app-lazy",
	styleUrls: [ "./lazy.component.less" ],
	template:
	`
		<p>
			I am the Lazy component!
		</p>

		<p>
			<img
				src="assets/like-a-boss.gif"
				width="498"
				height="226"
				alt="Animated GIF of the Like a Boss skit from Saturday Night Live."
			/>
		</p>
	`
})
export class LazyComponent {
	// ....
}
