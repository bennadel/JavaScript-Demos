
// Import the core angular services.
import { Component } from "@angular/core";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@Component({
	selector: "my-app",
	styleUrls: [ "./app.component.less" ],
	template:
	`
		<p>
			Drag-and-drop your <strong>text files</strong> to read them into the browser.
		</p>

		<ng-template [ngIf]="fileContent">
			<h2>
				Dropped File Content
			</h2>

			<code class="file-content">
				<pre>{{ fileContent }}</pre>
			</code>
		</ng-template>

		<!--
			In this exploration, I'm deferring the initiating "drag" event to the drop
			zone itself. By default, it is hidden, but it is listening to the WINDOW for
			drag events. Then, when the user drags a file over the window, the drop zone
			will bring itself into full view.
		-->
		<my-file-drop (textDrop)="renderFileContent( $event )">
			Drop Your File ( like it's hot )
		</my-file-drop>
	`
})
export class AppComponent {

	public fileContent: string;

	// I initialize the app component.
	constructor() {
		
		this.fileContent = "";

	}

	// ---
	// PUBLIC METHODS.
	// ---

	// I get called whenever change detection is triggered on this component.
	// --
	// NOTE: We are logging this in order to make sure that the MASSIVE NUMBER of drag
	// and drop events are not triggering unnecessary change-detection in the app.
	public ngDoCheck() : void {

		console.log( "App component ngDoCheck()" );

	}


	// When the user drops a text-file on the file-drop component, it will emit the
	// file-content as an event. I render the emitted file-content to the view.
	public renderFileContent( value: string ) : void {

		this.fileContent = value;

	}

}
