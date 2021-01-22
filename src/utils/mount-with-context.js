export default function mountWithContext (target, app) {
  target._context.components = app._context.components
  target._context.directives = app._context.directives
  target._context.provides = app._context.provides
  target._context.config = app._context.config
  target._context.mixins = app._context.mixins

  const elem = document.createElement('div')

  const node = target.mount(elem).$el

  document.body.appendChild(node)

  return node
}
