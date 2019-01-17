var autoprefixer = require('autoprefixer')
var browserslist = require('browserslist')
var pxtorem = require('postcss-pxtorem')

// module.exports = {
//     plugins: [autoprefixer({browsers: browserslist('last 3 version, iOS > 8')})]
// }

const postcssConfig = {
  autoprefixer: {
    // 自动前缀的配置
    pc: [
      'last 3 versions',
      'Explorer >= 8',
      'Chrome >= 21',
      'Firefox >= 1',
      'Edge 13'
    ],
    app: ['Android >= 4', 'iOS >= 6', 'Chrome >= 21', 'safari >= 4']
  },
  postcssPxtorem: {
    // rootValue: 750 / 16,
    // minPixelValue: 1,
    // propWhiteList: [],
    // unitPrecision: 5
    root_value: '100', // 基准值 html{ font-zise: 20px; }
    prop_white_list: [], // 对所有 px 值生效
    minPixelValue: 1 // 忽略 1px 值
  }
}

function getAppConfig() {
  const config = [];
  config.push(
    autoprefixer({
      browsers: postcssConfig.autoprefixer['app'],
      remove: false
    }),
    pxtorem(postcssConfig.postcssPxtorem)
  );
  return config;
}

module.exports = {
  plugins: getAppConfig()
};

