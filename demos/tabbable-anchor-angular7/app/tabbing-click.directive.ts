
// Import the core angular services.
import { Directive } from "@angular/core";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@Directive({
	selector: "a[click]:not([href]):not([role]):not([tabindex]):not([x-no-tabbing])",
	host: {
		// Adding [tabindex] allows tab-based access to this element. The "0" indicates
		// that the tabbing order should follow the native DOM element ordering.
		"tabindex": "0",
		// Adding [role] tells screen readers that this "link" is really a "button",
		// in that it triggers an action, but doesn't navigate to a new resource.
		"role": "button",
		// Adding (keydown) allows us to translate the Enter and Spacebar keys into a
		// "click" event. This is the native behavior of a Button; so, we are trying to
		// mimic that behavior for our "link button".
		// --
		// NOTE: This is perhaps a good "code smell" that we should be using a Button
		// instead of a link for this host element.
		"(keydown.enter)": "$event.preventDefault() ; $event.target.click() ;",
		"(keydown.space)": "$event.preventDefault() ; $event.target.click() ;"
	}
})
export class TabbingClickDirective {
	// ....
}
