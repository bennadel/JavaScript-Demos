
// Import the core angular services.
import { Component } from "@angular/core";

// Import the application components and services.
import { Friend } from "./friends.runtime";
import { FriendsRuntime } from "./friends.runtime";
import { SubscriptionManager } from "./subscription-manager";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@Component({
	selector: "friends-view",
	styleUrls: [ "./friends-view.component.less" ],
	template:
	`
		<h2>
			Friends
		</h2>

		<p>
			<a [routerLink]="[ '/app', { outlets: { modal: 'modal/add-friend' } } ]">
				Add Friends From Friends
			</a>
		</p>

		<ul *ngIf="friends.length">
			<li *ngFor="let friend of friends">

				<div class="friend">
					<span class="friend__name">
						{{ friend.name }}
					</span>

					<a (click)="removeFriend( friend )" class="friend__remove">
						remove friend {{ friend.id }}
					</a>
				</div>

			</li>
		</ul>
	`
})
export class FriendsViewComponent {

	public friends: Friend[];

	private friendsRuntime: FriendsRuntime;
	private subscriptions: SubscriptionManager;

	// I initialize the friends-view component.
	constructor( friendsRuntime: FriendsRuntime ) {

		this.friendsRuntime = friendsRuntime;

		this.friends = [];
		this.subscriptions = new SubscriptionManager();

	}

	// ---
	// PUBLIC METHODS.
	// ---

	// I get called once when the component it being unmounted.
	public ngOnDestroy() : void {

		this.subscriptions.unsubscribe();

	}


	// I get called once after the inputs have been bound for the first time.
	public ngOnInit() : void {

		this.subscriptions.add(
			this.friendsRuntime.getFriends().subscribe(
				( friends ) => {

					this.friends = friends;

				}
			)
		);

	}


	// I remove the given friend.
	public removeFriend( friend: Friend ) : void {

		this.friendsRuntime
			.removeFriend( friend.id )
			.catch(
				( error ) => {

					console.warn( "The given friend could not be removed!" );
					console.error( error );

				}
			)
		;

	}

}
