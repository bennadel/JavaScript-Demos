
// Import the core angular services.
import { Component } from "@angular/core";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@Component({
	selector: "my-app",
	styleUrls: [ "./app.component.less" ],
	template:
	`
		<div class="pattern">
			<!--
				This container will be UNDER the blocks (positioned absolutely) and will
				contain a pattern that will show through the opacity of the blocks.
			-->
		</div>

		<div class="blocks">
			<div class="block block-100">
				#FF0099 - 100%
			</div>

			<div class="block block-80">
				#FF0099 - 80%
			</div>

			<div class="block block-60">
				#FF0099 - 60%
			</div>

			<div class="block block-40">
				#FF0099 - 40%
			</div>

			<div class="block block-20">
				#FF0099 - 20%
			</div>

			<div class="block block-0">
				#FF0099 - 0%
			</div>
		</div>
	`
})
export class AppComponent {
	// ...
}
