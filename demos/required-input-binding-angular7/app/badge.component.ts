
// Import the core angular services.
import { ChangeDetectionStrategy } from "@angular/core";
import { Component } from "@angular/core";
import { OnChanges } from "@angular/core";
import { OnInit } from "@angular/core";
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
export class BadgeComponent implements OnInit, OnChanges {

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
	// --
	// CAUTION: If the calling context provides no input bindings on the bn-badge tag,
	// this method will never get called.
	public ngOnChanges( changes: SimpleChanges ) : void {

		this.assertUser();

	}


	// I get called after the input bindings have been defined for the first time.
	// --
	// NOTE: This method still gets called even if there are no input bindings. This is
	// different from the ngOnChanges() method above, which will only get called if input
	// bindings are actually defined.
	public ngOnInit() : void {

		this.assertUser();

	}

	// ---
	// PRIVATE METHODS.
	// ---

	// I assert that the user is defined (ie, that the required input binding was
	// actually provided by the calling context).
	private assertUser() : void {

		if ( ! this.user ) {

			throw( new Error( "Required input [user] not provided." ) );

		}

	}

}
