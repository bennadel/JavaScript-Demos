
// Import the core angular services.
import { Observable } from "rxjs/Observable";

// Execute side-effects for RxJS observable operators.
import "rxjs/add/observable/of";
import "rxjs/add/observable/throw";
import "rxjs/add/operator/catch";
import "rxjs/add/operator/delay";

// Import the application components and services.
import { sampleData } from "./sample-data";

export interface IProject {
	id: number;
	name: string;
}

export class ProjectService {

	private projects: IProject[];


	// I initialize the service.
	constructor() {
		
		this.projects = sampleData.projects.map(
			( project: any ) : IProject => {

				return({
					id: project.id,
					name: project.name
				});

			}
		);

	}


	// ---
	// PUBLIC METHODS.
	// ---


	// I return the given project as an observable stream.
	public getProjectById( id: number ) : Observable<IProject> {

		var project = this.projects.find(
			( value ) : boolean => {

				return( value.id === id );

			}
		);

		if ( project ) {

			return( Observable.of( project ).delay( 750 ) );

		} else {
			
			return( Observable.throw( new Error( "NotFound" ) ) );

		}

	}


	// I return all of the projects as an observable stream.
	public getProjects() : Observable<IProject[]> {

		return( Observable.of( this.projects ).delay( 750 ) );

	}

}
