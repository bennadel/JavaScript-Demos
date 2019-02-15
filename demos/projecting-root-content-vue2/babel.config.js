
// CAUTION: I don't really understand how to configure bable. This is just a
// configuration that I copied off the BabelJS website.
module.exports = {
	presets: [
		[
			"@babel/env",
			{
				"modules": false,
				"targets": {
					"browsers": [
						"> 1%",
						"last 2 versions",
						"not ie <= 9"
					]
				}
			}
		]
	]
};
