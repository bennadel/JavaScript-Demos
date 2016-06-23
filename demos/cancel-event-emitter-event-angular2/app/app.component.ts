
// Import the core angular services.
import { Component } from "@angular/core";

// Import the application components and services.
import { FileUploaderComponent } from "./file-uploader.component";
import { FileAddEvent } from "./file-add-event";

@Component({
	selector: "my-app",
	directives: [ FileUploaderComponent ],
	template:
	`
		<p>
			You can drag-n-drop files onto the hit target.
			( <strong>PNG files not allowed</strong> )
		</p>

		<file-uploader 
			(fileAdd)="handleFileAdd( $event )">
		</file-uploader>
	`
})
export class AppComponent {

	// I handle the fileAdd event on the uploader and determine if the given file 
	// can be added to the upload queue. The default behavior is that all files will
	// be allowed unless explicitly prevented.
	public handleFileAdd( event: FileAddEvent ) : void {

		var isPngFile = /\.(png)$/i.test( event.file.name );

		// If the dropped file is a PNG, prevent it from being added to the uploader.
		// Since the uploader isn't controlled by a one-way data flow of files, we do
		// this by preventing the default behavior on the given event object. 
		isPngFile && event.preventDefault();

	}

}