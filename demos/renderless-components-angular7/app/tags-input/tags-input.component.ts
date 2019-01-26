
// Import the core angular services.
import { Component } from "@angular/core";

// Import the application components and services.
import { TagsInputCoreComponent } from "./tags-input-core.component";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

@Component({
	selector: "tags-input",
	inputs: [ "tags" ],
	outputs: [
		"tagsChangeEvents: tagsChange"
	],
	styleUrls: [ "./tags-input.component.less" ],
	template:
	`
		<label role="none" class="wrapper">

			<span *ngFor="let tag of tags" class="tag">
				<span class="tag__label">
					{{ tag }}
				</span>
				<span (click)="removeTag( tag )" class="tag__remove">
					&times;
				</span>
			</span>

			<input
				type="text"
				#name
				placeholder="Add tag..."
				(keydown.enter)="addTag( name.value ) ; name.value = '' ;"
				class="input"
			/>

		</label>
	`
})
export class TagsInputComponent extends TagsInputCoreComponent {
	
	// All business logic is being provided by the TagsInputCore component. I am simply
	// providing a View Template variation on the core component.

}
