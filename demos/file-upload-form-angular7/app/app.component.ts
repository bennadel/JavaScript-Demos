
// Import the core angular services.
import { Component } from "@angular/core";

// Import the application components and services.
import { JobApplicationService } from "./job-application.service";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@Component({
	selector: "my-app",
	styleUrls: [ "./app.component.less" ],
	template:
	`
		<h2>
			Job Application
		</h2>

		<form (submit)="submitApplication()">

			<div class="field">
				<label class="field__label">
					Name:
				</label>
				<input type="text" name="name" [(ngModel)]="form.name" class="field__input" />
			</div>

			<div class="field">
				<label class="field__label">
					Email:
				</label>
				<input type="text" name="email" [(ngModel)]="form.email" class="field__input" />
			</div>

			<div class="field">
				<label class="field__label">
					Cover Letter:
				</label>
				<textarea name="memo" [(ngModel)]="form.memo" class="field__textarea"></textarea>
			</div>

			<div class="field">
				<label class="field__label">
					Resume:
				</label>
				<input
					#resumeRef
					type="file"
					name="resume"
					(change)="( form.resume = resumeRef.files )"
					class="field__input"
				/>
			</div>

			<div class="field">
				<label class="field__label">
					Code Sample:
				</label>
				<input
					#sampleRef
					type="file"
					name="sample"
					(change)="( form.sample = sampleRef.files )"
					class="field__input"
				/>
			</div>

			<div class="actions">
				<button type="submit" class="actions__primary">
					Submit Application
				</button>
			</div>

		</form>
	`
})
export class AppComponent {

	public form: {
		name: string;
		email: string;
		memo: string;
		resume: FileList | null;
		sample: FileList | null;
	};

	private jobApplicationService: JobApplicationService;

	// I initialize the app component.
	constructor( jobApplicationService: JobApplicationService ) {

		this.jobApplicationService = jobApplicationService;

		this.form = {
			name: "",
			email: "",
			memo: "",
			resume: null,
			sample: null
		};

	}

	// ---
	// PUBLIC METHODS.
	// ---

	// I submit the job application form.
	public submitApplication() : void {

		var name = this.form.name;
		var email = this.form.email;
		var memo = this.form.memo;

		// Dealing with the files requires a tiny bit of elbow-grease. Since NgModel
		// won't automatically grab the files from the file-input, we have to use the
		// (changes) event to grab them manually. Then, we have to pluck the first
		// File Blob from the given FileList.
		var resume = ( this.form.resume && this.form.resume.length )
			? this.form.resume[ 0 ]
			: null
		;
		var sample = ( this.form.sample && this.form.sample.length )
			? this.form.sample[ 0 ]
			: null
		;

		this.jobApplicationService
			.submitApplication({
				name: name,
				email: email,
				memo: memo,
				resume: resume,
				sample: sample
			})
			.then(
				() => {

					alert( "Thank you for your interest!" );

				},
				( error ) => {

					alert( "Something went wrong with the form-submission." );
					console.warn( "Error submitting job application." );
					console.error( error );

				}
			)
		;

	}

}
