
// In Webpack 4, the DefinePlugin is automatically replacing "process.env.NODE_ENV" with
// either "production" or "development" based on the current build-mode. This gives your
// JavaScript code access to the contextual build-mode for conditional logic (such as
// configuring your Angular application to run in "prod" mode with enableProdMode()).
// --
// NOTE: To be clear, this is not making the "env" object available in JavaScript; this
// is doing a complete code-wide substitution of the substring "process.env.NODE_ENV".
console.group( "process.env.NODE_ENV" );
console.log( process.env.NODE_ENV );
console.groupEnd();
