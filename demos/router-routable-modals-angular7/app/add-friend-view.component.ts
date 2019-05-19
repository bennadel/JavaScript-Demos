
// Import the core angular services.
import { Component } from "@angular/core";
import { ElementRef } from "@angular/core";
import { ViewChild } from "@angular/core";

// Import the application components and services.
import { FriendsRuntime } from "./friends.runtime";
import { ModalViewComponent } from "./modal-view.component";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@Component({
	selector: "add-friend-view",
	queries: {
		nameRef: new ViewChild( "nameRef" )
	},
	styleUrls: [ "./add-friend-view.component.less" ],
	template:
	`
		<a (click)="closeModal()" class="close">
			&times;
		</a>

		<h2 class="title">
			Add New Friend
		</h2>

		<form (submit)="processForm()" class="form">

			<div class="field">
				<input
					#nameRef
					type="text"
					name="name"
					[(ngModel)]="form.name"
					class="field__input"
				/>

				<button type="submit" class="field__submit">
					Add Friend
				</button>
			</div>

			<label for="add-friend-view-bulk-checkbox" class="bulk">
				<input
					id="add-friend-view-bulk-checkbox"
					type="checkbox"
					name="isBulkAction"
					[(ngModel)]="form.isBulkAction"
					class="bulk__input"
				/>

				<span class="bulk__label">
					I want to add multiple friends.
				</span>
			</label>

		</form>
	`
})
export class AddFriendViewComponent {
	
	public form: {
		isBulkAction: boolean;
		name: string;
	};
	public nameRef!: ElementRef;

	private friendsRuntime: FriendsRuntime;
	private modalViewComponent: ModalViewComponent;

	// I initialize the add-friend-view component.
	constructor(
		friendsRuntime: FriendsRuntime,
		modalViewComponent: ModalViewComponent
		) {

		this.friendsRuntime = friendsRuntime;
		this.modalViewComponent = modalViewComponent;

		this.form = {
			isBulkAction: false,
			name: ""
		};

	}

	// ---
	// PUBLIC METHODS.
	// ---

	// I close the modal window.
	public closeModal() : void {

		this.modalViewComponent.closeModal();

	}


	// I get called once after the view has been initialized.
	public ngAfterViewInit() : void {

		this.focusInput();

	}


	// I process the new friend form.
	public processForm() : void {

		if ( ! this.form.name.trim() ) {

			return;

		}

		this.friendsRuntime
			.addFriend( this.form.name )
			.then(
				( id ) => {

					if ( this.form.isBulkAction ) {
					
						this.form.name = "";
						this.focusInput();

					} else {

						this.closeModal();

					}

				},
				( error ) => {

					console.warn( "There was a problem adding the friend." );
					console.error( error );

				}
			)
		;

	}

	// ---
	// PRIVATE METHODS.
	// ---

	// I put the browser focus to the name input.
	private focusInput() : void {

		this.nameRef.nativeElement.focus();

	}

}
