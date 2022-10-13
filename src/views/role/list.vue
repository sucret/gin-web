<template>
  <a-card :bordered="false">
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="48" style="margin-bottom: 20px;margin-left:0px;">
          <a-button style="margin-left: 8px" @click="showModal('', 0)" type="primary" icon="plus">新建</a-button>
        </a-row>
      </a-form>
    </div>

    <div class="list">
      <a-table :columns="columns" :data-source="list" rowKey="role_id">
        <span slot="status" slot-scope="text">
          <a-badge :status="text | statusTypeFilter" :text="text | statusFilter" />
        </span>
        <span slot="action" slot-scope="text, record">
          <template>
            <a-button style="padding:0;" :disabled="record.role_id == 1" @click="showModal(record.name, record.role_id)" type="link">修改</a-button>
            <a-divider type="vertical" />
            <router-link :to="{ path:'/role/permission/' + record.role_id }">
              <a-button :disabled="record.role_id == 1" style="padding:0;" type="link">配置权限</a-button>
            </router-link>
          </template>
        </span>
      </a-table>
    </div>
    <a-modal
      :title="modalTitle"
      :visible="isShowModal"
      :confirm-loading="confirmLoading"
      @ok="handleOk"
      @cancel="handleCancel"
    >
      <p>
        <a-form-model >
          <a-form-model-item label="角色名称">
            <a-input v-model="form.name" />
          </a-form-model-item>
        </a-form-model>
      </p>
    </a-modal>
  </a-card>
</template>

<script>

import { getRoleList, saveRole } from '@/api/role.js'

const columns = [
  {
    title: '角色ID',
    dataIndex: 'role_id',
    scopedSlots: { customRender: 'role_id' },
    width: 140
  },
  {
    title: '角色名称',
    dataIndex: 'name'
  },
  {
    title: '角色状态',
    dataIndex: 'status',
    width: 180,
    scopedSlots: { customRender: 'status' }
  },
  {
    title: '操作',
    dataIndex: 'action',
    width: '150px',
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
    text: '禁用'
  }
}

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
      modalTitle: ''
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
    showModal (name, roleId) {
      this.modalTitle = roleId > 0 ? '编辑角色' : '创建角色'
      console.log(name, roleId)
      this.form.role_id = roleId
      this.form.name = name
      this.isShowModal = true
    },
    handleCancel () {
      this.isShowModal = false
    },
    handleOk () {
      const data = {
        name: this.form.name,
        role_id: this.form.role_id
      }

      saveRole(data).then(data => {
        const msg = this.form.role_id === 0 ? '创建成功' : '编辑成功'
        this.$message.success(msg)
        this.isShowModal = false

        getRoleList().then(data => {
          this.list = data
        })
      })
    }
  },
  mounted () {
    getRoleList().then(data => {
      this.list = data
    })
  }
}
</script>
