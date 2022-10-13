<template>
  <a-card :bordered="false">
    <a-col style="margin: 12px;">
      <router-link to="/node/save/0/0">
        <a-button type="primary" icon="plus-circle">新增</a-button>
      </router-link>
    </a-col>
    <a-table
      bordered
      :scroll="{ x: 1170 }"
      :columns="columns"
      :data-source="nodeTree"
      rowKey="node_id"
      :pagination="false"
      :default-expanded-row-keys="defaultExpandedRowKeys"
      size="small">
      <span slot="node_id" slot-scope="text, record">
        <router-link :to="{ path:'/node/save/' + record.node_id + '/' + record.parent_node_id }">
          <a-button style="padding:0;" type="link">{{ record.node_id }}</a-button>
        </router-link>
      </span>
      <span slot="type" slot-scope="text">
        <a-tag v-if="text == 1" color="orange">#菜单</a-tag>
        <a-tag v-if="text == 2" color="green">#页面</a-tag>
        <a-tag v-if="text == 3" color="cyan">#菜单&页面</a-tag>
        <a-tag v-if="text == 4" color="purple">#接口</a-tag>
      </span>

      <span slot="icon" slot-scope="text">
        <a-icon :type="text" />
        <span style="padding-left: 10px;">{{ text }}</span>
      </span>
      <span slot="action" slot-scope="text, record">
        <template>
          <router-link :to="{ path:'/node/save/' + record.node_id + '/' + record.parent_node_id }">
            <a-button style="padding:0;" type="link">编辑</a-button>
          </router-link>
          <a-divider type="vertical" />
          <router-link :to="{ path:'/node/save/0/' + record.node_id }">
            <a-button style="padding:0;" type="link">新增子节点</a-button>
          </router-link>
          <a-divider type="vertical" />
          <a-popconfirm
            title="确定要删除这个节点吗？"
            ok-text="是"
            cancel-text="否"
            @confirm="deleteNode(record.node_id)">
            <a-button style="padding:0;" type="link">删除</a-button>
          </a-popconfirm>
        </template>
      </span>
    </a-table>
  </a-card>
</template>
<script>
import { getNodeTree, deleteNode } from '@/api/node'

const columns = [
  {
    title: '节点名称',
    dataIndex: 'title',
    fixed: 'left',
    width: 260
  },
  {
    title: '节点ID',
    dataIndex: 'node_id',
    width: 90,
    fixed: 'left',
    scopedSlots: { customRender: 'node_id' }
  },
  {
    title: '类型',
    dataIndex: 'type',
    width: 100,
    scopedSlots: { customRender: 'type' }
  },
  {
    title: '图标',
    dataIndex: 'icon',
    width: 150,
    scopedSlots: { customRender: 'icon' }
  },
  {
    title: '组件',
    dataIndex: 'component',
    width: 150
  },
  {
    title: '路径(页面或接口地址）',
    dataIndex: 'path',
    width: 200
  },
  {
    title: '重定向地址',
    dataIndex: 'redirect',
    width: 200
  },
  {
    title: '操作',
    dataIndex: 'action',
    width: 200,
    scopedSlots: { customRender: 'action' },
    fixed: 'right'
  }
]

export default {
  data () {
    return {
      list: [],
      columns,
      queryParam: {},
      isShowModal: false,
      confirmLoading: false,
      form: {
        role_id: 0,
        name: ''
      },
      modalTitle: '',
      nodeTree: [],
      expandedRowKeys: [],
      defaultExpandAllRows: true,
      defaultExpandedRowKeys: []
    }
  },
  methods: {
    deleteNode (nodeId) {
      deleteNode(nodeId).then(data => {
        console.log('deleteNode', data)
        this.$message.success('删除成功')
        this.getData()
      })
    },
    getData () {
      getNodeTree().then(data => {
        console.log(data)
        let key1 = 0
        let key2 = 0

        for (key1 in data) {
          this.defaultExpandedRowKeys.push(data[key1].node_id)

          if (data[key1].children.length > 0) {
            for (key2 in data[key1].children) {
              this.defaultExpandedRowKeys.push(data[key1].children[key2].node_id)
            }
          }
        }
        this.nodeTree = data
      })
    }
  },
  mounted: function () {
    this.getData()
  }
}
</script>
