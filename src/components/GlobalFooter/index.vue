<template>
  <global-footer class="footer custom-render">
    <template v-slot:links>
      <a href="https://www.antdv.com/docs/vue/introduce-cn/" target="_blank">vueComponent</a>
    </template>
  </global-footer>
</template>

<script>
import { GlobalFooter } from '@ant-design-vue/pro-layout'

export default {
  name: 'ProGlobalFooter',
  components: {
    GlobalFooter
  }
}
</script>
