
// Import the core angular services.
import { Component } from "@angular/core";

// Import the application components and services.
import { UploadResult } from "./upload.service";
import { UploadService } from "./upload.service";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@Component({
	selector: "my-app",
	styleUrls: [ "./app.component.less" ],
	template:
	`
		<div class="upload">
			<span class="upload__label">
				Select File(s) to Upload
			</span>

			<input
				#fileInput
				type="file"
				[multiple]="true"
				class="upload__input"
				(change)="uploadFiles( fileInput.files ) ; fileInput.value = null;"
			/>
		</div>

		<h2>
			Uploads
		</h2>

		<ul class="uploads">
			<li *ngFor="let upload of uploads" class="uploads__item">

				<a [href]="upload.url" target="_blank" class="uploads__link">
					{{ upload.name }}
				</a>
				<span class="uploads__size">
					( Size: {{ upload.size | number }} bytes )
				</span>

			</li>
		</ul>
	`
})
export class AppComponent {

	public uploads: UploadResult[];

	private uploadService: UploadService;

	// I initialize the app component.
	constructor( uploadService: UploadService ) {

		this.uploadService = uploadService;
		this.uploads = [];

	}

	// ---
	// PUBLIC METHODS.
	// ---

	// I upload the given files to the remote API.
	public async uploadFiles( files: File[] ) : Promise<void> {

		// The given files collection is actually a "live collection", which means that
		// it will be cleared once the Input is cleared. As such, we need to create a
		// local copy of it so that it doesn't get cleared during the asynchronous file
		// processing within the for-of loop.
		for ( var file of Array.from( files ) ) {

			try {

				this.uploads.push(
					await this.uploadService.uploadFile( file )
				);

			} catch ( error ) {

				console.warn( "File upload failed." );
				console.error( error );

			}

		}

	}

}
