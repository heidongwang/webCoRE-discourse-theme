const ignoredWarnings = /Cannot find module '(theme_variables)'/;

module.exports = {
	parser: 'postcss-scss',
	plugins: [
		require('stylelint'),
		require('postcss-easy-import')({
			prefix: '_',
			extensions: ['.scss'],
			path: 'src/stylesheets',
			plugins: [
				require('stylelint'),
			],
		}),
		require('postcss-optional-comments'),
		require('autoprefixer'),
		require('postcss-reporter')({
			clearAllMessages: true,
			filter: message => message.type === 'warning' && message.text && !ignoredWarnings.test(message.text),
		}),
	],
};
