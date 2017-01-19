
// Import the core angular services.
import { Component } from "@angular/core";

@Component({
	moduleId: module.id,
	selector: "my-layout",
	styleUrls: [ "./layout.component.css" ],
	template:
	`
		<div class="header-panel">
		
			<!-- Notice the duplicate usage - just to explore how it works. -->
			<ng-content select="ng-container[role=header]"></ng-content>
			<ng-content select="ng-container[role=header]"></ng-content>
		
		</div>

		<div class="body-panel">

			<!-- 
				Here, we project / transclude any content that is not being transcluded
				by more specific ng-content select methods. Notice that the wild-card
				ng-content does not have to be the last ng-content in the template.
			-->
			<ng-content></ng-content>

		</div>

		<div class="footer-panel">

			<!-- Notice the duplicate usage - just to explore how it works. -->
			<ng-content select="ng-container[role=footer]"></ng-content>
			<ng-content select="ng-container[role=footer]"></ng-content>

		</div>
	`
})
export class LayoutComponent {
	// ...
}
