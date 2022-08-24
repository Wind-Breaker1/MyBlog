const proPlugins = [];
if (process.env.NODE_ENV === 'production') {
	proPlugins.push('transform-remove-console');
}
module.exports = {
	presets: ['@vue/cli-plugin-babel/preset'],
	plugins: [...proPlugins],
};
