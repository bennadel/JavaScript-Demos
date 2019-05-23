
// Import the core angular services.
import { Component } from "@angular/core";

// Import the application components and services.
import { ConfirmService } from "./confirm.service";
import { Friend } from "./friends.runtime";
import { FriendsRuntime } from "./friends.runtime";
import { PromptService } from "./prompt.service";
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
			&mdash;
			<a (click)="addFriendViaPrompt()">Add Friend via Prompt</a>
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

	private confirmService: ConfirmService;
	private friendsRuntime: FriendsRuntime;
	private promptService: PromptService;
	private subscriptions: SubscriptionManager;

	// I initialize the friends-view component.
	constructor(
		confirmService: ConfirmService,
		friendsRuntime: FriendsRuntime,
		promptService: PromptService
		) {

		this.confirmService = confirmService;
		this.friendsRuntime = friendsRuntime;
		this.promptService = promptService;

		this.friends = [];
		this.subscriptions = new SubscriptionManager();

	}

	// ---
	// PUBLIC METHODS.
	// ---

	// I add a friend using the Prompt instead of the add-friend modal window.
	public addFriendViaPrompt() : void {

		this.promptService
			.prompt( "What is your friend's name?", "Kim" )
			.then(
				( name ) => {

					if ( name ) {

						return( this.friendsRuntime.addFriend( name ) );

					}

				}
			)
			.catch(
				( error ) => {

					console.warn( "The new friend could not be added!" );
					console.error( error );

				}
			)
		;

	}


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

		Promise.resolve()
			.then(
				async () => {

					// NOTE: This is just a silly use-case. I am performing chained
					// confirmation calls just to see if it works. Note that both of the
					// confirmation calls are Promise based; and, that we're using the
					// async / await syntax to tie them together.
					if (
						await this.confirmService.confirm( `Are you sure you want to delete, ${ friend.name }?` ) &&
						await this.confirmService.confirm( `Are you really really really sure?` )
						) {

						return( this.friendsRuntime.removeFriend( friend.id ) );

					} else {

						console.info( "You opted not to delete your friend." );

					}

				}
			)
			.catch(
				( error ) => {

					console.warn( "The given friend could not be removed!" );
					console.error( error );

				}
			)
		;

	}

}
