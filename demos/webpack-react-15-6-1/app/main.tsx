
// Import the core React modules.
import React = require( "react" );
import ReactDOM = require( "react-dom" );

// Import the application modules.
import { AppComponent } from "./app.component";

// To bootstrap the application, all we're going to do is render the root component 
// on the main page.
ReactDOM.render( <AppComponent />, document.getElementById( "root" ) );
