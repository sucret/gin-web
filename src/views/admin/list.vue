<template>
  <a-card :bordered="false">
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="48">
          <a-col :md="8" :sm="24">
            <a-form-item label="角色名称">
              <a-input placeholder=""/>
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <a-button type="primary">查询</a-button>
            <a-button style="margin-left: 8px" @click="() => this.queryParam = {}">重置</a-button>
            <router-link :to="{ path:'/aduser/add' }">
              <a-button style="margin-left: 8px" type="primary" icon="plus">新建</a-button>
            </router-link>
          </a-col>
        </a-row>
      </a-form>
    </div>
    <div class="list">
      <a-table :columns="columns" :data-source="adminList" rowKey="admin_id">
        <span slot="node_id" slot-scope="text, record">
          <router-link :to="{ path:'/node/save/' + record.node_id + '/' + record.parent_node_id }">
            <a-button style="padding:0;" type="link">{{ record.node_id }}</a-button>
          </router-link>
        </span>
        <span slot="role_list" slot-scope="role_list">
          <a-tag v-for="(val, key) in role_list" :key="key" color="green">{{ val.name }}</a-tag>
        </span>
        <span slot="action" slot-scope="text, record">
          <template>
            <router-link :to="{ path:'/aduser/edit/' + record.admin_id }">
              <a-button :disabled="record.admin_id == 1" style="padding:0;" type="link">编辑</a-button>
            </router-link>
            <a-divider type="vertical" />
            <router-link :to="{ path:'/node/save/0/' + record.node_id }">
              <a-button :disabled="record.admin_id == 1" style="padding:0;" type="link">删除</a-button>
            </router-link>
          </template>
        </span>
      </a-table>
    </div>
  </a-card>
</template>

<script>
import { getAdminList } from '@/api/admin'

const columns = [
  {
    title: '用户ID',
    dataIndex: 'admin_id',
    scopedSlots: { customRender: 'admin_id' },
    width: 140
  },
  {
    title: '用户名',
    dataIndex: 'username'
  },
  {
    title: '手机号',
    dataIndex: 'mobile',
    width: 180,
    scopedSlots: { customRender: 'mobile' }
  },
  {
    title: '角色',
    dataIndex: 'role_list',
    scopedSlots: { customRender: 'role_list' }
  },
  {
    title: '操作',
    dataIndex: 'action',
    scopedSlots: { customRender: 'action' }
  }
]

export default {
  data () {
    return {
      list: [],
      columns,
      queryParam: {},
      form: {
        role_id: 0,
        name: ''
      },
      adminList: []
    }
  },
  mounted () {
    getAdminList().then(data => {
      this.adminList = data
    })
  }
}
</script>
