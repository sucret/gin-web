<template>
  <a-card :bordered="false">
    <div class="list">
      <a-table :columns="columns" :data-source="list" rowKey="task_log_id" :pagination="false">
        <span slot="status" slot-scope="text">
          <a-badge :color="text | statusTypeFilter" :text="text | statusFilter" />
        </span>
      </a-table>
      <a-pagination
        style="margin-top: 20px;text-align: right;"
        v-model="page"
        :page-size-options="pageSizeOptions"
        :total="total"
        show-size-changer
        :page-size="pageSize"
        @showSizeChange="onShowSizeChange"
        @change="changePage"
        :key="pageKey"
      >
      </a-pagination>
    </div>
  </a-card>
</template>

<script>
import { taskLog } from '@/api/task.js'

const columns = [
  {
    title: '日志ID',
    dataIndex: 'task_log_id'
  },
  {
    title: '任务ID',
    dataIndex: 'task_id'
  },
  {
    title: '任务状态',
    dataIndex: 'status',
    key: 'status',
    scopedSlots: { customRender: 'status' }
  },
  {
    title: '执行结果',
    dataIndex: 'log'
  },
  {
    title: '开始时间',
    dataIndex: 'start_time'
  },
  {
    title: '结束时间',
    dataIndex: 'end_time'
  }
]

const statusMap = {
  1: {
    color: 'blue',
    text: '执行中'
  },
  2: {
    color: 'green',
    text: '执行完成'
  },
  3: {
    color: 'red',
    text: '执行失败'
  },
  4: {
    color: 'purple',
    text: '手动取消'
  }
}

export default {
  data () {
    return {
      taskId: 0,
      list: [],
      columns,
      queryParam: {},
      page: 1,
      pageSize: 10,
      pageSizeOptions: ['10', '20', '30', '40', '50'],
      total: 0,
      pageKey: 0
    }
  },
  filters: {
    statusFilter (type) {
      return statusMap[type].text
    },
    statusTypeFilter (type) {
      return statusMap[type].color
    }
  },
  methods: {
    onShowSizeChange (current, pageSize) {
      this.page = 1
      this.pageSize = pageSize
      this.getTaskLog()
      this.pageKey = new Date().getTime()
    },
    changePage (page, pageSize) {
      this.page = page
      this.getTaskLog()
    },
    getTaskLog () {
      var param = {
        task_id: parseInt(this.taskId),
        page: parseInt(this.page),
        page_size: parseInt(this.pageSize)
      }

      taskLog(param).then(data => {
        this.list = data.list
        this.total = data.total
      })
    }
  },
  mounted () {
    var taskId = this.$route.params.task_id
    if (!taskId) {
      this.$message.error('参数错误')
      return false
    }
    this.taskId = taskId

    this.getTaskLog()
  }
}
</script>
