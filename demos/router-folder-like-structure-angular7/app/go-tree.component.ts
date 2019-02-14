
// Import the core angular services.
import { ActivatedRoute } from "@angular/router";
import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";

// Import the application components and services.
import { TreeBuilder } from "./tree-builder";
import { TreeItem } from "./tree-builder";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

// Configure our demo data, which is a hierarchy of movies. To make this demo easier to
// consume, the demo data is being wrangled with a Builder that automatically tracks the
// parent/child relationships using a ParentID.
var treeData = new TreeBuilder()
	.group( "Movies" )
		.group( "Action / Adventure" )
			.item( "Die Hard" )
			.item( "Mechanic" )
			.group( "Tom Cruise" )
				.item( "Jack Reacher" )
				.item( "Mission Impossible" )
				.up()
			.up()
		.group( "RomCom" )
			.group( "Meg Ryan" )
				.group( "With Tom Hanks" )
					.item( "Sleepless in Seattle ")
					.item( "You've Got Mail" )
					.up()
				.item( "When Harry Met Sally" )
				.up()
			.item( "10 Things I Hate About You" )
			.item( "Keeping the Faith" )
			.up()
		.group( "Sci-Fi" )
			.item( "Prometheus" )
			.group( "Arnold Schwarzenegger" )
				.item( "Terminator 2" )
				.item( "Total Recall" )
				.item( "Running Man" )
				.up()
			.up()
	.getData()
;

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

interface Breadcumb {
	name: string;
	path: string;
}

// When we provide the navigational elements for the tree of hierarchical data, we will
// need to map plain-text name values onto URL-encoded segment values. As such, we'll
// translate the collection of TreeItem[] into a collection of TreeItemWithPath[], where
// "path" is the URL-safe version of the "name".
interface TreeItemWithPath extends TreeItem {
	path: string;
}

@Component({
	selector: "go-tree",
	styleUrls: [ "./go-tree.component.less" ],
	template:
	`
		<nav class="breadcrumbs">
			<a [routerLink]="featureRoot">
				Go
			</a>

			<ng-template ngFor let-breadcrumb [ngForOf]="breadcrumbs">

				<span>
					/
				</span>

				<a [routerLink]="breadcrumb.path">
					{{ breadcrumb.name}}
				</a>

			</ng-template>
		</nav>

		<ul *ngIf="groups.length" class="groups">
			<li *ngFor="let group of groups">
				<a [routerLink]="group.path">
					{{ group.name }}
				</a>
			</li>
		</ul>

		<ul *ngIf="items.length" class="items">
			<li *ngFor="let item of items">
				{{ item.name }}
			</li>
		</ul>
	`
})
export class GoTreeComponent {

	public breadcrumbs: Breadcumb[];
	public featureRoot: string;
	public groups: TreeItemWithPath[];
	public items: TreeItemWithPath[];

	private activatedRoute: ActivatedRoute;
	private data: TreeItemWithPath[];
	private router: Router;
	private urlSubscription: Subscription | null;

	// I initialize the go component.
	constructor(
		activatedRoute: ActivatedRoute,
		router: Router
		) {

		this.activatedRoute = activatedRoute;
		this.router = router;

		this.breadcrumbs = [];
		this.groups = [];
		this.items = [];
		this.urlSubscription = null;

		// When consuming a "sink" route (**), relative navigation does not seem to work
		// very consistently (especially when redirecting). As such, all of our links
		// that move "up" in the hierarchy will be defined as an absolute path from the
		// feature-root.
		this.featureRoot = "/go";

		// Map our tree-data onto the version that includes a URL-safe "path" property.
		// This will make it easier to render the links safely.
		this.data = treeData.map(
			( treeItem ) => {

				return({
					...treeItem,
					path: encodeURIComponent( treeItem.name )
				});

			}
		);

	}

	// ---
	// PUBLIC METHODS.
	// ---

	// I get called once when the component is being destroyed.
	public ngOnDestroy() : void {

		( this.urlSubscription ) && this.urlSubscription.unsubscribe();

	}


	// I get called once after the component has been mounted.
	public ngOnInit() : void {

		// As the user moves up and down the tree hierarchy, the URL will be updated
		// to reflect the user's location within the hierarchy traversal. We therefore
		// have to listen for changes on the URL in order to re-render the tree.
		this.urlSubscription = this.activatedRoute.url.subscribe(
			( urlSegments ) => {

				// Each urlSegment contains information about both the path and the path
				// parameters. Let's pluck out the path portion only and decode it so
				// that we can use it as traversal instructions on our hierarchy.
				var names = urlSegments.map(
					( urlSegment ) => {
						
						return( decodeURIComponent( urlSegment.path ) );

					}
				);

				this.renderTree( names );

			}
		);

	}

	// ---
	// PRIVATE METHODS.
	// ---

	// I create a collection of breadcrumbs that mirrors the given set of names.
	private createBreadcrumbs( names: string[] ) : Breadcumb[] {

		// Each breadcrumb represents the ability to jump an arbitrary point in the
		// hierarchical data. As such, it will be easiest if we map each name to a root-
		// relative point below the feature.
		var runningPath = this.featureRoot;

		var breadcrumbs = names.map(
			( name: string ) => {

				// Each name becomes the next URL-segment in the running path.
				runningPath += ( "/" + encodeURIComponent( name ) );

				return({
					name: name,
					path: runningPath
				});

			}
		);

		return( breadcrumbs );

	}


	// I filter the hierarchical data based on the given parent and type.
	private filterData( parentID: number, type: string ) : TreeItemWithPath[] {

		var matches = this.data.filter(
			( item ) => {

				return(
					( item.parentID === parentID ) &&
					( item.type === type )
				);

			}
		);

		return( matches );

	}


	// I translate the given collection of names into an item ID that references the
	// context item at the end of the name-based traversal. Returns null if no context
	// can be found at the end of the name-path.
	private getContextID( names: string[] ) : number | null {

		var parentID = 0;

		// In order to find the context, we have to start at the root of the hierarchy
		// and then find the item represented by each step in the name-based-path.
		for ( var name of names ) {

			var context = this.data.find(
				( item ) => {

					return(
						( item.parentID === parentID ) && 
						( item.type === "group" ) &&
						( item.name === name )
					);

				}
			);

			// If we found a context at this step, use the ID as the parent of the next
			// step in the name-path traversal.
			if ( context ) {

				parentID = context.id;

			// If we COULD NOT FIND a context at this step, the traversal is invalid.
			// Break out of the current search.
			} else {

				return( null );

			}

		}

		return( parentID );

	}


	// I render the current data against the given names-based traversal.
	private renderTree( names: string[] ) : void {

		// Locate the context within the data-tree that is represented by the given set
		// of traversal steps. This starts at the root and then reduces the collection of
		// names down to a given item in the data-tree (or null).
		var parentID = this.getContextID( names );

		// If the name-based traversal was invalid, redirect the user to the feature root.
		if ( parentID === null ) {

			this.router.navigate( [ this.featureRoot ] );
			return;

		}

		// If the traversal worked, gather the items at current tree location.
		this.breadcrumbs = this.createBreadcrumbs( names );
		this.groups = this.filterData( parentID, "group" );
		this.items = this.filterData( parentID, "item" );

	}

}
