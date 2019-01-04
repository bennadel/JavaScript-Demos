
// Import the core angular services.
import { Component } from "@angular/core";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@Component({
	selector: "my-app",
	host: {
		"(document:click)": "handleClick()"
	},
	styleUrls: [ "./app.component.less" ],
	template:
	`
		<form (submit)="addFriend()">
			<input type="text" name="name" [(ngModel)]="name" placeholder="Name..." />
			<input type="submit" value="Add Friend" /><br />

			<label>
				<input type="checkbox" name="useImmutable" [(ngModel)]="useImmutable" />
				Use immutable <code>friends</code> data.
			</label>
		</form>


		<h2>
			{{ friends.length }} Friends Using Normal Binding:
		</h2>

		<!-- TEST ONE: Normal Change Detection. -->
		<ul logDoCheck="List-A">
			<li *ngFor="let friend of friends">
				{{ friend }}
			</li>
		</ul>


		<h2>
			{{ friends.length }} Friends Using Bind-Once:
		</h2>

		<!-- TEST TWO: Bind-Once Change Detection. -->
		<ul *bindOnce="friends" logDoCheck="List-B">
			<li *ngFor="let friend of friends">
				{{ friend }}
			</li>
		</ul>
	`
})
export class AppComponent {

	public friends: String[];
	public name: string;
	public useImmutable: boolean;

	// I initialize the app component.
	constructor() {

		this.friends = [ "Kim", "Seema", "Tricia" ];
		this.name = "";
		this.useImmutable = false;

	}

	// ---
	// PUBLIC METHODS.
	// ---

	// I add a new friend to the collection.
	public addFriend() : void {

		if ( this.name ) {

			// The [bindOnce] directive has the ability to listen for changes to a value;
			// however, it will only listen for changes to the top-level value reference.
			// As such, it won't see any change if we just .push() a value onto the
			// array - it will only see the change if we create a new friends array.
			if ( this.useImmutable ) {

				// [bindOnce]="friends" WILL SEE this change.
				this.friends = this.friends.concat( this.name );

			} else {

				// [bindOnce]="friends" will NOT SEE this change.
				this.friends.push( this.name );

			}

			this.name = "";

		}

	}


	// I handle the document-level click.
	// --
	// NOTE: This serves no purpose other than to show when a change-detection is
	// triggered based on a host-binding.
	public handleClick() : void {

		console.log( "Click ( will trigger change detection )" );

	}

}
