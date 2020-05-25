
// Import the core angular services.
import { Component } from "@angular/core";

// Import the application components and services.
import { TemporaryStorageFacet } from "./temporary-storage.service";
import { TemporaryStorageService } from "./temporary-storage.service";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

interface Friend {
	id: number;
	name: string;
	nickname: string;
	description: string;
}

// NOTE: I'm using a longer name for this Interface so as not to cause confusion with
// the native FormData interface that is provided to help AJAX form-submissions.
interface NewFriendFormData {
	name: string;
	nickname: string;
	description: string;
}

@Component({
	selector: "app-root",
	styleUrls: [ "./app.component.less" ],
	templateUrl: "./app.component.html"
})
export class AppComponent {

	public friends: Friend[];
	public formData: NewFriendFormData;

	private temporaryStorage: TemporaryStorageFacet;

	// I initialize the app component.
	constructor( temporaryStorageService: TemporaryStorageService ) {

		// The TemporaryStorageService is a glorified key-value store. And, for this
		// component, we are going to store all of the temporary form-data in a single
		// key. As such, we can make our lives easier by creating a "Facet" of the
		// temporary storage, which locks-in a key, allowing us to make subsequent calls
		// against the facet without providing a key.
		this.temporaryStorage = temporaryStorageService.forKey( "new_friend_form" );

		this.friends = [];
		this.formData = {
			name: "",
			nickname: "",
			description: ""
		};

	}

	// ---
	// PUBLIC METHODS.
	// ---

	// I get called when the component is being unmounted.
	// --
	// NOTE: This life-cycle method never actually gets called in this demo; I'm just
	// including it here to help paint the picture of how the temporary storage could be
	// populated and then cleared during the life-time of a Component.
	public ngOnDestroy() : void {

		this.temporaryStorage.remove();

	}


	// I get called once after the input bindings have been wired-up.
	public ngOnInit() : void {

		this.restoreFromTemporaryStorage();

	}


	// I process the new-friend form.
	public processNewFriend() : void {

		if ( ! this.formData.name ) {

			return;

		}

		this.friends.push({
			id: Date.now(),
			name: this.formData.name,
			nickname: this.formData.nickname,
			description: this.formData.description
		});

		// Reset the form's view-model.
		this.formData.name = "";
		this.formData.nickname = "";
		this.formData.description = "";

		// Now that we've processed the new-friend form, we can flush any temporarily-
		// cached form data from our temporary storage.
		this.temporaryStorage.remove();

	}


	// I attempt to load persisted data from our Facet of the TemporaryStorageService
	// into the current view-model of the form-data.
	public async restoreFromTemporaryStorage() : Promise<void> {

		var cachedFormData = await this.temporaryStorage.get<NewFriendFormData>();

		if ( cachedFormData ) {

			Object.assign( this.formData, cachedFormData );

		}

	}


	// I save the current form-data view-model to the temporary storage.
	public saveToTemporaryStorage() : void {

		// NOTE: If I wanted to save a tiny bit of memory, I could check to see if any of
		// the form-data was actually populated before I persisted it to the temporary
		// storage. But, seeing as I would generally remove this data during the
		// ngOnDestroy() life-cycle event, there's really no need to make the code more
		// "clever" than it has to be.
		this.temporaryStorage.set( this.formData );

	}

}
