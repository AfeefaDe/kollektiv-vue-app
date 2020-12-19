import { eventBus } from '../events/EventBus'
import { RouteEvent } from './RouteEvent'

class Routes {
  routes = []
  routeTree = null

  currentRouteName = null
  currentRouteComponent = null
  currentRouteTitles = {}

  setRouteTree (routeTree) {
    this.routeTree = routeTree
  }

  setComponent (routeName, routeParams) {
    const treeItem = this.routeTree.find(routeName)
    if (treeItem) {
      this.currentRouteName = routeName
      this.currentRouteParams = routeParams
      eventBus.$emit(new RouteEvent(RouteEvent.CHANGE))
    }
  }

  setRouteTitle (routeName, title) {
    this.currentRouteTitles[routeName] = title
    eventBus.$emit(new RouteEvent(RouteEvent.CHANGE))
  }

  get () {
    let routes = []

    if (!this.currentRouteName) {
      return routes
    }

    let treeItem = this.routeTree.find(this.currentRouteName)

    if (!treeItem) {
      return routes
    }

    routes.push(treeItem)

    while (treeItem.parent) {
      treeItem = treeItem.parent
      if (treeItem.routeName) {
        routes.unshift(treeItem)
      }
    }

    routes = routes.map(routeTree => ({
      title: this.currentRouteTitles[routeTree.routeName] || routeTree.title,
      to: {name: routeTree.routeName, params: this.currentRouteParams}
    }))

    return routes
  }
}

export const routes = new Routes()
