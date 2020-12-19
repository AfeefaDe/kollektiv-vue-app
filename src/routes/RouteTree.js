export class RouteTree {
  routeName = null

  component = null
  routeConfig = null
  routeOptions = null

  parent = null
  children = []

  addChild (tree) {
    tree.parent = this
    this.children.push(tree)
  }

  addChildren (children) {
    const tree = new RouteTree()
    tree.routeName = children.routeName
    tree.component = children.component
    tree.routeConfig = children.routeConfig
    tree.routeOptions = children.routeOptions
    this.addChild(tree)

    if (children.children) {
      children.children.forEach(c => {
        tree.addChildren(c)
      })
    }
  }

  find (routeName) {
    if (this.routeName === routeName) {
      return this
    }

    for (const child of this.children) {
      const tree = child.find(routeName)
      if (tree) {
        return tree
      }
    }
    return null
  }

  get title () {
    if (typeof this.component.title === 'string') {
      return this.component.title
    }
    return this.component.title(this.routeConfig, this.routeOptions)
  }

  get to () {
    return {
      name: this.routeName,
      params: {
        [this.routeConfig.idKey]: this.id
      }
    }
  }
}
