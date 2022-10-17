<template>
  <a-card :bordered="false">
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="48">
          <a-col :md="8" :sm="24">
            <a-form-item label="">
              <router-link :to="{ path:'/task/save' }">
                <a-button type="primary" icon="plus">新建</a-button>
              </router-link>
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </div>
    <div class="list">
      <a-table :columns="columns" :data-source="list" rowKey="task_id" :key="tableKey">
        <span slot="status" slot-scope="text">
          <a-badge :status="text | statusTypeFilter" :text="text | statusFilter" />
        </span>
        <span slot="action" slot-scope="text, record">
          <template>
            <a-button style="padding:0;" type="link" @click="changeStatus(record.task_id, record.status)">{{ record.status == 1 ? '停用' : '启用' }}</a-button>
            <a-divider type="vertical" />
            <router-link :to="{ path:'/task/edit/' + record.task_id }">
              <a-button style="padding:0;" type="link">编辑</a-button>
            </router-link>
            <a-divider type="vertical" />
            <router-link :to="{ path:'/task/log/' + record.task_id }">
              <a-button style="padding:0;" type="link">日志</a-button>
            </router-link>
            <a-divider type="vertical" />
            <a-button style="padding:0;" type="link" @click="executeTask(record.task_id)">手动执行</a-button>
          </template>
        </span>
      </a-table>
    </div>
  </a-card>
</template>

<script>
import { getTaskList, changeStatus, executeTask } from '@/api/task.js'

const columns = [
  {
    title: '任务ID',
    dataIndex: 'task_id'
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
      },
      tableKey: 0
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
  methods: {
    changeStatus (taskId, status) {
      status = status === 1 ? 2 : 1
      changeStatus(taskId, status).then(data => {
        var i = 0
        for (i in this.list) {
          if (this.list[i].task_id === taskId) {
            console.log('aaa', data)
            this.list[i] = data
            this.tableKey = new Date().getTime()
            break
          }
        }
        console.log(data)
      })
    },
    executeTask (taskId) {
      executeTask(taskId).then(data => {
        this.$message.success('执行成功')
      })
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
