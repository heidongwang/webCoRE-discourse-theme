module.exports = {
	parser: 'postcss-scss',
	plugins: [
		require('postcss-easy-import')({
			prefix: '_',
			extensions: ['.scss'],
			path: 'src/stylesheets',
		}),
		require('postcss-optional-comments'),
		require('autoprefixer')({
			flexbox: 'no-2009',
		}),
	],
};
