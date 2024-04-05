<template>
  <div>
    <el-dialog v-bind="$attrs" v-on="$listeners" @open="onOpen" @close="onClose" title="Dialog Titile">
      <el-form ref="elForm" :model="formData" :rules="rules" size="mini" label-width="100px"
        label-position="left">
        <el-form-item label="任务名称" prop="任务名称">
          <el-input v-model="formData.任务名称" readonly clearable :style="{width: '100%'}"></el-input>
        </el-form-item>
        <el-form-item label="预估工时" prop="预估工时">
          <el-input v-model="formData.预估工时" readonly clearable :style="{width: '100%'}"></el-input>
        </el-form-item>
        <el-form-item label="消耗工时" prop="消耗工时">
          <el-input v-model="formData.消耗工时" readonly clearable :style="{width: '100%'}"></el-input>
        </el-form-item>
        <el-form-item label="技术评审点" prop="技术评审点">
          <el-input v-model="formData.技术评审点" readonly clearable :style="{width: '100%'}"></el-input>
        </el-form-item>
        <el-form-item label="交付物" prop="交付物">
          <el-input v-model="formData.交付物" readonly clearable :style="{width: '100%'}"></el-input>
        </el-form-item>
        <el-form-item label="交付物描述" prop="交付物描述">
          <el-input v-model="formData.交付物描述" readonly clearable :style="{width: '100%'}"></el-input>
        </el-form-item>
        <el-form-item label-width="0" prop="field108">
          <el-upload ref="field108" :file-list="field108fileList" :auto-upload="false"
            :before-upload="field108BeforeUpload" accept=".pdf">
            <el-button size="small" type="primary" icon="el-icon-upload">选取文件</el-button>
            <div slot="tip" class="el-upload__tip">只能上传不超过 10MB 的.pdf文件</div>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="close">取消</el-button>
        <el-button type="primary" @click="handelConfirm">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  inheritAttrs: false,
  components: {},
  props: [],
  data() {
    return {
      formData: {
        任务名称: undefined,
        预估工时: undefined,
        消耗工时: undefined,
        技术评审点: undefined,
        交付物: undefined,
        交付物描述: undefined,
        field108: null,
      },
      rules: {
        任务名称: [{
          required: true,
          message: '',
          trigger: 'blur'
        }],
        预估工时: [{
          required: true,
          message: '',
          trigger: 'blur'
        }],
        消耗工时: [{
          required: true,
          message: '',
          trigger: 'blur'
        }],
        技术评审点: [{
          required: true,
          message: '',
          trigger: 'blur'
        }],
        交付物: [{
          required: true,
          message: '',
          trigger: 'blur'
        }],
        交付物描述: [{
          required: true,
          message: '',
          trigger: 'blur'
        }],
      },
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    onOpen() {},
    onClose() {
      this.$refs['elForm'].resetFields()
    },
    close() {
      this.$emit('update:visible', false)
    },
    handelConfirm() {
      this.$refs['elForm'].validate(valid => {
        if (!valid) return
        this.close()
      })
    },
  }
}

</script>
<style>
.el-upload__tip {
  line-height: 1.2;
}

</style>
