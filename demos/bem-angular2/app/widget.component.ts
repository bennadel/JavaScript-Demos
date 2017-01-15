
// Import the core angular services.
import { Component } from "@angular/core";

@Component({
	selector: "bn-widget",
	styles: [
		`
			:host {
				display: block ;
				font-size: 18px ;
				margin: 20px 0px 20px 0px ;
			}

			span.header,
			span.content,
			/* NOTICE: There is no ".aside" in the list of selectors. */
			span.footer {
				display: block ;
				margin: 5px 0px 5px 0px ;
			}
		`
	],
	template:
	`
		<span class="header">This is my Header.</span>
		<span class="content">This is my Content.</span>
		<span class="aside">This is my Aside.</span>
		<span class="footer">This is my Footer.</span>
	`
})
export class WidgetComponent {
	// ...
}
