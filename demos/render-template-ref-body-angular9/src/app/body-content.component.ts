
// Import the core angular services.
import { Component } from "@angular/core";
import { TemplateRef } from "@angular/core";
import { ViewChild } from "@angular/core";
import { ViewContainerRef } from "@angular/core";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@Component({
	selector: "app-body-content",
	queries: {
		contentRef: new ViewChild( "contentRef" )
	},
	styleUrls: [ "./body-content.component.less" ],
	template:
	`
		<!--
			NOTE: On its own, the NgTemplate has no rendered output. As such, the
			projected content will have no output until the component explicitly renders
			it using the ViewContainerRef (in this case).
		-->
		<ng-template #contentRef>
			<ng-content></ng-content>
		</ng-template>
	`
})
export class BodyContentComponent {

	public contentRef!: TemplateRef<any>;

	private viewContainerRef: ViewContainerRef;

	// I initialize the body content component.
	constructor( viewContainerRef: ViewContainerRef ) {

		this.viewContainerRef = viewContainerRef;

	}

	// ---
	// PUBLIC METHODS.
	// ---

	// I get called once after the view bindings have been wired-up.
	public ngAfterViewInit() : void {

		// Render the TemplateRef as a SIBLING to THIS component.
		var embeddedViewRef = this.viewContainerRef.createEmbeddedView( this.contentRef );
		// NOTE: I don't if this call is actually needed. It doesn't seem to make a
		// difference in this particular demo; however, it is called in the Angular
		// Material code, so I assume it is important (in at least some cases).
		embeddedViewRef.detectChanges();

		// At this point, the embedded-view DOM (Document Object Model) branch has been
		// wired-together, complete with view-model bindings. We can now move the DOM
		// nodes - which, in this case, is made up of the NgContent-projected nodes -
		// into the BODY without breaking the template bindings.
		for ( var node of embeddedViewRef.rootNodes ) {

			document.body.appendChild( node );

		}

	}

}
