
// Import the core angular services.
import { Component } from "@angular/core";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@Component({
	selector: "my-app",
	styleUrls: [ "./app.component.less" ],
	template:
	`
		<select name="selectValue" [(ngModel)]="selectValue">
			<!-- No options provided for control. -->
		</select>
	`
})
export class AppComponent {

	public selectValue: string;

	// I initialize the app component.
	constructor() {

		this.selectValue = "initial value";

		// Let's see what Angular does to the value after the page has had a chance
		// to render and the ngModel directive has synchronized the form values.
		setTimeout(
			() => {

				console.group( "Select Value" );
				console.log( this.selectValue );
				console.groupEnd();

			},
			3000
		);

	}

}
