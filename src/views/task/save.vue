<template>
  <div>
    <a-card :body-style="{padding: '24px 32px'}" :bordered="false" style="margin-top: 24px">
      <a-form-model ref="ruleForm" :model="form" :rules="rules" :label-col="labelCol" :wrapper-col="wrapperCol">
        <a-form-model-item ref="name" label="任务名称" prop="name">
          <a-input v-model="form.name" placeholder="任务名称" />
        </a-form-model-item>
        <a-form-model-item ref="spec" label="表达式" prop="spec">
          <a-input v-model="form.spec" placeholder="表达式：@every 1s、 * * * * *" />
        </a-form-model-item>
        <a-form-model-item ref="command" label="命令" prop="command">
          <a-input v-model="form.command" placeholder="命令" />
        </a-form-model-item>
        <a-form-model-item ref="process_num" label="进程数" prop="process_num">
          <a-input v-model="form.process_num" placeholder="进程数，默认1" />
        </a-form-model-item>
        <a-form-model-item ref="status_checkec" label="是否启用" prop="status_checkec">
          <a-switch v-model="form.status_checkec" checked-children="启用" un-checked-children="停用" />
        </a-form-model-item>
        <a-form-model-item :wrapper-col="{ span: 14, offset: 8 }">
          <a-button type="primary" @click="onSubmit">
            提交
          </a-button>
          <router-link to="/task/list">
            <a-button style="margin-left: 10px;">返回</a-button>
          </router-link>
        </a-form-model-item>
      </a-form-model>
    </a-card>
  </div>
</template>

<script>

import { saveTask, taskDetail } from '@/api/task'

export default {
  data () {
    return {
      labelCol: { span: 4, offset: 4 },
      wrapperCol: { span: 10 },
      other: '',
      form: {
        task_id: 0,
        name: '',
        spec: '',
        command: '',
        process_num: 1,
        status: 1,
        status_checkec: true
      },
      rules: {
        name: [
          { required: true, message: '请输入任务名称', trigger: 'blur' },
          { min: 2, max: 20, message: '名称长度必须是2到20个字符', trigger: 'blur' }
        ],
        spec: [
          { required: true, message: '请输入任务表达式', trigger: 'blur' },
          { min: 2, max: 24, message: '表达式长度必须是2到24个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    onSubmit () {
      this.$refs.ruleForm.validate(valid => {
        console.log(valid)
        if (valid) {
          this.form.status = this.form.status_checkec ? 1 : 2
          this.form.process_num = parseInt(this.form.process_num)
          saveTask(this.form).then(data => {
            this.$router.push({ path: '/task/list' })
            const msg = this.form.task_id === 0 ? '创建成功' : '编辑成功'
            this.$message.success(msg)
          })
        } else {
          this.$message.error('参数校验未通过')
          return false
        }
      })
    }
  },
  mounted () {
    if (this.$route.params.task_id) {
      taskDetail(this.$route.params.task_id).then(data => {
        this.form = {
          task_id: data.task_id,
          name: data.name,
          spec: data.spec,
          command: data.command,
          process_num: data.process_num,
          status: data.status,
          status_checkec: parseInt(data.status) === 1
        }
      })
    }
  }
}
</script>
