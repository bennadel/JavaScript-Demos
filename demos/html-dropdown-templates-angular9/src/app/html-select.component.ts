
// Import the core angular services.
import { ChangeDetectionStrategy } from "@angular/core";
import { ChangeDetectorRef } from "@angular/core";
import { Component } from "@angular/core";
import { ElementRef } from "@angular/core";
import { EventEmitter } from "@angular/core";
import { TemplateRef } from "@angular/core";
import { ViewChild } from "@angular/core";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

interface OptionTemplateContext {
	$implicit: any;
	value: any;
	index: number;
	selected: number;
	active: boolean;
}

@Component({
	selector: "app-html-select",
	inputs: [
		"value",
		"options",
		"optionTemplate",
		"rootTemplate",
		"nullTemplate"
	],
	outputs: [
		"valueChangeEvents: valueChange"
	],
	host: {
		"(document:mousedown)": "handleMousedown( $event )",
		"(window:resize)": "hideMenu()",
		"(window:keydown.Esc)": "hideMenu()"
	},
	queries: {
		menuRef: new ViewChild( "menuRef" ),
		rootRef: new ViewChild( "rootRef" )
	},
	changeDetection: ChangeDetectionStrategy.OnPush,
	styleUrls: [ "./html-select.component.less" ],
	templateUrl: "./html-select.component.html"
})
export class HtmlSelectComponent {

	public activeIndex: number;
	public isShowingMenu: boolean;
	public menuRef!: ElementRef;
	public nullTemplate!: TemplateRef<OptionTemplateContext>;
	public options!: any[];
	public optionTemplate!: TemplateRef<OptionTemplateContext>;
	public rootRef!: ElementRef;
	public rootTemplate!: TemplateRef<OptionTemplateContext>;
	public value!: any;
	public valueChangeEvents: EventEmitter<any>;

	private changeDetectorRef: ChangeDetectorRef;

	// I initialize the html select component.
	constructor( changeDetectorRef: ChangeDetectorRef ) {

		this.changeDetectorRef = changeDetectorRef;

		this.activeIndex = -1;
		this.isShowingMenu = false;
		this.valueChangeEvents = new EventEmitter();

	}

	// ---
	// PUBLIC METHODS.
	// ---

	// I handle the mousedown event on the document.
	public handleMousedown( event: MouseEvent ) : void {

		// If the user has moused-down OUTSIDE of the select-menu, we're going to
		// interpret that as moving focus away from the menu. As such, we're going to
		// close it.
		if (
			this.isShowingMenu &&
			! this.rootRef.nativeElement.contains( event.target ) &&
			! this.menuRef.nativeElement.contains( event.target )
			) {

			this.hideMenu();

		}

	}


	// I propagate the given value as a desired valueChange event.
	public handleSelect( nextValue: any ) : void {

		if ( this.value !== nextValue ) {

			this.valueChangeEvents.emit( nextValue );

		}

		this.hideMenu();

	}


	// I hide the pop-up menu.
	public hideMenu() : void {

		this.isShowingMenu = false;

	}


	// I get called once after the view template has been compiled.
	public ngAfterViewInit() : void {

		// CAUTION: Now that the view has been initialized, it means that Angular has
		// hooked up all of the directive and interpolation bindings. As such, it is safe
		// to move a portion of the view into the DOCUMENT ROOT without breaking those
		// bindings. How cool is that sauce!!
		document.body.appendChild( this.menuRef.nativeElement );

	}


	// I set the new active index (ie, which option the user is preparing to select).
	public setActiveIndex( newActiveIndex: number ) : void {

		this.activeIndex = newActiveIndex;

	}


	// I show the pop-up menu, and try to position it so it doesn't overlap with the
	// edges of the viewport of the browser.
	public showMenu() : void {

		var rootRect = this.rootRef.nativeElement.getBoundingClientRect();

		// By default, we're going to position the menu at the top-left corner of the
		// root button.
		this.isShowingMenu = true;
		this.menuRef.nativeElement.style.left = `${ rootRect.left }px`;
		this.menuRef.nativeElement.style.top = `${ rootRect.top }px`;
		this.menuRef.nativeElement.style.width = null;
		this.menuRef.nativeElement.style.minWidth = `${ rootRect.width }px`;
		this.menuRef.nativeElement.style.height = null;

		// Since we don't know what's inside the menu (the content is projected), there's
		// no way for us to know about the dimensions ahead of time. As such, we're going
		// to stop and force the browser to reconcile the view-model with the template
		// (ie, we're going to force it to render the menu). This will give the menu
		// physical dimensions in the viewport that we can then measure.
		this.changeDetectorRef.detectChanges();

		// Measure the viewport and the menu position.
		var windowWidth = document.documentElement.clientWidth;
		var windowHeight = document.documentElement.clientHeight;
		var menuRect = this.menuRef.nativeElement.getBoundingClientRect();

		// When we position the menu, we don't want it to butt-up against the viewport,
		// as that would be provide sub-par look-and-feel. Let's make sure it never gets
		// closer than 10px from any edge.
		var minLeft = 10;
		var minTop = 10;
		var maxRight = ( windowWidth - 10 );
		var maxBottom = ( windowHeight - 10 );

		// Ok, let's start out with the natural position reported by the browser.
		var adjustedRect = {
			top: menuRect.top,
			left: menuRect.left,
			right: menuRect.right,
			bottom: menuRect.bottom
		};

		// Now, let's adjust the rect so that the menu doesn't overlap with our min and
		// max offsets. First, we're going to do this by shifting the entire menu over.
		// Then, if the menu is still in a "bad" place, we're going to shrink the
		// dimensions in order to force the fit.

		// Constrain the left-edge. We're going to do this by shifting the entire menu.
		if ( adjustedRect.left < minLeft ) {

			adjustedRect.left += ( minLeft - adjustedRect.left );
			adjustedRect.right += ( minLeft - adjustedRect.left );

		// Constrain the right-edge. We're going to do this by shifting the entire menu.
		} else if ( adjustedRect.right > maxRight ) {

			adjustedRect.left -= ( adjustedRect.right - maxRight );
			adjustedRect.right -= ( adjustedRect.right - maxRight );

		}

		// Constrain the top-edge. We're going to do this by shifting the entire menu.
		if ( adjustedRect.top < minTop ) {

			adjustedRect.top += ( minTop - adjustedRect.top );
			adjustedRect.bottom += ( minTop - adjustedRect.top );

		// Constrain the bottom-edge. We're going to do this by shifting the entire menu.
		} else if ( adjustedRect.bottom > maxBottom ) {

			adjustedRect.top -= ( adjustedRect.bottom - maxBottom );
			adjustedRect.bottom -= ( adjustedRect.bottom - maxBottom );

		}

		// And, now that we've tried to shift the menu over in order to avoid edge-
		// overlap, we're going to ensure constraint by clamping the physical dimensions
		// of the menu.
		adjustedRect.left = Math.max( adjustedRect.left, minLeft );
		adjustedRect.top = Math.max( adjustedRect.top, minTop );
		adjustedRect.right = Math.min( adjustedRect.right, maxRight );
		adjustedRect.bottom = Math.min( adjustedRect.bottom, maxBottom );
		
		// Finally, we can update the position of the menu to reconcile it with the
		// calculated constraints of the viewport.
		this.menuRef.nativeElement.style.top = `${ adjustedRect.top }px`;
		this.menuRef.nativeElement.style.left = `${ adjustedRect.left }px`;
		this.menuRef.nativeElement.style.width = `${ adjustedRect.right - adjustedRect.left }px`;
		this.menuRef.nativeElement.style.height = `${ adjustedRect.bottom - adjustedRect.top }px`;

	}

}
