---
to: <%- path%><%- tagName %>.stories.ts
---
import './<%- tagName %>.js'

export default {
  title: 'Components/<%- componentName %>',
  component: '<%- tagName %>',
  parameters: {
    actions: {
      handles: [],
    },
  },
  args: {},
}


export const Default = {
  args: {
  
  },
}