
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
			<a (click)="toggleInbox()">Toggle Inbox</a> &mdash;
			<a (click)="toggleModals()">Toggle Modals</a>
		</p>

		<p *ngFor="let i of [ 1, 2, 3, 4, 5 ]">
			This is some body context. The Body is the stacking context.
		</p>

		<!-- STACKING CONTEXT -->
		<div *ngIf="isShowingInbox" class="inbox">

			<!-- STACKING CONTEXT -->
			<header>
				Header.

				<!-- STACKING CONTEXT -->
				<div class="menu">
					Menu.
				</div>
			</header>

			<section>
				Content area.
			</section>

			<!-- STACKING CONTEXT -->
			<footer>
				Footer.
			</footer>

			<!-- STACKING CONTEXT -->
			<div class="sticky">
				Sticky.
			</div>

		</div>

		<!-- STACKING CONTEXT -->
		<div *ngIf="isShowingModals" class="modals">

			<header>
				Header.
			</header>

			<section>
				Content area.
			</section>

			<footer>
				Footer.
			</footer>

			<!-- STACKING CONTEXT -->
			<div class="sticky">
				Sticky.
			</div>

		</div>
	`
})
export class AppComponent {

	public isShowingInbox: boolean;
	public isShowingModals: boolean;

	// I initialize the app component.
	constructor() {

		this.isShowingInbox = false;
		this.isShowingModals = false;

	}

	// ---
	// PUBLIC METHODS.
	// ---

	// I toggle the visibility of the inbox overlay.
	public toggleInbox() : void {

		this.isShowingInbox = ! this.isShowingInbox;

	}


	// I toggle the visibility of the modals overlay.
	public toggleModals() : void {

		this.isShowingModals = ! this.isShowingModals;

	}
	
}
