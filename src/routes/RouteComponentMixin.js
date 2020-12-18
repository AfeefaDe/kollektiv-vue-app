import { Component, Vue, Watch } from 'vue-property-decorator'

@Component({
  props: ['routeConfig', 'routeOptions']
})
export class RouteComponentMixin extends Vue {
  created () {
    console.log('created', this.routeConfig.routeName)
  }

  destroyed () {
    console.log('destroyed', this.routeConfig.routeName)
  }

  @Watch('routeConfig.routeName')
  rcm_routeNameChanged () {
    // do something
  }
}
