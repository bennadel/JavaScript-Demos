
// Import for side effects - we have to import this first so that the polyfills will
// be available for the rest of the code.
// --
// NOTE: I would normally include this as an Entry bundle; but, I couldn't get the
// HtmlWebpackPlugin to work properly if I did that (since I don't think it could
// implicitly determine the dependency order). In the future, I might be able to make
// this more dynamic (ie, use Webpack's import() syntax).
import "./main.polyfill";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

// Import core classes.
import Vue from "vue";

// Import application classes.
import AppComponent from "./app.component.vue";
import { FriendService } from "./friend.service";

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

new Vue({
	el: "my-app",

	// I setup the dependency-injection for the descendant components.
	provide() {

		return({
			friendService: new FriendService()
		});

	},

	// I render the root component of the application into the DOM.
	render: ( createElement ) => {

		return( createElement( AppComponent ) );

	}
});
