
// Import the core angular services.
import { Directive } from "@angular/core";
import { EmbeddedViewRef } from "@angular/core";
import { OnChanges } from "@angular/core";
import { SimpleChanges } from "@angular/core";
import { TemplateRef } from "@angular/core";
import { ViewContainerRef } from "@angular/core";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@Directive({
	selector: "[bindOnce]",
	inputs:[ "bindOnce" ]
})
export class BindOnceDirective implements OnChanges {

	public bindOnce!: any;

	private embeddedViewRef: EmbeddedViewRef<void>;

	// I initialize the bind-once directive.
	constructor(
		templateRef: TemplateRef<void>,
		viewContainerRef: ViewContainerRef
		) {

		this.embeddedViewRef = viewContainerRef.createEmbeddedView( templateRef );
		// Since we want manual control over when the content of the view is checked,
		// let's immediately detach the view. This removes it from the change-detection
		// tree. Now, it will only be checked when we either re-attach it to the change-
		// detection tree or we explicitly call .detectChanges() (see ngOnChanges()).
		this.embeddedViewRef.detach();

	}

	// ---
	// PUBLIC METHODS.
	// ---

	// I get called when any of the input bindings are updated.
	public ngOnChanges( changes: SimpleChanges ) : void {

		// NOTE: Since this Directive uses an ATTRIBUTE-BASED SELECTOR, we know that the
		// ngOnChanges() life-cycle method will be called AT LEAST ONCE. As such, we can
		// be confident that the embedded view will be marked for changes at least once.
		// --
		// We also want to check the view for changes any time the input-binding is
		// changed. This gives the calling context a chance to drive changes based on a
		// single expression even when change-detection is limited.
		this.embeddedViewRef.detectChanges();

	}

}
