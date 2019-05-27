'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
    //生产环境(用于本地测试)
  NODE_ENV: '"development"',
  API_ROOT:'"http://192.168.1.17:8003/"'
})
