
// Import the core angular services.
import { Component } from "@angular/core";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

interface Item {
	id: number;
	label: string;
	position: {
		left: number;
		top: number;
	}
}

@Component({
	selector: "my-app",
	styleUrls: [ "./app.component.less" ],
	template:
	`
		<p>
			You can click and drag the following things around:
		</p>

		<my-draggable>
			<my-draggable-item
				*ngFor="let item of items"
				[left]="item.position.left"
				[top]="item.position.top"
				(dragStart)="enableDragProtection()"
				(dragEnd)="disableDragProtection()"
				(move)="updateItemPosition( item, $event.left, $event.top )">

				<div class="item">
					{{ item.label }}
				</div>

			</my-draggable-item>
		</my-draggable>

		<label class="toggle">
			<input
				#toggle
				type="checkbox"
				checked
				(click)="handleShieldToggle( toggle.checked )"
			/>
			Use drag-shield while dragging.
		</label>

		<div
			*ngIf="( isProtectingDragAction && isUsingShieldInDemo )"
			class="drag-shield">
			<span class="drag-shield__message">
				I am here to prevent mouse-events from hitting lower-level DOM elements.
			</span>
		</div>
	`
})
export class AppComponent {
	
	public isProtectingDragAction: boolean;
	public isUsingShieldInDemo: boolean;
	public items: Item[];

	// I initialize the app component.
	constructor() {

		this.isProtectingDragAction = false;
		this.isUsingShieldInDemo = true;
		this.items = this.generateItems( 30, 500, 500 );

	}

	// ---
	// PUBLIC METHODS.
	// ---

	// I disable the drag-shield protection (ie, I hide the drag-shield).
	public disableDragProtection() : void {

		this.isProtectingDragAction = false;

	}


	// I enable the drag-shield protection (ie, I show the drag-shield).
	public enableDragProtection() : void {

		this.isProtectingDragAction = true;

	}


	// I handle changes to the shield toggle. This determine whether or not we are using
	// the drag-shield at all (regardless of whether or not drag-protection is enabled).
	// This way, you can compare the drag behavior with and without the drag-shield.
	public handleShieldToggle( isUsingShieldInDemo: boolean ) : void {

		this.isUsingShieldInDemo = isUsingShieldInDemo;

	}


	// I update the position of the given item.
	public updateItemPosition( item: Item, newLeft: number, newTop: number ) : void {

		item.position.left = this.constrain( newLeft, -25, 575 );
		item.position.top = this.constrain( newTop, -25, 475 );

	}

	// ---
	// PRIVATE METHODS.
	// ---

	// I constrain the given number to the given min/max span.
	private constrain( value: number, min: number, max: number ) : number {

		return( Math.max( Math.min( value, max ), min ) );

	}


	// I generate a set of items that are randomly positioned.
	private generateItems( count: number, maxLeft: number, maxTop: number ) : Item[] {

		var items: Item[] = [];

		for ( var i = 0 ; i < count ; i++ ) {

			items.push({
				id: i,
				label: i.toString(),
				position: {
					left: Math.floor( Math.random() * maxLeft ),
					top: Math.floor( Math.random() * maxTop )
				}
			});

		}

		return( items );

	}

}
