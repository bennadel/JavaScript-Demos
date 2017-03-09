import includePaths from 'rollup-plugin-includepaths';

let includePathOptions = {
    include: {
		 'tslib': './node_modules/tslib/tslib.es6.js'
	 },
    paths: [],
    external: ['typescript'],
    extensions: ['.js']
};

export default {
    entry: './tmp/es6/plugin.js',
    format: 'es',
    dest: 'tmp/plugin.js',
    plugins: [ includePaths(includePathOptions) ],
};
