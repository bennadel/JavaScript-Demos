
// Import the core angular services.
import { Component } from "@angular/core";
import { EventEmitter } from "@angular/core";

// Import the application components and services.
import { Project } from "./app.component";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@Component({
	selector: "app-approach-three",
	inputs: [ "projects" ],
	styleUrls: [ "./approach-three.component.less" ],
	template:
	`
		<h2>
			Mixed Editing Approach
		</h2>

		<ul>
			<li
				*ngFor="let project of projects"
				[ngSwitch]="( project === selectedProject )">

				<app-approach-three-editor
					*ngSwitchCase="true"
					[value]="project.name"
					(valueChange)="saveProjectName( project, $event )"
					(cancel)="cancel()">
				</app-approach-three-editor>

				<div *ngSwitchCase="false" (click)="edit( project )">

					{{ project.name }}

				</div>

			</li>
		</ul>
	`
})
export class ApproachThreeComponent {

	public projects!: Project[];
	public selectedProject: Project | null;

	// I initialize the approach-three component.
	constructor() {

		this.selectedProject = null;

	}

	// ---
	// PUBLIC METHODS.
	// ---

	// I cancel editing of the selected project.
	public cancel() : void {

		this.selectedProject = null;

	}


	// I enable editing of the given project.
	public edit( project: Project ) : void {

		this.selectedProject = project;

	}


	// I handle the rename event, persisting the new value to the given project.
	public saveProjectName( project: Project, newName: string ) : void {

		// CAUTION: Normally, I would emit some sort of "rename" event to the calling
		// context. But, for the sake of simplicity, I'm just mutating the project
		// directly since having several sibling components that both edit project names
		// is incidental and not the focus of this exploration.
		project.name = newName;
		this.selectedProject = null;

	}

}

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

// FOR THE SAKE OF THE DEMO I'm keeping this component in the same file as the approach
// three component above in order to drive-home the intention that they are coupled
// together with intent. In reality, this component would be in a sibling file.
@Component({
	selector: "app-approach-three-editor",
	inputs: [ "value" ],
	outputs: [
		"cancelEvents: cancel",
		"valueChangeEvents: valueChange"
	],
	styleUrls: [ "./approach-three-editor.component.less" ],
	template:
	`
		<input
			type="text"
			name="value"
			autofocus
			[(ngModel)]="pendingValue"
			(keydown.Enter)="processChanges()"
			(keydown.Meta.Enter)="processChanges()"
			(keydown.Escape)="cancel()"
		/>

		<button (click)="processChanges()">
			Save
		</button>

		<a
			(click)="cancel()"
			(keydown.Enter)="cancel()"
			tabindex="0">
			Cancel
		</a>
	`
})
export class ApproachThreeEditorComponent {

	public cancelEvents: EventEmitter<void>;
	public pendingValue: string;
	public value!: string;
	public valueChangeEvents: EventEmitter<string>;

	// I initialize the approach-three editable component.
	constructor() {

		this.cancelEvents = new EventEmitter();
		this.pendingValue = "";
		this.valueChangeEvents = new EventEmitter();

	}

	// ---
	// PUBLIC METHODS.
	// ---

	// I cancel the editing of the value.
	public cancel() : void {

		this.cancelEvents.emit();

	}


	// I get called after the inputs are bound for the first time.
	public ngOnInit() : void {

		this.pendingValue = this.value;

	}


	// I process changes to the pending value.
	public processChanges() : void {

		// If the value hasn't changed, treat it like a cancel action.
		if ( this.pendingValue === this.value ) {

			this.cancelEvents.emit();

		} else {

			this.valueChangeEvents.emit( this.pendingValue );
		
		}

	}

}
