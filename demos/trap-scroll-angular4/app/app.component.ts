
// Import the core angular services.
import { Component } from "@angular/core";
import { DoCheck } from "@angular/core";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@Component({
	selector: "my-app",
	styleUrls: [ "./app.component.less" ],
	template:
	`
		<div trapScroll trapKeyScroll class="control-case">

			<p>
				I trap <strong>wheel &amp; keyboard events</strong>
			</p>
			
			<textarea rows="5" columns="50"
				>This textarea should be allowed to scroll, within a trap container.
			</textarea>

			<input type="text" size="50" />

			<div class="overflower">
				This is overflowing ...<br />
				<br /><br /><br /><br /><br />
				THis is the bottom.
			</div>

		</div>

		<p class="spacer">
			Scroll down to find scrollable elements.
		</p>

		<!-- By default [trapScroll] will only trap the mouse wheel. -->
		<div trapScroll class="outer">

			<p>
				I trap <strong>wheel events</strong>.
			</p>

			<!-- Adding [trapKeyScroll] will also trap keyboard scrolling. -->
			<div trapScroll trapKeyScroll class="inner">

				<p>
					I trap <strong>wheel &amp; keyboard events</strong>
				</p>

				<ul class="spacer">
					<li>Space</li>
					<li>Shift+Space</li>
					<li>ArrowUp</li>
					<li>ArrowDown</li>
					<li>PageUp</li>
					<li>PageDown</li>
					<li>Home</li>
					<li>End</li>
				</ul>

			</div>

			<p class="spacer">
				This is some content.
			</p>

		</div>
	`
})
export class AppComponent implements DoCheck {
	
	// I get called on every change-detection digest. By hooking into this life-cycle
	// event method, we can see that the event-bindings in the TrapScrollDirective 
	// DO NOT TRIGGER change-detection digests in component tree.
	public ngDoCheck() : void {

		console.log( "ngDoCheck() in App Component." );

	}

}
