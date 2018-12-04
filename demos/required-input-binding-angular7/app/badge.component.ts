
// Import the core angular services.
import { ChangeDetectionStrategy } from "@angular/core";
import { Component } from "@angular/core";
import { OnChanges } from "@angular/core";
import { SimpleChanges } from "@angular/core";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

interface User {
	name: string;
	email: string;
	avatarUrl: string;
}

@Component({
	selector: "bn-badge",
	inputs: [ "user" ],
	changeDetection: ChangeDetectionStrategy.OnPush,
	styleUrls: [ "./badge.component.less" ],
	template:
	`
		<div class="layout">
			<div class="layout__avatar">
				<img [src]="user.avatarUrl" class="avatar" />
			</div>

			<div class="layout__info info">
				<div class="info__name">
					{{ user.name }}
				</div>
				<div class="info__email">
					{{ user.email }}
				</div>
			</div>
		</div>
	`
})
export class BadgeComponent implements OnChanges {

	// Since the user is provided by an outside context (as a required input binding),
	// it's defined value will not be know at instantiation time. As such, we'll use the
	// "Definite Assignment Assertion" (!) to tell TypeScript that we know this value
	// will be defined in some way by the time we use it; and, that TypeScript should
	// not worry about the value until then.
	public user!: User;

	// I initialize the badge component.
	constructor() {

		// We've used the "Definite Assignment Assertion" to tell TypeScript that this
		// value will be provided by a non-obvious means (provided after instantiation).
		// As such, we don't need to initialize it.
		// --
		// this.user = null;

	}

	// ---
	// PUBLIC METHODS.
	// ---

	// I get called after input bindings have been changed.
	public ngOnChanges( changes: SimpleChanges ) : void {

		// CAUTION: If the "user" is undefined, the component rendering will actually
		// break before it ever gets to this line. This logic is here for documentation
		// purposes - expressing the requirements of the input binding more so than the
		// actual data validation and error handling.
		if ( ! this.user ) {

			throw( new Error( "Required input [user] not provided." ) );

		}

	}

}
