
// Import the core angular services.
import { NgModule } from "@angular/core";


// I am just defining a class here so that I can add to the Providers collection and 
// then inject it into the Module to see how all the constructors work.
// --
// NOTE: We are exporting this class, which is subsequently imported into the AppModule
// for dependency-injection into the AppModule constructor.
export class OtherService {

	constructor() {

		console.log( "OtherService constructor." );

	}

}


@NgModule({
	providers: [ OtherService ]
})
export class OtherModule {
	
	// I initialize the module.
	constructor( otherSerivce: OtherService ) {

		console.group( "OtherModule Constructor." );
		console.log( otherSerivce );
		console.groupEnd();

	}

}
