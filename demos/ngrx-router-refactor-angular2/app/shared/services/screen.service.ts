
// Import the core angular services.
import { Observable } from "rxjs/Observable";

// Execute side-effects for RxJS observable operators.
import "rxjs/add/observable/of";
import "rxjs/add/operator/delay";

// Import the application components and services.
import { sampleData } from "./sample-data";

export interface IScreen {
	id: number;
	projectId: number;
	name: string;
	filename: string;
}

export class ScreenService {

	private screens: IScreen[];


	// I initialize the service.
	constructor() {
		
		this.screens = [];

		sampleData.projects.forEach(
			( project: any ) : void => {

				project.screens.forEach(
					( screen: any ) : void => {

						this.screens.push({
							id: screen.id,
							projectId: project.id,
							name: screen.name,
							filename: screen.filename
						});

					}
				);

			}
		);

	}


	// ---
	// PUBLIC METHODS.
	// ---


	// I return the screens in the given project as an observable stream.
	public getScreensByProjectId( projectId: number ) : Observable<IScreen[]> {

		var projectScreens = this.screens.filter(
			( screen: IScreen ) : boolean => {

				return( screen.projectId === projectId );

			}
		);

		return( Observable.of( projectScreens ).delay( 750 ) );

	}

}
