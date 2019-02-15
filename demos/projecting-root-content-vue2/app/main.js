
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

// ----------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- //

new Vue({
	el: "my-app",

	// When we omit both the render() function and the "template" property, the in-DOM
	// markup of <my-app> will serve as the component's template. As such, we have to
	// tell Vue.js how to map custom elements (like <my-app>) onto Vue Components.
	// --
	// NOTE: While I am not using other custom elements in this demo, this approach
	// allows other custom elements to be consumed in the top-level HTML page. Though,
	// they have to be identified using lowercase Kebab-Case.
	components: {
		"my-app": AppComponent
	}

	// Instead of using a render() function, which is the most common example, we're
	// going to allow the runtime HTML to act as the component template. This allows the
	// runtime HTML to be projected into the AppComponent using standard slotting.
	// --
	// WARNING: This requires RUNTIME COMPILATION of the in-DOM HTML, which may have a
	// negative affect on performance and time-to-first-interaction.

	// I render the root component of the application into the DOM.
	// render: ( createElement ) => {
	//
	// 	return( createElement( AppComponent ) );
	// 
	// }
});
