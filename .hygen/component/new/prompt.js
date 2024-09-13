const { normalize } = require('path')

module.exports = {
  prompt: ({ prompter, h }) => {
    return prompter.prompt([
      {
        type: 'input',
        name: 'path',
        message() {
          return `Path (relative to src)`
        },
        result(path) {
          return normalize(`src/${path}/`).replace(/\\/gm, '/')
        },
      },
      {
        type: 'input',
        name: 'tagName',
        message: 'Element tag:',
      },
      {
        type: 'input',
        name: 'componentName',
        message: 'Component name:',
        initial() {
          return h.inflection.camelize(this.state.answers.tagName.replaceAll('-', '_'))
        },
      },
    ])
  },
}
