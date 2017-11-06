
// Import the core angular services.
import { Component } from "@angular/core";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@Component({
	selector: "my-app",
	styleUrls: [ "./app.component.less" ],
	template:
	`
		<p (everySecond)="ping1 = $event" (everyTwoSeconds)="ping2 = $event">

			Every Second: {{ ping1 }}<br />
			Every Two Seconds: {{ ping2 }}

		</p>
	`
})
export class AppComponent {

	public ping1: number = 0;
	public ping2: number = 0;

}
