
// Import the core angular services.
import { Component } from "@angular/core";

@Component({
	selector: "bn-widget-bem",
	styles: [
		`
			:host {
				display: block ;
				font-size: 18px ;
				margin: 20px 0px 20px 0px ;
			}

			span.__header,
			span.__content,
			/* NOTICE: There is no ".aside" in the list of selectors. */
			span.__footer {
				display: block ;
				margin: 5px 0px 5px 0px ;
			}
		`
	],
	template:
	`
		<span class="__header">This is my Header.</span>
		<span class="__content">This is my Content.</span>
		<span class="aside">This is my Aside.</span>
		<span class="__footer">This is my Footer.</span>
	`
})
export class WidgetBemComponent {
	// ...
}
