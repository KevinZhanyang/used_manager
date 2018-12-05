/**
 * 用于配置MySQL连接以及输出目录的配置文件
 */

var path = require('path');

const outputDir = path.join(__dirname, '../src');
const inputDir = path.join(__dirname, '../template');

const config = {
  mysql: {
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: 'root',
    // 数据库名字
    database: 'app'
  },
  option: {
    output: outputDir,
    input: inputDir,
    tables: ['articles'],
    author: 'wangyifan',
    prePath: '/used/v1',
    targets: [
      {
        source: path.join(inputDir, 'model.js'),
        target: path.join(outputDir, 'model/${_name}.js'),
        override: true
      },
      {
        source: path.join(inputDir, 'list.vue'),
        target: path.join(outputDir, 'view/used/${_name}/list.vue'),
        override: false
      },
      {
        source: path.join(inputDir, 'detail.vue'),
        target: path.join(outputDir, 'view/used/${_name}/detail.vue'),
        override: false
      },
      {
        source: path.join(inputDir, 'new.vue'),
        target: path.join(outputDir, 'view/used/${_name}/new.vue'),
        override: false
      }
    ]
  }
};

module.exports = config;
