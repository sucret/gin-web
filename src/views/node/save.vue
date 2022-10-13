<template>
  <div>
    <a-card :body-style="{padding: '24px 32px'}" :bordered="false" style="margin-top: 24px">
      <a-form-model
        ref="ruleForm"
        :model="form"
        :rules="rules"
        :label-col="labelCol"
        :wrapper-col="wrapperCol">
        <a-form-model-item ref="title" label="节点名称" prop="title">
          <a-input v-model="form.title"/>
        </a-form-model-item>
        <a-form-model-item ref="title" label="页面名称" prop="name">
          <a-input v-model="form.name"/>
        </a-form-model-item>
        <a-form-model-item ref="component" label="组件" prop="component">
          <a-input v-model="form.component" placeholder="对应页面的组件名称"/>
        </a-form-model-item>
        <a-form-model-item label="上级节点" prop="parent_node_id">
          <a-tree-select
            allow-clear
            v-if="nodeTree != []"
            v-model="form.parent_node_id"
            style="width: 100%"
            :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
            :tree-data="nodeTree"
            :replace-fields="{children:'children', title:'title', key:'node_id', value: 'node_id' }"
            placeholder="请选择上级节点"
            tree-default-expand-all>
          </a-tree-select>
        </a-form-model-item>
        <a-form-model-item label="路径" prop="path">
          <a-input v-model="form.path" placeholder="页面或接口地址"/>
        </a-form-model-item>
        <a-form-model-item label="类型">
          <a-radio-group v-model="form.type" button-style="solid">
            <a-radio-button :value="1">菜单</a-radio-button>
            <a-radio-button :value="2">页面</a-radio-button>
            <a-radio-button :value="3">菜单&页面</a-radio-button>
            <a-radio-button :value="4">接口</a-radio-button>
          </a-radio-group>
        </a-form-model-item>
        <a-form-model-item ref="icon" label="图标" prop="icon">
          <a-select
            v-model="form.icon"
            style="width: 100%"
            placeholder="select one country"
            option-label-prop="label">
            <a-select-option v-for="(item, key) in iconOptions" :key="key" :value="item" :label="item">
              <a-icon :type="item" style="font-size: 14px;" class="iconOption"/>
              <span style="font-size: 14px; padding-left: 14px;">{{ item }}</span>
            </a-select-option>
          </a-select>
        </a-form-model-item>
        <a-form-model-item ref="redirect" label="重定向地址" prop="redirect">
          <a-input v-model="form.redirect" placeholder="如果是父级菜单，可能需要重定向到子页面"/>
        </a-form-model-item>
        <a-form-model-item :wrapper-col="{ span: 14, offset: 8 }">
          <a-button type="primary" @click="onSubmit">
            提交
          </a-button>
          <router-link to="/node/list">
            <a-button style="margin-left: 10px;" @click="resetForm">返回</a-button>
          </router-link>
        </a-form-model-item>
      </a-form-model>
    </a-card>
  </div>
</template>
<script>
import { saveNode, getNodeTree, getNodeDetail } from '@/api/node'
export default {
  data () {
    return {
      labelCol: { span: 4, offset: 4 },
      wrapperCol: { span: 10 },
      other: '',
      form: {
        node_id: 0,
        title: '',
        name: '',
        parent_node_id: '',
        type: 1,
        path: '',
        icon: '',
        redirect: '',
        component: ''
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
      iconOptions,
      nodeTree: []
    }
  },
  methods: {
    onSubmit () {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          this.form.parent_node_id = parseInt(this.form.parent_node_id)

          console.log('this.form', this.form)
          saveNode(this.form).then(data => {
            console.log(data)
            this.$router.push({ path: '/node/list' })
            const msg = this.form.node_id === 0 ? '创建成功' : '编辑成功'
            this.$message.success(msg)
          })
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
    const nodeId = this.$route.params.node_id
    const parentNodeId = this.$route.params.parent_node_id

    if (nodeId > 0) {
      getNodeDetail(nodeId).then(data => {
        console.log('node:', data)
        if (!data.parent_node_id) {
          data.parent_node_id = ''
        }

        this.form = data
      })
    }

    if (parentNodeId > 0) {
      this.form.parent_node_id = parentNodeId
    }

    console.log(nodeId, parentNodeId)
    getNodeTree().then(data => {
      console.log(data)
      this.nodeTree = data
    })
  }
}

const iconOptions = [
  'step-backward',
  'step-forward',
  'fast-backward',
  'fast-forward',
  'shrink',
  'arrows-alt',
  'down',
  'up',
  'left',
  'right',
  'caret-up',
  'caret-down',
  'caret-left',
  'caret-right',
  'up-circle',
  'down-circle',
  'left-circle',
  'right-circle',
  'double-right',
  'double-left',
  'vertical-left',
  'vertical-right',
  'vertical-align-top',
  'vertical-align-middle',
  'vertical-align-bottom',
  'forward',
  'backward',
  'rollback',
  'enter',
  'retweet',
  'swap',
  'swap-left',
  'swap-right',
  'arrow-up',
  'arrow-down',
  'arrow-left',
  'arrow-right',
  'play-circle',
  'up-square',
  'down-square',
  'left-square',
  'right-square',
  'login',
  'logout',
  'menu-fold',
  'menu-unfold',
  'border-bottom',
  'border-horizontal',
  'border-inner',
  'border-outer',
  'border-left',
  'border-right',
  'border-top',
  'border-verticle',
  'pic-center',
  'pic-left',
  'pic-right',
  'radius-bottomleft',
  'radius-bottomright',
  'radius-upleft',
  'radius-upright',
  'fullscreen',
  'fullscreen-exit',
  'question',
  'question-circle',
  'plus',
  'plus-circle',
  'pause',
  'pause-circle',
  'minus',
  'minus-circle',
  'plus-square',
  'minus-square',
  'info',
  'info-circle',
  'exclamation',
  'exclamation-circle',
  'close',
  'close-circle',
  'close-square',
  'check',
  'check-circle',
  'check-square',
  'clock-circle',
  'warning',
  'issues-close',
  'stop',
  'edit',
  'form',
  'copy',
  'scissor',
  'delete',
  'snippets',
  'diff',
  'highlight',
  'align-center',
  'align-left',
  'align-right',
  'bg-colors',
  'bold',
  'italic',
  'underline',
  'strikethrough',
  'redo',
  'undo',
  'zoom-in',
  'zoom-out',
  'font-colors',
  'font-size',
  'line-height',
  'dash',
  'small-dash',
  'sort-ascending',
  'sort-descending',
  'drag',
  'ordered-list',
  'unordered-list',
  'radius-setting',
  'column-width',
  'column-height',
  'area-chart',
  'pie-chart',
  'bar-chart',
  'dot-chart',
  'line-chart',
  'radar-chart',
  'heat-map',
  'fall',
  'rise',
  'stock',
  'box-plot',
  'fund',
  'sliders',
  'account-book',
  'alert',
  'api',
  'appstore',
  'audio',
  'bank',
  'bell',
  'book',
  'bug',
  'bulb',
  'calculator',
  'build',
  'calendar',
  'camera',
  'car',
  'carry-out',
  'cloud',
  'code',
  'compass',
  'contacts',
  'container',
  'control',
  'credit-card',
  'crown',
  'customer-service',
  'dashboard',
  'database',
  'dislike',
  'environment',
  'experiment',
  'eye-invisible',
  'eye',
  'file-add',
  'file-excel',
  'file-exclamation',
  'file-image',
  'file-markdown',
  'file-pdf',
  'file-ppt',
  'file-text',
  'file-unknown',
  'file-word',
  'file-zip',
  'file',
  'filter',
  'fire',
  'flag',
  'folder-add',
  'folder',
  'folder-open',
  'frown',
  'funnel-plot',
  'gift',
  'hdd',
  'heart',
  'home',
  'hourglass',
  'idcard',
  'insurance',
  'interaction',
  'layout',
  'like',
  'lock',
  'mail',
  'medicine-box',
  'meh',
  'message',
  'mobile',
  'money-collect',
  'pay-circle',
  'notification',
  'phone',
  'picture',
  'play-square',
  'printer',
  'profile',
  'project',
  'pushpin',
  'property-safety',
  'read',
  'reconciliation',
  'red-envelope',
  'rest',
  'rocket',
  'safety-certificate',
  'save',
  'schedule',
  'security-scan',
  'setting',
  'shop',
  'shopping',
  'skin',
  'smile',
  'sound',
  'star',
  'switcher',
  'tablet',
  'tag',
  'tags',
  'tool',
  'thunderbolt',
  'trophy',
  'unlock',
  'usb',
  'video-camera',
  'wallet',
  'apartment',
  'audit',
  'barcode',
  'bars',
  'block',
  'border',
  'branches',
  'ci',
  'cloud-download',
  'cloud-server',
  'cloud-sync',
  'cloud-upload',
  'cluster',
  'coffee',
  'copyright',
  'deployment-unit',
  'desktop',
  'disconnect',
  'dollar',
  'download',
  'ellipsis',
  'euro',
  'exception',
  'export',
  'file-done',
  'file-jpg',
  'file-protect',
  'file-sync',
  'file-search',
  'fork',
  'gateway',
  'global',
  'gold',
  'history',
  'import',
  'android',
  'apple',
  'windows',
  'ie',
  'chrome',
  'github',
  'aliwangwang',
  'dingding',
  'weibo-square',
  'weibo-circle',
  'taobao-circle',
  'html5',
  'weibo',
  'twitter',
  'wechat',
  'youtube',
  'alipay-circle',
  'taobao',
  'skype',
  'qq',
  'medium-workmark',
  'gitlab',
  'medium',
  'linkedin',
  'google-plus',
  'dropbox',
  'facebook',
  'codepen',
  'code-sandbox',
  'amazon',
  'google',
  'codepen-circle',
  'alipay',
  'ant-design',
  'ant-cloud',
  'aliyun',
  'zhihu',
  'slack',
  'slack-square',
  'behance',
  'behance-square',
  'dribbble',
  'dribbble-square',
  'instagram',
  'yuque',
  'alibaba',
  'yahoo',
  'reddit',
  'sketch',
  'inbox',
  'key',
  'laptop',
  'link',
  'line',
  'loading-3-quarters',
  'loading',
  'man',
  'menu',
  'monitor',
  'more',
  'number',
  'percentage',
  'paper-clip',
  'pound',
  'poweroff',
  'pull-request',
  'qrcode',
  'reload',
  'safety',
  'robot',
  'scan',
  'search',
  'select',
  'shake',
  'share-alt',
  'shopping-cart',
  'solution',
  'sync',
  'table',
  'team',
  'to-top',
  'trademark',
  'transaction',
  'upload',
  'user-add',
  'user-delete',
  'usergroup-add',
  'user',
  'usergroup-delete',
  'wifi',
  'woman'
]
</script>
