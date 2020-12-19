import { Component, Vue, Watch } from 'vue-property-decorator'

import { routes } from './Routes'

@Component({
  props: ['routeConfig', 'routeOptions']
})
export class RouteComponentMixin extends Vue {
  created () {
    routes.setComponent(this.routeConfig.routeName, this.$route.params)
  }

  @Watch('routeConfig.routeName')
  rcm_routeNameChangedInternal () {
    routes.setComponent(this.routeConfig.routeName, this.$route.params)
    this.rcm_routeNameChanged()
  }

  rcm_routeNameChanged () {
    // do something about
  }

  rcm_setRouteTitle (title) {
    let routeName = this.routeConfig.routeName
    if (routeName.match(/\.edit/)) {
      routeName = routeName.replace(/\.edit/, '.detail')
    }

    routes.setRouteTitle(routeName, title)
  }
}
