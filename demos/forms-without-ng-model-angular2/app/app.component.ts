
// Import the core angular services.
import { Component } from "@angular/core";

interface Friend {
	id: number;
	name: string;
}

@Component({
	moduleId: module.id,
	selector: "my-app",
	styleUrls: [ "./app.component.css" ],
	template:
	`
		<input type="text" [value]="textValue" (input)="textValue = $event.target.value;" />
		<input type="text" [value]="textValue" (input)="textValue = $event.target.value;" />
		<br /><br />


		<textarea [value]="textareaValue" (input)="textareaValue = $event.target.value;"></textarea>
		<textarea [value]="textareaValue" (input)="textareaValue = $event.target.value;"></textarea>
		<br /><br />


		<label>
			<input type="checkbox" [checked]="( checkboxValue === true )" (change)="checkboxValue = $event.target.checked;" />
			Do it?
		</label>
		<br />
			
		Set to 
		<a (click)="checkboxValue = true;">True</a> or
		<a (click)="checkboxValue = false;">False</a>
		<br /><br />


		<template ngFor let-friend [ngForOf]="friends">

			<label>
				<input type="radio" name="friend-group" [checked]="( radioValue === friend )" (change)="radioValue = friend;" />
				{{ friend.name }}
			</label>
			<br />

		</template>

		<a (click)="radioValue = friends[ 0 ];">Select the first friend.</a><br />
		<a (click)="radioValue = null;">Set to null.</a><br />
		<br />


		<select (change)="selectValue = ( $event.target.value && friends[ +$event.target.value ] || null );">
			<option>No Friends</option>
			
			<template ngFor let-friend [ngForOf]="friends" let-index="index">

				<option [value]="index" [selected]="( selectValue === friend )">
					{{ friend.name }}
				</option>
					
			</template>
		</select>
		<br />

		<a (click)="selectValue = friends[ 0 ];">Select the first friend.</a><br />
		<a (click)="selectValue = null;">Set to null.</a><br />
		<br />

		
		<hr />

		<h3>
			Debugging
		</h3>

		<strong>Text Value</strong>: {{ textValue | json }}<br />
		<strong>Textarea Value</strong>: {{ textareaValue | json }}<br />
		<strong>Checkbox Value</strong>: {{ checkboxValue | json }}<br />
		<strong>Radiobox Value</strong>: {{ radioValue | json }}<br />
		<strong>Select Value</strong>: {{ selectValue | json }}<br />
	`
})
export class AppComponent {
	
	public checkboxValue: boolean;
	public friends: Friend[];
	public radioValue: Friend;
	public selectValue: Friend;
	public textareaValue: string;
	public textValue: string;


	// I initialize the component.
	constructor() {

		this.checkboxValue = false;
		this.radioValue = null;
		this.selectValue = null;
		this.textareaValue = "Textarea!";
		this.textValue = "Text!";

		this.friends = [
			{
				id: 1,
				name: "Sarah"
			},
			{
				id: 2,
				name: "Tricia"
			},
			{
				id: 3,
				name: "Kim"
			}
		];

	}

}
