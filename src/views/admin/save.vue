<template>
  <div>
    <a-card :body-style="{padding: '24px 32px'}" :bordered="false" style="margin-top: 24px">
      <a-form-model
        ref="ruleForm"
        :model="form"
        :rules="rules"
        :label-col="labelCol"
        :wrapper-col="wrapperCol">
        <a-form-model-item ref="username" label="用户名" prop="username">
          <a-input v-model="form.username"/>
        </a-form-model-item>
        <a-form-model-item label="手机号" prop="mobile">
          <a-input v-model="form.mobile" placeholder="请输入手机号"/>
        </a-form-model-item>
        <a-form-model-item label="密码" prop="password">
          <a-input v-model="form.password" placeholder="请输入密码"/>
        </a-form-model-item>
        <a-form-model-item label="角色" prop="role_id">
          <a-checkbox-group v-model="form.role">
            <a-col style="height: 25px;" :span="24" v-for="(item, key) in roleCheckOptions" :key="key">
              <a-checkbox :value="item.role_id">
                {{ item.name }}
              </a-checkbox>
            </a-col>
          </a-checkbox-group>
        </a-form-model-item>
        <a-form-model-item :wrapper-col="{ span: 14, offset: 8 }">
          <a-button type="primary" @click="onSubmit">
            提交
          </a-button>
          <router-link to="/aduser/list">
            <a-button style="margin-left: 10px;" @click="resetForm">返回</a-button>
          </router-link>
        </a-form-model-item>
      </a-form-model>
    </a-card>
  </div>
</template>
<script>
import { getAdminDetail, saveAdmin } from '@/api/admin'
import { getRoleList } from '@/api/role'
export default {
  data () {
    return {
      labelCol: { span: 4, offset: 4 },
      wrapperCol: { span: 10 },
      other: '',
      form: {
        admin_id: 0,
        username: '',
        mobile: '',
        password: '',
        role: []
      },
      rules: {
        title: [
          { required: true, message: '请输入节点名称', trigger: 'blur' },
          { min: 3, max: 8, message: '名称长度必须是3到8个字符', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '请输入页面名称', trigger: 'blur' },
          { min: 2, max: 24, message: '名称长度必须是2到24个字符', trigger: 'blur' }
        ]
      },
      roleCheckOptions: []
    }
  },
  methods: {
    onSubmit () {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          saveAdmin(this.form).then(data => {
            console.log('data', data)
            this.$router.push({ path: '/aduser/list' })
            const msg = this.form.admin_id === 0 ? '创建成功' : '编辑成功'
            this.$message.success(msg)
          })
          console.log('this.form', this.form)
        } else {
          this.$message.error('参数校验未通过')
          return false
        }
      })
    },
    resetForm () {
      this.$refs.ruleForm.resetFields()
    }
  },
  mounted () {
    if (this.$route.params.admin_id) {
      getAdminDetail(this.$route.params.admin_id).then(data => {
        this.form.admin_id = data.admin_id
        this.form.username = data.username
        this.form.mobile = data.mobile

        let key = 0
        for (key in data.role_info) {
          this.form.role.push(data.role_info[key].role_id)
        }
        this.roleCheckOptions = data.role_list
      })
    } else {
      getRoleList().then(data => {
        this.roleCheckOptions = data
        console.log('data', data)
      })
    }
  }
}
</script>
