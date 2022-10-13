<template>
  <div>
    <a-card :bordered="false">
      <a-descriptions title="角色信息">
        <a-descriptions-item label="角色ID">{{ role.role_id }}</a-descriptions-item>
        <a-descriptions-item label="角色名称">{{ role.name }}</a-descriptions-item>
        <a-descriptions-item label="状态">{{ role.status }}</a-descriptions-item>
      </a-descriptions>
    </a-card>

    <a-card :bordered="false" style="margin-top: 20px;">
      <a-descriptions title="权限配置"></a-descriptions>
      <a-tree
        v-if="treeShow"
        style="margin-left: 30px;"
        v-model="checkedKeys"
        :show-line="true"
        checkable
        :default-expand-all="true"
        :default-expanded-keys="defaultExpandedKeys"
        :tree-data="treeData"
        :replace-fields="{children:'children', title:'title', key:'node_id' }"
      />
      <a-row style="margin-top: 20px;">
        <a-button type="primary" @click="onSubmit" style="margin-left: 30px;">提交</a-button>
        <router-link to="/role/list">
          <a-button style="margin-left: 10px;">返回</a-button>
        </router-link>
      </a-row>
    </a-card>
  </div>
</template>

<script>
import { getRoleDetail, setRoleNode, getRoleNode } from '@/api/role'
import { getNodeTree } from '@/api/node'
export default {
  data () {
    return {
      role: {
        role_id: 0,
        name: '',
        status: 1
      },
      treeData: [],
      checkedKeys: [],
      defaultExpandedKeys: [],
      treeShow: false
    }
  },
  methods: {
    onSubmit () {
      setRoleNode({ role_id: this.role.role_id, node_ids: this.checkedKeys }).then(data => {
        this.$router.push({ path: '/role/list' })
        this.$message.success('设置成功')
      })
      console.log('checkedKeys', this.checkedKeys)
    }
  },
  mounted () {
    this.role.role_id = this.$route.params.role_id
    getRoleDetail(this.$route.params.role_id).then(data => {
      console.log(data)
      this.role = data
    })

    getNodeTree().then(data => {
      console.log(data)
      this.treeData = data

      // let key1 = 0
      // let key2 = 0

      // for (key1 in data) {
      //   this.defaultExpandedKeys.push(data[key1].node_id)

      //   if (data[key1].children.length > 0) {
      //     for (key2 in data[key1].children) {
      //       this.defaultExpandedKeys.push(data[key1].children[key2].node_id)
      //     }
      //   }
      // }

      this.treeShow = true
    })

    getRoleNode(this.role.role_id).then(data => {
      console.log('roleNode', data)
      this.checkedKeys = data
    })
  }
}
</script>
