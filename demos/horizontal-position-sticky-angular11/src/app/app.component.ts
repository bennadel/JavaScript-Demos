
// Import the core angular services.
import { Component } from "@angular/core";
import { formatDate } from "@angular/common";
import { Inject } from "@angular/core";
import { LOCALE_ID } from "@angular/core";

// Import the application components and services.
import { membershipData } from "./data";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

interface User {
	id: number;
	name: string;
	initials: string;
	memberships: Membership[]
}

interface Membership {
	startedAt: number;
	endedAt: number;
}

interface Timeline {
	startedAt: number;
	endedAt: number;
	duration: number;
	durationInPixels: number;
	tracks: Track[];
}

interface Track {
	user: User;
	segments: Segment[];
}

interface Segment {
	membership: Membership;
	duration: number;
	durationInPixels: number;
	durationInPercent: number;
	offset: number;
	offsetInPixels: number;
	offsetInPercent: number;
}

interface DateLabels {
	[ key: string ]: string;
}

// Rough constants for the number of milliseconds within a larger time-frame.
var DAY_MILLISECONDS = ( 1000 * 60 * 60 * 24 );
var MONTH_MILLISECONDS = ( DAY_MILLISECONDS * 30 );
var YEAR_MILLISECONDS = ( DAY_MILLISECONDS * 365 );

@Component({
	selector: "app-root",
	styleUrls: [ "./app.component.less" ],
	templateUrl: "./app.component.html"
})
export class AppComponent {

	public dateLabels: DateLabels; 
	public timeline: Timeline;
	public users: User[];
	public zoomLevel: number;

	private localID: string;
	private zoomLevels: number[];

	// I initialize the app component.
	constructor( @Inject( LOCALE_ID ) localID: string ) {

		this.localID = localID;
		this.users = this.compileUserData();
		this.dateLabels = Object.create( null );

		// Lower levels are "zoomed out", higher levels are "zoomed in".
		this.zoomLevel = 3;
		this.zoomLevels = [
			( 1000 / ( YEAR_MILLISECONDS * 3 ) ),  // 1,000 px = 3 year
			( 1000 / ( YEAR_MILLISECONDS * 2 ) ),  // 1,000 px = 2 year
			( 1000 / ( YEAR_MILLISECONDS * 1 ) ),  // 1,000 px = 1 year
			( 1000 / ( MONTH_MILLISECONDS * 6 ) ), // 1,000 px = 6 months
			( 1000 / ( MONTH_MILLISECONDS * 3 ) ), // 1,000 px = 3 months
			( 1000 / ( MONTH_MILLISECONDS * 1 ) )  // 1,000 px = 1 month
		];

		this.timeline = {
			startedAt: 0,
			endedAt: 0,
			duration: 0,
			durationInPixels: 0,
			tracks: []
		};
		
		this.setDateLabels();
		this.setTimeline();

	}
	
	// ---
	// PUBLIC METHODS.
	// ---

	// I zoom-into the timeline so that time-frames appear longer.
	public zoomIn() : void {

		if ( this.zoomLevel < ( this.zoomLevels.length - 1 ) ) {

			this.zoomLevel++;
			this.updateTimelineZoom();

		}

	}


	// I zoom-out of the timeline so that time-frames appear shorter.
	public zoomOut() : void {

		if ( this.zoomLevel > 0 ) {

			this.zoomLevel--;
			this.updateTimelineZoom();

		}

	}

	// ---
	// PRIVATE METHODS.
	// ---

	// I compile the user date into our user view-model.
	private compileUserData() : User[] {

		var users: User[] = [];
		var user: User | null = null;

		// NOTE: We know that this sample user data has already been sorted first by
		// userID and then by startedAt / endedAt dates. As such, we know that the same
		// userID may be encountered multiples times in a row, indicating that the user
		// has left and then re-joined the company over time.
		for ( var membership of membershipData ) {

			if ( ! user || ( user.id !== membership.userID ) ) {

				user = {
					id: membership.userID,
					name: membership.userName,
					initials: membership.userInitials,
					memberships: []
				};
				users.push( user );

			}

			user.memberships.push({
				startedAt: membership.startedAt,
				endedAt: membership.endedAt
			});

		}

		// Our raw data was sorted by User (so that we could more easily group
		// memberships next to each other). However, now that we've parsed the raw data,
		// let's re-sorted with the oldest memberships first.
		users.sort(
			( a, b ) => {

				// NOTE: We know that ever use has at least one membership. As such, we
				// don't have to worry about checking lengths in this comparison.
				return( a.memberships[ 0 ].startedAt - b.memberships[ 0 ].startedAt );

			}
		);

		return( users );

	}


	// I scale the given milliseconds into rendered pixels based on the current zoom.
	private scaleMilliseconds( value: number ) : number {

		return( value * this.zoomLevels[ this.zoomLevel ] );

	}


	// I populate the date-labels view-model based on the current users.
	private setDateLabels() : void {

		for ( var user of this.users ) {
			for ( var membership of user.memberships ) {

				this.dateLabels[ membership.startedAt ] = formatDate( membership.startedAt, "mediumDate", this.localID );
				this.dateLabels[ membership.endedAt ] = formatDate( membership.endedAt, "mediumDate", this.localID );

			}
		}

		// An "endedAt" of "0" means that the given membership is still active (ie, not
		// actually ended). In that case, we'll translate the date to a string literal.
		this.dateLabels[ 0 ] = "Today";

	}


	// I populate the timeline view-model based on the current users.
	private setTimeline() : void {

		var minStartedAt = 0;
		var maxEndedAt = 0;
		var tickCount = Date.now();

		for ( var user of this.users ) {
			for ( var membership of user.memberships ) {

				minStartedAt = ( minStartedAt || membership.startedAt );
				minStartedAt = Math.min( minStartedAt, membership.startedAt );
				maxEndedAt = ( maxEndedAt || membership.endedAt || tickCount );
				maxEndedAt = Math.max( maxEndedAt, ( membership.endedAt || tickCount ) );

			}
		}

		this.timeline.duration = ( maxEndedAt - minStartedAt );
		this.timeline.durationInPixels = this.scaleMilliseconds( this.timeline.duration );

		this.timeline.tracks = this.users.map(
			( user ) => {

				var segments = user.memberships.map(
					( membership ) => {

						var offset = ( membership.startedAt - minStartedAt );
						var duration = ( ( membership.endedAt || tickCount ) - membership.startedAt );

						return({
							membership: membership,
							duration: duration,
							durationInPixels: this.scaleMilliseconds( duration ),
							durationInPercent: ( duration / this.timeline.duration * 100 ),
							offset: offset,
							offsetInPixels: this.scaleMilliseconds( offset ),
							offsetInPercent: ( offset / this.timeline.duration * 100 )
						});

					}
				);

				return({
					user: user,
					segments: segments
				});

			}
		);

	}


	// I update the scaled pixel values based on the current timeline and zoom level.
	private updateTimelineZoom() : void {

		this.timeline.durationInPixels = this.scaleMilliseconds( this.timeline.duration );

		for ( var track of this.timeline.tracks ) {
			for ( var segment of track.segments ) {

				segment.durationInPixels = this.scaleMilliseconds( segment.duration );
				segment.offsetInPixels = this.scaleMilliseconds( segment.offset );

			}
		}

	}

}
