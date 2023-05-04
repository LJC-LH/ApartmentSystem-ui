<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="120px">
      <el-form-item label="学生id" prop="studentId">
        <el-input v-model="queryParams.studentId" placeholder="请输入学生id" clearable @keyup.enter.native="handleQuery" />
      </el-form-item>
      <el-form-item label="楼栋号" prop="buildingNo">
        <el-input v-model="queryParams.buildingNo" placeholder="请输入楼栋号" clearable @keyup.enter.native="handleQuery" />
      </el-form-item>
      <el-form-item label="房间号" prop="roomNo">
        <el-input v-model="queryParams.roomNo" placeholder="请输入房间号" clearable @keyup.enter.native="handleQuery" />
      </el-form-item>
      <!-- <el-form-item label="损坏说明" prop="damageDescription">
        <el-input
          v-model="queryParams.damageDescription"
          placeholder="请输入损坏说明"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item> -->
      <el-form-item label="报修创建时间" prop="createAt">
        <el-date-picker clearable v-model="queryParams.createAt" type="date" value-format="yyyy-MM-dd"
          placeholder="请选择报修创建时间">
        </el-date-picker>
      </el-form-item>
      <!-- <el-form-item label="一次维修人员id" prop="firstRepairmanId">
        <el-input
          v-model="queryParams.firstRepairmanId"
          placeholder="请输入一次维修人员id"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item> -->
      <!-- <el-form-item label="第一次报修完成时间" prop="firstCompletionTime">
        <el-date-picker clearable
          v-model="queryParams.firstCompletionTime"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="请选择第一次报修完成时间">
        </el-date-picker>
      </el-form-item> -->
      <!-- <el-form-item label="校区管理办公室意见" prop="campusManagementOpinion">
        <el-input
          v-model="queryParams.campusManagementOpinion"
          placeholder="请输入校区管理办公室意见"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item> -->
      <!-- <el-form-item label="是否二次派单，0否，1是" prop="isSecondDispatch">
        <el-input
          v-model="queryParams.isSecondDispatch"
          placeholder="请输入是否二次派单，0否，1是"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item> -->
      <!-- <el-form-item label="学生评分" prop="evaluateRate">
        <el-input
          v-model="queryParams.evaluateRate"
          placeholder="请输入学生评分"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item> -->
      <!-- <el-form-item label="二次维修人员id" prop="secondaryRepairmanId">
        <el-input
          v-model="queryParams.secondaryRepairmanId"
          placeholder="请输入二次维修人员id"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item> -->
      <!-- <el-form-item label="第二次报修预计完成时间" prop="secondExpectedCompletionTime">
        <el-date-picker clearable
          v-model="queryParams.secondExpectedCompletionTime"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="请选择第二次报修预计完成时间">
        </el-date-picker>
      </el-form-item> -->
      <!-- <el-form-item label="第二次报修实际完成时间" prop="secondActualCompletionTime">
        <el-date-picker clearable
          v-model="queryParams.secondActualCompletionTime"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="请选择第二次报修实际完成时间">
        </el-date-picker>
      </el-form-item> -->
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button type="primary" plain icon="el-icon-plus" size="mini" @click="handleAdd"
          v-hasPermi="['apartment:studentRepairApplication:add']">报修</el-button>
      </el-col>
      <!-- <el-col :span="1.5">
        <el-button
          type="success"
          plain
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['apartment:studentRepairApplication:edit']"
        >修改</el-button>
      </el-col> -->
      <!-- <el-col :span="1.5">
        <el-button type="danger" plain icon="el-icon-delete" size="mini" :disabled="multiple" @click="handleDelete"
          v-hasPermi="['apartment:studentRepairApplication:remove']">删除</el-button>
      </el-col> -->
      <!-- <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['apartment:studentRepairApplication:export']"
        >导出</el-button>
      </el-col> -->
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="studentRepairApplicationList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <!-- <el-table-column label="报修号" align="center" prop="repairId" /> -->
      <!-- <el-table-column label="学生id" align="center" prop="studentId" /> -->
      <el-table-column label="楼栋号" align="center" prop="buildingNo" />
      <el-table-column label="房间号" align="center" prop="roomNo" />
      <el-table-column label="损坏说明" align="center" prop="damageDescription" />
      <!-- <el-table-column label="报修类型" align="center" prop="fixType" /> -->
      <el-table-column label="报修创建时间" align="center" prop="createAt" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.createAt, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="学生评价内容" align="center" prop="evaluateContent" />
      <el-table-column label="学生评分" align="center" prop="evaluateRate" />
      <el-table-column label="报修状态" align="center" prop="fixStatus">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.fzu_fix_status" :value="scope.row.fixStatus" />
        </template>
      </el-table-column>>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button size="mini" type="text" icon="el-icon-delete" @click="handleDelete(scope.row)"
            v-hasPermi="['apartment:studentRepairApplication:remove']" v-bind:disabled="scope.row.fixStatus != 0 ">删除</el-button>
          <el-button size="mini" type="text" icon="el-icon-delete" @click="handleContent(scope.row)"
            v-bind:disabled="scope.row.fixStatus != 4 || scope.row.evaluateContent != null">评价</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total > 0" :total="total" :page.sync="queryParams.pageNum" :limit.sync="queryParams.pageSize"
      @pagination="getList" />


    <el-dialog v-bind="$attrs" v-on="$listeners" :visible.sync="stuOrderOpen" @open="onOpen" @close="onClose"
      width="1000px" title="新建保修订单">
      <el-form ref="elForm" :model="addForm" :rules="uploadrules" size="medium" label-width="100px">
        <el-form-item label="楼栋名" prop="buildingNo">
          <el-input v-model="addForm.buildingNo" placeholder="请输入楼栋名" clearable :style="{ width: '100%' }" disabled>
          </el-input>
        </el-form-item>
        <el-form-item label="房间名" prop="roomNo">
          <el-input v-model="addForm.roomNo" placeholder="请输入房间名" clearable :style="{ width: '100%' }" disabled>
          </el-input>
        </el-form-item>
        <el-form-item label="请上传图片" prop="imags">
          <el-upload :file-list="fileList" action="/system/user/profile/uploadPicture" list-type="picture-card"
            :show-file-list="true" :on-preview="handlePictureCardPreview" :on-remove="handleRemove"
            :on-change="handleFileChange" :before-upload="beforePictureUpload" :auto-upload="false"
            @close="handleCloseDialog" ref="upload" accept=".jpg,.jpeg,.png,.bmp">
            <el-icon>
              <Plus />
            </el-icon>
          </el-upload>

          <el-dialog :visible.sync="dialogVisible">
            <img w-full :src="dialogImageUrl" alt="Preview Image" />
          </el-dialog>
        </el-form-item>
        <el-form-item label="损坏说明" prop="damageDescription">
          <el-input v-model="addForm.damageDescription" type="textarea" placeholder="请输入损坏说明"
            :autosize="{ minRows: 4, maxRows: 4 }" :style="{ width: '100%' }"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="close">取消</el-button>
        <el-button type="primary" @click="handleConfirm">确定</el-button>
      </div>
    </el-dialog>

    <el-dialog v-bind="$attrs" v-on="$listeners" :visible.sync="contentOpen" @open="contentVisable" @close="contentClose"
      width="1000px" title="订单评价">
      <el-form ref="elForm" :model="contentForm" :rules="contentRules" size="medium" label-width="180px">
        <el-form-item label="请为本次服务打星" prop="evaluateRate">
          <el-rate v-model="contentForm.evaluateRate" :texts="['太差了', '不太行', '正常', '挺好', '很棒']" show-text />
        </el-form-item>
        <el-form-item label="评价内容" prop="evaluateContent">
          <el-input v-model="contentForm.evaluateContent" type="textarea" placeholder="请进行评价"
            :autosize="{ minRows: 4, maxRows: 4 }" :style="{ width: '100%' }"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="contentCancle">取消</el-button>
        <el-button type="primary" @click="contentConfirm">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { listStudentRepairApplication, getStudentRepairApplication, delStudentRepairApplication, addStudentRepairApplication, updateStudentRepairApplication, getInfo, updateEvaluate } from "@/api/apartment/studentRepairApplication";
import { uploadStuImages } from "@/api/apartment/uploading.js"
export default {
  name: "StudentRepairApplication",
  dicts: ['fzu_fix_status'],
  inheritAttrs: false,
  components: {
  },
  data() {
    return {
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 显示搜索条件
      showSearch: true,
      // 总条数
      total: 0,
      // 学生报修表格数据
      studentRepairApplicationList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        studentId: null,
        buildingNo: null,
        roomNo: null,
        damageDescription: null,
        fixType: null,
        createAt: null,
        fixStatus: null,
        firstRepairmanId: null,
        firstWorkContent: null,
        firstCompletionTime: null,
        campusManagementOpinion: null,
        isSecondDispatch: null,
        evaluateContent: null,
        evaluateRate: null,
        secondaryRepairmanId: null,
        secondExpectedCompletionTime: null,
        secondActualCompletionTime: null,
        secondWorkContent: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
      },
      // 保修对话框
      updateFlag: false,
      fullscreenLoading: false,
      // 学生上传订单
      addForm: {
      },
      uploadrules: {
        buildingNo: [{
          required: true,
          message: '请输入楼栋名',
          trigger: 'blur'
        }],
        roomNo: [{
          required: true,
          message: '请输入房间名',
          trigger: 'blur'
        }],
        damageDescription: [{
          required: true,
          message: '请对损坏情况进行说明',
          trigger: 'blur'
        }],
      },
      contentRules: {
        evaluateRate: [],
        evaluateContent: [{
          required: true,
          message: '请输入评价内容',
          trigger: 'blur'
        }]
      },
      stuOrderOpen: false,
      // 学生订单上传图片组件
      dialogImageUrl: '',
      tempFileList: [],
      fileList: [],
      dialogVisible: false,
      uploadUrl: '/system/user/profile/uploadPicture',
      urlList: [],
      // 评价表单
      contentForm: {},
      contentOpen: false,
      contentId: ''
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询学生报修列表 */
    getList() {
      this.loading = true;
      listStudentRepairApplication(this.queryParams).then(response => {
        this.studentRepairApplicationList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    // 表单重置
    reset() {
      this.form = {
        repairId: null,
        studentId: null,
        buildingNo: null,
        roomNo: null,
        damageDescription: null,
        fixType: null,
        createAt: null,
        fixStatus: null,
        firstRepairmanId: null,
        firstWorkContent: null,
        firstCompletionTime: null,
        campusManagementOpinion: null,
        isSecondDispatch: null,
        evaluateContent: null,
        evaluateRate: null,
        secondaryRepairmanId: null,
        secondExpectedCompletionTime: null,
        secondActualCompletionTime: null,
        secondWorkContent: null,
        stuImagesURL: [],
        onceImagesURL: [],
        secondImagesURL: [],
      };
      this.resetForm();
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.getList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm("queryForm");
      this.handleQuery();
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.repairId)
      this.single = selection.length !== 1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      // TODO: 获取消息
      getInfo().then(res => {
        this.reset();
        this.stuOrderOpen = true;
        this.title = "添加学生报修";
        this.addForm.buildingNo = res.data.buildingNo
        this.addForm.roomNo = res.data.roomNo
      })
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const repairId = row.repairId || this.ids
      // this.upload.open = true
      // getStudentRepairApplication(repairId).then(response => {

      //   this.form = response.data;
      //   this.open = true;
      //   this.title = "修改学生报修";
      // });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.repairId != null) {
            updateStudentRepairApplication(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addStudentRepairApplication(this.form).then(response => {
              this.$modal.msgSuccess("新增成功");
              this.open = false;
              this.getList();
            });
          }
        }
      });
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const repairIds = row.repairId || this.ids;
      this.$modal.confirm('是否确认删除学生报修编号为"' + repairIds + '"的数据项？').then(function () {
        return delStudentRepairApplication(repairIds);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => { });
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('apartment/studentRepairApplication/export', {
        ...this.queryParams
      }, `studentRepairApplication_${new Date().getTime()}.xlsx`)
    },
    onOpen() {
    },
    onClose() {
      this.$refs['elForm'].resetFields()
      this.$refs.upload.clearFiles();
      this.tempFileList = []
      this.addForm = {}
      this.getList()
    },
    close() {
      this.$emit('update:visible', false)
      this.stuOrderOpen = false;
      this.addFormReset();
      this.$refs.upload.clearFiles();

    },
    handleConfirm() {
      // 图片不为空
      if (this.tempFileList.length == 0) {
        this.$message.error('请选择要上传的图片')
        return
      }
      this.$refs['elForm'].validate(valid => {
        if (!valid) return
        let urlData = new FormData();
        for (let i = 0; i < this.tempFileList.length; i++) {
          urlData.append('data', this.tempFileList[i].raw)
        }
        // addStuOrders(this.formData).then(res => {

        // })
        // TODO:这里应该采用异步调用，多线程并发
        console.log("data: " + this.addForm.damageDescription);
        console.log(this.addForm);
        uploadStuImages(urlData).then(response => {
          // this.visible = false; 
          //_____________这个逻辑应该是上传图片之后，返回List集合，再封装成FzuCompleteOrder，重新传入controller，再完成CRUD的sql语句___________________________________
          this.addForm.stuImagesURL = response.data
          addStudentRepairApplication(this.addForm).then(res => {
            this.stuOrderOpen = false;
            this.$modal.msgSuccess("修改成功");
            this.addFormReset()
          });
        });
      })
    },
    addFormReset() {
      this.addForm = {
        buildingNo: null,
        roomNo: null,
        damageDescription: '',
        stuImagesURL: [],
      }
    },
    // 图片上传组件函数
    handleRemove(file) {
      const tempFileName = file.name
      const fileIndex = Array.from(this.tempFileList).findIndex(file => file.name == tempFileName);
      this.tempFileList.splice(fileIndex, 1);
    },
    handlePictureCardPreview(file) {
      // handlePictureCardPreview是点击那个放大镜预览时候触发
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    beforePictureUpload(file) {
      return new Promise((resolve, reject) => {
        if (file.size === 0) {
          this.$message.error('请选择要上传的图片')
          reject(new Error('请选择要上传的图片'))
        } else {
          resolve()
        }
      })
    },
    handleFileChange(file) {
      // handleFileChange是预上传图片时候触发
      this.tempFileList.push(file)
    },
    handleCloseDialog() {
      // 关闭弹窗时清空预览图片的链接
      this.dialogImageUrl = '';
      // 关闭弹窗
      this.dialogVisible = false;
    },
    // 评价表单相关函数
    handleContent(row) {
      this.contentOpen = true
      this.contentId = row.repairId
    },
    contentVisable() {

    },
    contentClose() {
      this.getList()
    },
    contentCancle() {
      this.contentOpen = false
    },
    contentConfirm() {
      this.contentForm.repairId = this.contentId
      console.log(this.contentForm);
      updateEvaluate(this.contentForm).then({
        
      })
      this.contentOpen = false
      this.$modal.msgSuccess("评价成功")
      this.contentForm = {}
    },
  }

}
</script>
