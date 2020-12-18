import DefaultRouteComponent from './DefaultRouteComponent'

export class RouteBuilder {
  pathNew = 'new'
  pathEdit = 'edit'

  getList (routeConfig, routeOptions = {}) {
    const routeName = `${routeConfig.name}.list`

    return {
      path: '',
      name: routeName,
      component: routeConfig.components.list,
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
      component: routeConfig.components.new,
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

  getDetail (routeConfig, routeOptions = {}) {
    const routeName = `${routeConfig.name}.detail`

    return {
      path: '',
      name: routeName,
      component: routeConfig.components.detail,
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
      component: routeConfig.components.edit,
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
    routeConfig = {...routeConfig}
    const {path: routePath, idKey} = routeConfig

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

        {
          path: ':' + idKey,
          component: DefaultRouteComponent,
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
      ]
    }
  }
}
