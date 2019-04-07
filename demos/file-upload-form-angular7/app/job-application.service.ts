
// Import the core angular services.
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

interface JobApplication {
	name: string;
	email: string;
	memo: string;
	resume: File | null;
	sample: File | null;
}

@Injectable({
	providedIn: "root"
})
export class JobApplicationService {

	private httpClient: HttpClient;

	// I initialize the job-application service.
	constructor( httpClient: HttpClient ) {

		this.httpClient = httpClient;

	}

	// ---
	// PUBLIC METHODS.
	// ---

	// I submit the given job application and selected files. Returns a Promise.
	public async submitApplication( application: JobApplication ) : Promise<void> {

		var formData = new FormData();

		// The FormData object provides a way to programmatically submit data that the
		// Browser could have natively submitted using a "<form/>" tag. Each entry here
		// represents a form-control field.
		formData.append( "name", application.name );
		formData.append( "email", application.email );
		formData.append( "memo", application.memo );

		// While the above values are "simple" values, we can add File Blobs to the
		// FormData in the exactly same way.
		// --
		// NOTE: An optional "filename" can be provided for Files. But, for this demo,
		// we're going to allow the native filename to be used for the uploads.
		( application.resume ) && formData.append( "resume", application.resume );
		( application.sample ) && formData.append( "sample", application.sample );

		var result = await this.httpClient
			.post<void>(
				"./api/upload.cfm",
				formData

				// NOTE: When using a FormData instance to define the request BODY, the
				// correct Content-Type will be automatically provided, along with the 
				// necessary "boundary" option that delimits the field values. If you
				// attempt to define the Content-Type explicitly, the "boundary" value
				// will be omitted from the post which will prevent the Lucee Server
				// parsing the request into the Form scope properly.
				// --
				// {
				// 	headers: {
				// 		"Content-Type": "multipart/form-data"
				// 	}
				// }
			)
			.toPromise()
		;

	}
	
}
