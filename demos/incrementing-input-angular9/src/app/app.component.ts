
// Import the core angular services.
import { Component } from "@angular/core";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@Component({
	selector: "app-root",
	styleUrls: [ "./app.component.less" ],
	template:
	`
		<h3>
			Using <code>[(value)]</code>
		</h3>

		<p>
			<!--
				When using [value], we can just use the "box of bananas" syntax to
				implicitly catch the (valueChange) event and pipe it back into the value
				property binding.
			-->
			<input
				type="text"
				incrementingInput
				[(value)]="value"
			/>
		</p>

		<h3>
			Using <code>[(ngModel)]</code> And <code>(valueChange)</code>
		</h3>

		<p>
			<!--
				When using ngModel to control the input, we have to explicitly catch the
				(valueChange) event for the increment and then pipe it back into the
				view-model where ngModel will be able to apply it the input control.
			-->
			<input
				type="text"
				[(ngModel)]="value"
				incrementingInput
				(valueChange)="( value = $event )"
			/>
		</p>
	`
})
export class AppComponent {

	public value: string = "box-shadow: 3px 2px 2px rgba( 0, 0, 0, 0.2 )";

}
