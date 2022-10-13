<template>
  <a-card :bordered="false">
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="48">
          <a-col :md="8" :sm="24">
            <a-form-item label="">
              <router-link :to="{ path:'/aduser/add' }">
                <a-button type="primary" icon="plus">新建</a-button>
              </router-link>
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </div>
    <div class="list">
      <a-table :columns="columns" :data-source="list" rowKey="cron_task_id">
        <span slot="status" slot-scope="text">
          <a-badge :status="text | statusTypeFilter" :text="text | statusFilter" />
        </span>
        <span slot="action" slot-scope="text, record">
          <template>
            <router-link :to="{ path:'/task/edit/' + record.cron_task_id }">
              <a-button style="padding:0;" type="link">编辑</a-button>
            </router-link>
            <a-divider type="vertical" />
            <router-link :to="{ path:'/task/save/0/' + record.node_id }">
              <a-button style="padding:0;" type="link">删除</a-button>
            </router-link>
            <a-divider type="vertical" />
            <router-link :to="{ path:'/node/log/' + record.node_id }">
              <a-button style="padding:0;" type="link">日志</a-button>
            </router-link>
            <a-divider type="vertical" />
            <router-link :to="{ path:'/node/manual/' + record.node_id }">
              <a-button style="padding:0;" type="link">手动执行</a-button>
            </router-link>
          </template>
        </span>
      </a-table>
    </div>
  </a-card>
</template>

<script>
import { getTaskList } from '@/api/task.js'

const columns = [
  {
    title: '任务ID',
    dataIndex: 'cron_task_id'
  },
  {
    title: '任务名称',
    dataIndex: 'name'
  },
  {
    title: '表达式',
    dataIndex: 'spec'
  },
  {
    title: '命令',
    dataIndex: 'command'
  },
  {
    title: '进程数(单机)',
    dataIndex: 'process_num'
  },
  {
    title: '状态',
    dataIndex: 'status',
    key: 'status',
    width: 100,
    scopedSlots: { customRender: 'status' }
  },
  {
    title: '操作',
    dataIndex: 'action',
    scopedSlots: { customRender: 'action' }
  }
]

const statusMap = {
  1: {
    status: 'success',
    text: '启用'
  },
  2: {
    status: 'error',
    text: '停用'
  }
}

export default {
  data () {
    return {
      list: [],
      columns,
      queryParam: {},
      form: {
        role_id: 0,
        name: ''
      }
    }
  },
  filters: {
    statusFilter (type) {
      return statusMap[type].text
    },
    statusTypeFilter (type) {
      return statusMap[type].status
    }
  },
  mounted () {
    getTaskList().then(data => {
      this.list = data
      console.log(data)
    })
  }
}
</script>
