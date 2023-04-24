<template>
  <div class="app-container">
    <!-- <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="" prop="学生">
        <el-input v-model="queryParams.studentId" placeholder="" clearable @keyup.enter.native="handleQuery" />
      </el-form-item>
      <el-form-item label="楼栋号" prop="buildingNo">
        <el-input v-model="queryParams.buildingNo" placeholder="请输入楼栋号" clearable @keyup.enter.native="handleQuery" />
      </el-form-item>
      <el-form-item label="房间号" prop="roomNo">
        <el-input v-model="queryParams.roomNo" placeholder="请输入房间号" clearable @keyup.enter.native="handleQuery" />
      </el-form-item>
      <el-form-item label="损坏说明" prop="damageDescription">
        <el-input v-model="queryParams.damageDescription" placeholder="请输入损坏说明" clearable
          @keyup.enter.native="handleQuery" />
      </el-form-item>
      <el-form-item label="创建时间" prop="createAt">
        <el-date-picker clearable v-model="queryParams.createAt" type="date" value-format="yyyy-MM-dd"
          placeholder="请选择创建时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="物业管理部门意见" prop="propertyManagementOpinion">
        <el-input v-model="queryParams.propertyManagementOpinion" placeholder="请输入物业管理部门意见" clearable
          @keyup.enter.native="handleQuery" />
      </el-form-item>
      <el-form-item label="预计完成时间" prop="expectedCompletionTime">
        <el-date-picker clearable v-model="queryParams.expectedCompletionTime" type="date" value-format="yyyy-MM-dd"
          placeholder="请选择预计完成时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="实际完成时间" prop="actualCompletionTime">
        <el-date-picker clearable v-model="queryParams.actualCompletionTime" type="date" value-format="yyyy-MM-dd"
          placeholder="请选择实际完成时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="维修人员id" prop="repairmanId">
        <el-input v-model="queryParams.repairmanId" placeholder="请输入维修人员id" clearable @keyup.enter.native="handleQuery" />
      </el-form-item>
      <el-form-item label="校区管理办公室意见" prop="campusManagementOpinion">
        <el-input v-model="queryParams.campusManagementOpinion" placeholder="请输入校区管理办公室意见" clearable
          @keyup.enter.native="handleQuery" />
      </el-form-item>
      <el-form-item label="是否二次派单" prop="isSecondaryDispatch">
        <el-input v-model="queryParams.isSecondaryDispatch" placeholder="请输入是否二次派单" clearable
          @keyup.enter.native="handleQuery" />
      </el-form-item>
      <el-form-item label="二次维修人员id" prop="secondaryRepairmanId">
        <el-input v-model="queryParams.secondaryRepairmanId" placeholder="请输入二次维修人员id" clearable
          @keyup.enter.native="handleQuery" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form> -->

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button type="primary" plain icon="el-icon-plus" size="mini" @click="handleAdd"
          v-hasPermi="['apartment:stuOrders:add']">新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button type="success" plain icon="el-icon-edit" size="mini" :disabled="single" @click="handleUpdate"
          v-hasPermi="['apartment:stuOrders:edit']">修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button type="danger" plain icon="el-icon-delete" size="mini" :disabled="multiple" @click="handleDelete"
          v-hasPermi="['apartment:stuOrders:remove']">删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button type="warning" plain icon="el-icon-download" size="mini" @click="handleExport"
          v-hasPermi="['apartment:stuOrders:export']">导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="stuOrdersList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="学生名" align="center" prop="studentId" />
      <el-table-column label="楼栋号" align="center" prop="buildingNo" />
      <el-table-column label="房间号" align="center" prop="roomNo" />
      <el-table-column label="损坏说明" align="center" prop="damageDescription" />
      <el-table-column label="创建时间" align="center" prop="createAt" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.createAt, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="订单状态" align="center" prop="status" />
      <el-table-column label="物业管理部门意见" align="center" prop="propertyManagementOpinion" />
      <el-table-column label="预计完成时间" align="center" prop="expectedCompletionTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.expectedCompletionTime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="实际完成时间" align="center" prop="actualCompletionTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.actualCompletionTime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="维修人员id" align="center" prop="repairmanId" />
      <el-table-column label="校区管理办公室意见" align="center" prop="campusManagementOpinion" />
      <el-table-column label="是否二次派单" align="center" prop="isSecondaryDispatch" />
      <el-table-column label="二次维修人员id" align="center" prop="secondaryRepairmanId" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button size="mini" type="text" icon="el-icon-edit" @click="handleUpdate(scope.row)"
            v-hasPermi="['apartment:stuOrders:edit']">修改</el-button>
          <el-button size="mini" type="text" icon="el-icon-delete" @click="handleDelete(scope.row)"
            v-hasPermi="['apartment:stuOrders:remove']">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total > 0" :total="total" :page.sync="queryParams.pageNum" :limit.sync="queryParams.pageSize"
      @pagination="getList" />

    <!-- 添加或修改学生订单对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="学生名字" prop="studentId">
          <el-input v-model="form.studentId" placeholder="请输入学生名字" />
        </el-form-item>
        <el-form-item label="楼栋号" prop="buildingNo">
          <el-input v-model="form.buildingNo" placeholder="请输入楼栋号" />
        </el-form-item>
        <el-form-item label="房间号" prop="roomNo">
          <el-input v-model="form.roomNo" placeholder="请输入房间号" />
        </el-form-item>
        <el-form-item label="损坏说明" prop="damageDescription">
          <el-input v-model="form.damageDescription" placeholder="请输入损坏说明" />
        </el-form-item>
        <el-form-item label="创建时间" prop="createAt">
          <el-date-picker clearable v-model="form.createAt" type="date" value-format="yyyy-MM-dd" placeholder="请选择创建时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="物业管理部门意见" prop="propertyManagementOpinion">
          <el-input v-model="form.propertyManagementOpinion" placeholder="请输入物业管理部门意见" />
        </el-form-item>
        <el-form-item label="预计完成时间" prop="expectedCompletionTime">
          <el-date-picker clearable v-model="form.expectedCompletionTime" type="date" value-format="yyyy-MM-dd"
            placeholder="请选择预计完成时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="实际完成时间" prop="actualCompletionTime">
          <el-date-picker clearable v-model="form.actualCompletionTime" type="date" value-format="yyyy-MM-dd"
            placeholder="请选择实际完成时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="维修人员" prop="repairmanId">
          <el-input v-model="form.repairmanId" placeholder="请输入维修人员" />
        </el-form-item>
        <el-form-item label="校区管理办公室意见" prop="campusManagementOpinion">
          <el-input v-model="form.campusManagementOpinion" placeholder="请输入校区管理办公室意见" />
        </el-form-item>
        <el-form-item label="是否二次派单" prop="isSecondaryDispatch">
          <el-input v-model="form.isSecondaryDispatch" placeholder="请输入是否二次派单" />
        </el-form-item>
        <el-form-item label="二次维修人员" prop="secondaryRepairmanId">
          <el-input v-model="form.secondaryRepairmanId" placeholder="请输入二次维修人员" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>

    <!-- 上传订单 -->
    <el-dialog v-bind="$attrs" v-on="$listeners" :visible.sync="stuOrderOpen" @open="onOpen" @close="onClose"
      width="1000px" title="新建保修订单">
      <el-form ref="elForm" :model="formData" :rules="uploadrules" size="medium" label-width="100px">
        <el-form-item label="楼栋名" prop="buildingNo">
          <el-input v-model="formData.buildingNo" placeholder="请输入楼栋名" clearable :style="{ width: '100%' }">
          </el-input>
        </el-form-item>
        <el-form-item label="房间名" prop="roonNo">
          <el-input v-model="formData.roonNo" placeholder="请输入房间名" clearable :style="{ width: '100%' }">
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-upload v-model:file-list="fileList" action="/system/user/profile/uploadPicture" list-type="picture-card"
            :show-file-list="true" :on-preview="handlePictureCardPreview" :on-remove="handleRemove"
            :on-change="handleFileChange" :before-upload="beforePictureUpload" :auto-upload="false"
            accept=".jpg,.jpeg,.png,.bmp">
            <el-icon>
              <Plus />
            </el-icon>
          </el-upload>

          <el-dialog :visible.sync="dialogVisible">
            <img w-full :src="dialogImageUrl" alt="Preview Image" />
          </el-dialog>
        </el-form-item>
        <el-form-item label="损坏说明" prop="damagedDescription">
          <el-input v-model="formData.damagedDescription" type="textarea" placeholder="请输入损坏说明"
            :autosize="{ minRows: 4, maxRows: 4 }" :style="{ width: '100%' }"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="close">取消</el-button>
        <el-button type="primary" @click="handleConfirm">确定</el-button>
      </div>
    </el-dialog>

  

  </div>
</template>

<script>
import { listStuOrders, getStuOrders, delStuOrders, addStuOrders, updateStuOrders } from "@/api/apartment/stuOrders";
import { uploadImages } from '@/api/apartment/uploading'



export default {
  name: "StuOrders",
  inheritAttrs: false,
  components: {

  },
  props: [],
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
      // 学生订单表格数据
      stuOrdersList: [],
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
        createAt: null,
        status: null,
        propertyManagementOpinion: null,
        expectedCompletionTime: null,
        actualCompletionTime: null,
        repairmanId: null,
        campusManagementOpinion: null,
        isSecondaryDispatch: null,
        secondaryRepairmanId: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
      },

      // 学生上传订单
      formData: {
        buildingNo: undefined,
        roonNo: undefined,
        damagedDescription: undefined,
      },
      uploadrules: {
        buildingNo: [{
          required: true,
          message: '请输入楼栋名',
          trigger: 'blur'
        }],
        roonNo: [{
          required: true,
          message: '请输入房间名',
          trigger: 'blur'
        }],
        damagedDescription: [],
      },
      stuOrderOpen: false,
      // 学生订单上传图片组件
      dialogImageUrl: '',
      dialogVisible: false,
      tempFileList: [],
      fileList: [],
      dialogImageUrl: '',
      dialogVisible: false,
      uploadUrl: '/system/user/profile/uploadPicture',

    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询学生订单列表 */
    getList() {
      this.loading = true;
      listStuOrders(this.queryParams).then(response => {
        this.stuOrdersList = response.rows;
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
        id: null,
        studentId: null,
        buildingNo: null,
        roomNo: null,
        damageDescription: null,
        createAt: null,
        status: null,
        propertyManagementOpinion: null,
        expectedCompletionTime: null,
        actualCompletionTime: null,
        repairmanId: null,
        campusManagementOpinion: null,
        isSecondaryDispatch: null,
        secondaryRepairmanId: null
      };
      this.resetForm("form");
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
      this.ids = selection.map(item => item.id)
      this.single = selection.length !== 1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.stuOrderOpen = true;
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getStuOrders(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改学生订单";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateStuOrders(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addStuOrders(this.form).then(response => {
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
      const ids = row.id || this.ids;
      this.$modal.confirm('是否确认删除学生订单编号为"' + ids + '"的数据项？').then(function () {
        return delStuOrders(ids);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => { });
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('apartment/stuOrders/export', {
        ...this.queryParams
      }, `stuOrders_${new Date().getTime()}.xlsx`)
    },
    //  学生上传订单的函数
    onOpen() { },
    onClose() {
      this.$refs['elForm'].resetFields()
    },
    close() {
      this.$emit('update:visible', false)
    },
    handleConfirm() {
      this.$refs['elForm'].validate(valid => {
        if (!valid) return
        this.close()
        console.log(this.tempFileList);
        let formData = new FormData();
        for (let i = 0; i < this.tempFileList.length; i++) {
          formData.append('data', this.tempFileList[i].raw)
        }
        uploadImages(formData).then(response => {
          this.stuOrderOpen = false;
          // store.commit('SET_AVATAR', this.options.img);
          this.$modal.msgSuccess("修改成功");
          // this.visible = false; 
        });
        // ————————————————————————————————————look here————————————————————————————————————————————————————————————————
        // TODO: 缺少CRUD的表单操作
        // ————————————————————————————————————————————————————————————————————————————————————————————————————

      })
    },
    // 图片上传组件函数
    handleRemove(file) {
      console.log(file);
      const tempFileName = file.name
      const fileIndex = Array.from(this.tempFileList).findIndex(file => file.name == tempFileName);
      console.log(fileIndex);
      this.tempFileList.splice(fileIndex, 1);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    beforePictureUpload(file) {

    },
    handleFileChange(file) {
      this.tempFileList.push(file)
    }
  }
};
</script>

