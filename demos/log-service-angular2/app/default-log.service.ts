
// Define the interface that all loggers must implement.
export interface ILogger {
	assert( ...args: any[] ) : void;
	error( ...args: any[] ) : void;
	group( ...args: any[] ) : void;
	groupEnd( ...args: any[] ) : void;
	info( ...args: any[] ) : void;
	log( ...args: any[] ) : void;
	warn( ...args: any[] ) : void;
}


// Set up the default logger. The default logger doesn't actually log anything; but, it
// provides the Dependency-Injection (DI) token that the rest of the application can use 
// for dependency resolution. Each platform can then override this with a platform-
// specific logger implementation, like the ConsoleLogService (below).
export class Logger implements ILogger {

	public assert( ...args: any[] ) : void {
		// ... the default logger does no work.
	}

	public error( ...args: any[] ) : void {
		// ... the default logger does no work.
	}

	public group( ...args: any[] ) : void {
		// ... the default logger does no work.
	}

	public groupEnd( ...args: any[] ) : void {
		// ... the default logger does no work.
	}

	public info( ...args: any[] ) : void {
		// ... the default logger does no work.
	}

	public log( ...args: any[] ) : void {
		// ... the default logger does no work.
	}

	public warn( ...args: any[] ) : void {
		// ... the default logger does no work.
	}

}
