import DefaultRouteComponent from './DefaultRouteComponent'
import { RouteTree } from './RouteTree'

export class RouteBuilder {
  pathNew = 'new'
  pathEdit = 'edit'

  routeTree = new RouteTree()

  getContainer (routeConfig, routeOptions = {}) {
    const {path: routePath} = routeConfig

    return {
      path: routePath,
      component: DefaultRouteComponent,
      props: () => {
        return {
          routeConfig: {
            ...routeConfig,
            routeName: `${routeConfig.name}.container`
          },
          routeOptions
        }
      },

      children: [
        this.getList(routeConfig, routeOptions),
        this.getNew(routeConfig, routeOptions),
        this.getModel(routeConfig, routeOptions)
      ]
    }
  }

  getList (routeConfig, routeOptions = {}) {
    const routeName = `${routeConfig.name}.list`

    return {
      path: '',
      name: routeName,
      component: routeConfig.components.list.component,
      props: () => {
        return {
          routeConfig: {
            ...routeConfig,
            routeName
          },
          routeOptions
        }
      }
    }
  }

  getNew (routeConfig, routeOptions = {}) {
    const routeName = `${routeConfig.name}.new`

    return {
      path: this.pathNew,
      name: routeName,
      component: routeConfig.components.new.component,
      props: () => {
        return {
          routeConfig: {
            ...routeConfig,
            routeName
          },
          routeOptions,
          id: null
        }
      }
    }
  }

  getModel (routeConfig, routeOptions = {}) {
    const {idKey} = routeConfig

    return {
      path: ':' + idKey,
      component: routeConfig.components.model.component,
      props: route => {
        return {
          routeConfig: {
            ...routeConfig,
            routeName: `${routeConfig.name}.model`
          },
          routeOptions,
          id: route.params[idKey]
        }
      },

      children: [
        this.getDetail(routeConfig, routeOptions),
        this.getEdit(routeConfig, routeOptions)
      ]
    }
  }

  getDetail (routeConfig, routeOptions = {}) {
    const routeName = `${routeConfig.name}.detail`

    return {
      path: '',
      name: routeName,
      component: routeConfig.components.detail.component,
      props: route => {
        return {
          routeConfig: {
            ...routeConfig,
            routeName
          },
          routeOptions,
          id: route.params[routeConfig.idKey]
        }
      }
    }
  }

  getEdit (routeConfig, routeOptions = {}) {
    const routeName = `${routeConfig.name}.edit`

    return {
      path: this.pathEdit,
      name: routeName,
      component: routeConfig.components.edit.component,
      props: route => {
        return {
          routeConfig: {
            ...routeConfig,
            routeName
          },
          routeOptions,
          id: route.params[routeConfig.idKey]
        }
      }
    }
  }

  getModelRoute (routeConfig, routeOptions = {}) {
    this.routeTree.addChildren({
      routeName: `${routeConfig.name}.list`,
      component: routeConfig.components.list,
      routeConfig,
      routeOptions,

      children: [
        {
          routeName: `${routeConfig.name}.new`,
          component: routeConfig.components.new,
          routeConfig,
          routeOptions
        },
        {
          routeName: `${routeConfig.name}.detail`,
          component: routeConfig.components.detail,
          routeConfig,
          routeOptions,

          children: [
            {
              routeName: `${routeConfig.name}.edit`,
              component: routeConfig.components.edit,
              routeConfig,
              routeOptions
            }
          ]
        }
      ]
    })

    return this.getContainer(routeConfig, routeOptions)
  }
}
