<template>
  <a-select
    v-model="selectedValue"
    show-search
    placeholder="请选择一个店铺"
    option-filter-prop="children"
    style="width: 100%"
    @change="handleChange"
    :disabled="shopSelectDisable">
    <a-select-option v-for="shop in shopList" :key="shop.shop_id" :value="shop.shop_id">
      {{ shop.name }}
    </a-select-option>
  </a-select>
</template>

<script>
import { getShopList } from '@/api/shop.js'

export default ({
  props: {
    shopId: { default: '', type: undefined }, // 默认的店铺ID
    shopSelectDisable: { default: false, type: Boolean } // 是否禁用，默认否
  },
  data () {
    return {
      shopList: [],
      selectedValue: ''
    }
  },
  watch: {
    selectedValue: function () {
      this.$emit('change', this.selectedValue)
    }
  },
  methods: {
    handleChange (val) {
      console.log(val)
    }
  },
  mounted () {
    getShopList().then(data => {
      this.selectedValue = this.shopId
      this.shopList = data
    })
  }
})
</script>
