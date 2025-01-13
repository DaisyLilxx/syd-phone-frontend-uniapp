module.exports = {
	publicPath: process.env.NODE_ENV === 'production' ? '/dist/' : '/',
	transpileDependencies: ['@dcloudio/uni-app'],
	chainWebpack: config => {
		config.plugin('define').tap(args => {
			args[0]['process.env.UNI_PLATFORM'] = JSON.stringify('h5');
			return args;
		});
	}
};