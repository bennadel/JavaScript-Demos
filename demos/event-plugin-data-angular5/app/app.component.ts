
// Import the core angular services.
import { Component } from "@angular/core";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@Component({
	selector: "my-app",
	styleUrls: [ "./app.component.less" ],
	template:
	`
		<p 
			(mousedownOutside)="handleMousedown()"
			data-ignoreMousedownOutside="h1, p.omit"
			class="origin">

			I listen for "mousedown outside" events &mdash; but ignore the 
			<code>h1</code> and the <code>p.omit</code> tags.
		</p>

		<p class="omit">
			Outside origin, but will <em>not</em> trigger event.
		</p>
	`
})
export class AppComponent {

	public handleMousedown() : void {

		console.log( "(mousedownOutside) of origin." );

	}

}
