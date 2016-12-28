
// Import the core angular services.
import { Component } from "@angular/core";

@Component({
	selector: "my-app",
	styles: [
		`
			:host {
				display: block ;
			}
			
			/*
				By using the "deep" operator ( >>> or /deep/ ), we can provide override
				styles for any component consumed within this application component tree.
				Since we are deep-scoping this to the :host element, Angular will use an 
				attribute selector followed by the type selector:
				--
				[ _nghost-blam-1 ] info-box { ...overrides... }
				--
				... which will be able to override default host styles provided in the 
				info-box component itself since the info-box component will only be using
				an attribute selector.
				--
				Attribute + Type > Attribute
				--
				As such, the CSS selector below will have a higher specificity.
			*/
			:host >>> info-box {
				margin: 16px 0px 16px 0px ;
			}

			/*
				We can also override a specific instance of the info-box host element. 
				Since this is an element inside the current component's shadow-DOM, it
				will be given an attribute selector:
				--
				info-box.mini[ _ngcontent-blam-1 ] { ...overrides... }
				--
				... which will be able to override default host styles provided in the
				info-box component itself since the info-box component will only be using 
				an attribute selector.
				--
				Type + Class + Attribute > Attribute
				--
				As such, the CSS selector below will have a higher specificity than both
				the deep-scoping overrides above and the default info-box styles.
			*/
			info-box.mini {
				margin: 8px 0px 8px 0px ;
			}
		`
	],
	template:
	`
		<info-box
			avatarUrl="./sarah.png"
			name="Sarah Connor"
			title="Freedom Fighter">
		</info-box>

		<info-box
			avatarUrl="./sarah.png"
			name="Sarah Connor"
			title="Freedom Fighter"
			class="mini">
		</info-box>
	`
})
export class AppComponent {
	// ...
}
