const path = require('path')

module.exports = {
  templates: `${__dirname}/.hygen`,
  helpers: {
    relativePath: (from, to) => path.relative(from, to),
    rootDir: () => __dirname,
  },
}
