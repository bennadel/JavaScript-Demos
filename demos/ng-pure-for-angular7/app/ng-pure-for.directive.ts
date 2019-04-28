
// Import the core angular services.
import { Directive } from "@angular/core";
import { DoCheck } from "@angular/core";
import { Input } from "@angular/core";
import { NgForOf } from "@angular/common";
import { NgForOfContext } from "@angular/common";
import { NgIterable } from "@angular/core";
import { OnChanges } from "@angular/core";
import { TemplateRef } from "@angular/core";
import { TrackByFunction } from "@angular/core";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@Directive({
	selector: "[ngPureFor][ngPureForOf]"
})
export class NgPureForDirective<T> extends NgForOf<T> implements OnChanges, DoCheck {

	// This directive is really a very very very thin wrapper around the existing NgForOf
	// directive. It's using all the inherited functionality; only, it needs to alias
	// the input bindings since we're using a slightly different selector "ngPureFor".
	// And, since the native NgForOf directive uses the @Input() decorator, we need to
	// use it as well in order to setup the aliases.

	@Input( "ngPureForOf" )
	public ngForOf!: NgIterable<T>;

	@Input( "ngPureForTrackBy" )
	public ngForTrackBy!: TrackByFunction<T>;

	@Input( "ngPureForTemplate" )
	public ngForTemplate!: TemplateRef<NgForOfContext<T>>;

	// ---
	// PUBLIC METHODS.
	// ---

	// I get called whenever change-detection is triggered.
	public ngDoCheck() : void {

		// In the native NgForOf directive, the Differ for the NgForOf collection is
		// checked on every change-detection digest. However, since we're turning this
		// into a "pure" directive (so to speak), we want to override the ngDoCheck()
		// method such that IT DOES NO WORK during arbitrary change-detection digests.

	}


	// I get called whenever one of the input bindings is changed.
	public ngOnChanges() : void {

		// The ngOnChanges() method will be called if the ngForOf, ngForTrackBy, or 
		// ngForTemplate input bindings get changed. Since this is when we want to
		// actually perform our internal change-detection test, we can now turn around
		// and call the inherited ngDoCheck() method (on SUPER). This will inspect the
		// Differ and update the template rendering.
		super.ngDoCheck();

	}

}
