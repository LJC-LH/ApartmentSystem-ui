<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="100px">
      <!-- <el-form-item label="学生id" prop="studentId">
        <el-input
          v-model="queryParams.studentId"
          placeholder="请输入学生id"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item> -->
      <el-form-item label="楼栋号" prop="buildingNo">
        <el-input v-model="queryParams.buildingNo" placeholder="请输入楼栋号" clearable @keyup.enter.native="handleQuery" />
      </el-form-item>
      <el-form-item label="房间号" prop="roomNo">
        <el-input v-model="queryParams.roomNo" placeholder="请输入房间号" clearable @keyup.enter.native="handleQuery" />
      </el-form-item>
      <el-form-item label="报修创建时间" prop="createAt">
        <el-date-picker clearable v-model="queryParams.createAt" type="date" value-format="yyyy-MM-dd"
          placeholder="请选择报修创建时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="学生评分" prop="evaluateRate">
        <el-input v-model="queryParams.evaluateRate" placeholder="请输入学生评分" clearable @keyup.enter.native="handleQuery" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <!-- <el-col :span="1.5">
        <el-button
          type="primary"
          plain
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          v-hasPermi="['apartment:repairResult:add']"
        >新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          plain
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['apartment:repairResult:edit']"
        >修改</el-button>
      </el-col> -->
      <!-- <el-col :span="1.5">
        <el-button
          type="danger"
          plain
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['apartment:repairResult:remove']"
        >删除</el-button>
      </el-col> -->
      <!-- <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['apartment:repairResult:export']"
        >导出</el-button>
      </el-col> -->
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="repairResultList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <!-- <el-table-column label="报修号" align="center" prop="repairId" /> -->
      <el-table-column label="学生" align="center" prop="studentName" />
      <el-table-column label="楼栋号" align="center" prop="buildingNo" />
      <el-table-column label="房间号" align="center" prop="roomNo" />
      <el-table-column label="损坏说明" align="center" prop="damageDescription" />
      <!-- <el-table-column label="报修类型" align="center" prop="fixType" /> -->
      <el-table-column label="报修创建时间" align="center" prop="createAt" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.createAt, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="一次维修人员" align="center" prop="repairmanName" />
      <el-table-column label="第一次维修内容" align="center" prop="firstWorkContent" />
      <el-table-column label="第一次报修完成时间" align="center" prop="firstCompletionTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.firstCompletionTime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="校区管理办公室意见" align="center" prop="campusManagementOpinion" />
      <!-- <el-table-column label="是否二次派单" align="center" prop="isSecondDispatch" /> -->
      <el-table-column label="二次维修人员" align="center" prop="secondaryRepairmanName" />
      <el-table-column label="第二次维修内容" align="center" prop="secondWorkContent" />
      <el-table-column label="学生评价内容" align="center" prop="evaluateContent" />
      <el-table-column label="学生评分" align="center" prop="evaluateRate" />
      <!-- <el-table-column label="第二次报修预计完成时间" align="center" prop="secondExpectedCompletionTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.secondExpectedCompletionTime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column> -->
      <!-- <el-table-column label="第二次报修实际完成时间" align="center" prop="secondActualCompletionTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.secondActualCompletionTime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column> -->
      <el-table-column label="订单状态" align="center" prop="fixStatus">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.fzu_fix_status" :value="scope.row.fixStatus" />
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button size="mini" type="text" icon="el-icon-edit" @click="checkDetail(scope.row)"
            v-hasPermi="['apartment:repairResult:edit']">订单详情</el-button>
          <el-button size="mini" type="text" icon="el-icon-delete" @click="uploadRecord(scope.row)"
            v-bind:disabled="scope.row.fixStatus == 4">上传记录</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total > 0" :total="total" :page.sync="queryParams.pageNum" :limit.sync="queryParams.pageSize"
      @pagination="getList" />
    <!-- 详情页面 -->
    <el-dialog :visible.sync="orderDetailOpen" width="1000px" title="订单详情页" @close="detailClose">
      <div class="parent">
        <div class="row1">
          <div class="row11" style="font-size: 16px;">
          报修订单详情
          </div>
          <!-- 这里需要获得订单的状态，即active和finish是响应式的 -->
          <div class="row12" align-center>
            <el-steps :active="parseInt(stepActive)">
              <!-- TODO 这里的icon没有找到 -->
              <el-step title="学生报修" />
              <el-step title="一次维修" />
              <el-step title="领导审批" />
              <el-step title="二次维修" />
              <el-step title="订单完成" />
            </el-steps>
          </div>
        </div>
        <div class="row2">
          <div class="row21" style="font-size: 16px;">
            宿舍信息
          </div>
          <div class="row22">
            <div class="row2222">
              <div class="row221">
                楼栋号：{{ detailOrder.buildingNo }}
              </div>
              <div class="row222">
                房间号：{{ detailOrder.roomNo }}
              </div>
            </div>
            <div class="row223">
              学生名字：{{ detailOrder.studentName }}
            </div>
          </div>
        </div>
        <div class="row3">
          <div class="row31" style="font-size: 16px;">
            损坏详情
          </div>
          <div class="row32">
            <div class="row321">
              损坏描述：{{ detailOrder.damageDescription }}
            </div>
            <div class="row322">
              <div class="row3221">损坏图片：</div>
              <div class="row3222">
                <el-image style="width: 100px; height: 100px" :src="stuURL" :zoom-rate="1.2"
                  :preview-src-list="stuURLList" :initial-index="4" fit="cover" />
              </div>
            </div>
          </div>
        </div>
        <div class="row4" v-show="showDiv">
          <div class="row41" style="font-size: 16px;">
            维修记录
          </div>
          <div class="row42">
            <div class="row421">
              <div class="row4211">
                <div class="42111">
                  订单状态：{{ detailOrder.fixStatus }}
                </div>
                <div class="42111">
                  维修人员：{{ detailOrder.repairmanName }}
                </div>
                <div class="42111">
                  预计完成时间：{{ detailOrder.secondExpectedCompletionTime }}
                </div>
              </div>
              <div class="row4212">
                <div>
                  维修结论：{{ detailOrder.firstWorkContent }}
                </div>
              </div>
              <div class="row4213">
                维修图片：
              </div>
            </div>
            <div class="row422">
              <!-- <img src="../../../../testImags/Snipaste_2023-04-05_09-21-47.png" 
              style="width: 50px; height: 30px;"
              alt="暂无"> -->
              <!-- TODO：src还是test的 -->
              <el-image style="width: 100px; height: 100px" :src="repairURL" :zoom-rate="1.2"
                :preview-src-list="repairURLList" :initial-index="4" fit="cover" />
            </div>
          </div>
        </div>
      </div>
    </el-dialog>


    <!-- 工作记录页面 -->
    <el-dialog v-bind="$attrs" v-on="$listeners" :visible.sync="stuOrderOpen" @open="onOpen" @close="onClose"
      width="1000px" title="工作记录上传表">
      <el-form ref="elForm" :model="formData" :rules="uploadrules" size="medium" label-width="100px">
        <el-form-item label="楼栋名" prop="buildingNo">
          <el-input v-model="formData.buildingNo" placeholder="请输入楼栋名" clearable :style="{ width: '100%' }" disabled>
          </el-input>
        </el-form-item>
        <el-form-item label="房间名" prop="roomNo">
          <el-input v-model="formData.roomNo" placeholder="请输入房间名" clearable :style="{ width: '100%' }" disabled>
          </el-input>
        </el-form-item>
        <el-form-item label="维修状态说明" prop="repairStatus">
          <el-radio-group v-model="formData.repairStatus" :disabled="wheather">
            <el-radio :label="0">无法维修</el-radio>
            <el-radio :label="1">维修完成</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="维修图片上传">
          <el-upload :file-list="fileList" action="/system/user/profile/uploadPicture" list-type="picture-card"
            :show-file-list="true" :on-preview="handlePictureCardPreview" :on-remove="handleRemove"
            :on-change="handleFileChange" :before-upload="beforePictureUpload" :auto-upload="false"
            accept=".jpg,.jpeg,.png,.bmp" ref="upload" @close="handleCloseDialog">
            <el-icon>
              <Plus />
            </el-icon>
          </el-upload>

          <el-dialog :visible.sync="dialogVisible">
            <img w-full :src="dialogImageUrl" alt="Preview Image" />
          </el-dialog>
        </el-form-item>
        <el-form-item label="维修情况说明" prop="damageDescription">
          <el-input v-model="formData.damageDescription" type="textarea" placeholder="请输入维修情况说明"
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
import { listRepairResult, getRepairResult, delRepairResult, addRepairResult, updateRepairResult, updateUnsolvableRepairResult } from "@/api/apartment/repairResult";
import { uploadFirstImages, uploadSecondImages } from "@/api/apartment/uploading.js"

export default {
  name: "RepairResult",
  dicts: ['fzu_fix_status'],
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
      // 维修结果提交表格数据
      repairResultList: [],
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
      detailOrder: {

      },
      // 订单详情
      orderDetailOpen: false,
      showDiv: false,
      stuURL: '',
      stuURLList: [],
      repairURL: '',
      repairURLList: [],
      // 工作记录
      formData: {

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
        damageDescription: [],
      },
      stuOrderOpen: false,
      dialogImageUrl: '',
      tempFileList: [],
      fileList: [],
      dialogVisible: false,
      urlList: [],
      // 这个是订单号 TODO，需要重置为初始值
      formRepairID: '',
      // 状态条的参数
      stepActive: '',
      // 是否可以维修状态选择
      repairStatus: '',
      wheather: false
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询维修结果提交列表 */
    getList() {
      this.loading = true;
      listRepairResult(this.queryParams).then(response => {
        this.repairResultList = response.rows;
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
        secondWorkContent: null
      };
      this.resetForm("form");
      this.tempFileList = []
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
      this.reset();
      this.open = true;
      this.title = "添加维修结果提交";
    },
    /** 详情按钮操作 */
    checkDetail(row) {
      this.reset();
      const repairId = row.repairId || this.ids
      getRepairResult(repairId).then(response => {
        this.detailOrder = response.data
        this.showDiv = this.detailOrder.fixStatus >= 3 ? true : false;
        // TODO 遍历
        this.stepActive = row.fixStatus
        if (row.fixStatus == '4') {
          this.stepActive = 5
        } else if (row.fixStatus == '0' && row.isSecondDispatch == '1') {
          this.stepActive = 3
        } else if (row.fixStatus == '1' && row.isSecondDispatch == '0') {
          this.stepActive = 2
        } else if (row.fixStatus == '1' && row.isSecondDispatch == '1') {
          this.stepActive = 4
        }
        this.detailOrder = response.data
        for (let i = 0; i < response.data.stuImagesURL.length; i++) {
          this.stuURLList[i] = process.env.VUE_APP_BASE_API + response.data.stuImagesURL[i]
        }
        this.stuURL = this.stuURLList[0]
        if (response.data.repairURLList != null) {
          for (let i = 0; i < response.data.repairURLList.length; i++) {
            this.repairURLList[i] = process.env.VUE_APP_BASE_API + response.data.repairURLList[i]
          }
          this.repairURL = this.stuURLList[0]
        }
        this.form = response.data;
        this.orderDetailOpen = true;
        this.title = "订单详情";
      });
    },
    /** 提交按钮 */
    // submitForm() {
    //   this.$refs["form"].validate(valid => {
    //     if (valid) {
    //       if (this.form.repairId != null) {
    //         updateRepairResult(this.form).then(response => {
    //           this.$modal.msgSuccess("修改成功");
    //           this.open = false;
    //           this.getList();
    //         });
    //       } else {
    //         addRepairResult(this.form).then(response => {
    //           this.$modal.msgSuccess("新增成功");
    //           this.open = false;
    //           this.getList();
    //         });
    //       }
    //     }
    //   });
    // },
    /** 弹窗按钮操作 */
    uploadRecord(row) {
      this.wheather = row.isSecondDispatch == "1" ? true : false;
      const repairIds = row.repairId || this.ids;
      // TODO isSecondeary需要重置为初始值
      this.isSecondeary = row.isSecondDispatch
      this.formRepairID = row.repairId
      this.formData.buildingNo = row.buildingNo
      this.formData.roomNo = row.roomNo
      this.stuOrderOpen = true;
      this.repairForm = row
      // this.$modal.confirm('是否确认删除维修结果提交编号为"' + repairIds + '"的数据项？').then(function () {
      //   return delRepairResult(repairIds);
      // }).then(() => {
      //   this.getList();
      //   this.$modal.msgSuccess("删除成功");
      // }).catch(() => { });

    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('apartment/repairResult/export', {
        ...this.queryParams
      }, `repairResult_${new Date().getTime()}.xlsx`)
    },
    // 工作记录函数
    onOpen() {
    },
    onClose() {
      this.$refs['elForm'].resetFields()
      this.formRepairID = ''
      this.isSecondeary = ''
      this.formData = {
      }
      this.tempFileList = []
      this.$refs.upload.clearFiles();
      this.getList()
    },
    close() {
      this.$emit('update:visible', false)
      this.stuOrderOpen = false
      this.$refs.upload.clearFiles();
      this.getList()
    },
    // 提交按钮
    handleConfirm() {
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
        this.formData.repairId = this.formRepairID
        this.formData.isSecondDispatch = this.isSecondeary
        console.log(this.formData.repairStatus);
        // 判断是否是第一次派单, isSecondeary
        if (this.formData.repairStatus == 0) {
          uploadFirstImages(urlData).then(response => {
            console.log("res is :", response);
            this.formData.onceImagesURL = response.data
            updateUnsolvableRepairResult(this.formData).then(res => {
              this.stuOrderOpen = false;
              this.$modal.msgSuccess("修改成功");
              this.reset()
              return;
            })
          });

        }
        else if (this.isSecondeary == 0 && this.formData.repairStatus == 1) {
          // 发送到第一次维修的接口
          uploadFirstImages(urlData).then(response => {
            console.log("res is :", response);
            this.formData.onceImagesURL = response.data
            updateRepairResult(this.formData).then(res => {
              this.stuOrderOpen = false;
              this.$modal.msgSuccess("修改成功");
              this.reset()
            })
          });
        } else if (this.isSecondeary == 1 && this.formData.repairStatus == 1) {
          // 发送到第二次维修的接口
          uploadSecondImages(urlData).then(response => {
            console.log("这是第二次res is :", response);
            this.formData.secondImagesURL = response.data
            updateRepairResult(this.formData).then(res => {
              this.stuOrderOpen = false;
              this.$modal.msgSuccess("修改成功");
              this.reset()
            })
          });
        }
      })
    },
    // 图片上传组件函数
    handleRemove(file) {
      const tempFileName = file.name
      const fileIndex = Array.from(this.tempFileList).findIndex(file => file.name == tempFileName);

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
    },
    handleCloseDialog() {
      this.$emit('update:visible', false)
      this.stuOrderOpen = false;
      // this.formDataReset();
      this.tempFileList = []

      this.$refs.upload.clearFiles();

    },
    // formDataReset() {
    //   this.formData = {
    //     buildingNo: null,
    //     roomNo: null,
    //     damagedDescription: null,
    //     stuImagesURL: [],
    //   }
    // },
    detailClose() {
      this.stuURL = ''
      this.stuURLList = []
      this.repairURL = ''
      this.repairURLList = []
      this.stepActive = '',
        this.wheather = true
    }

  }
};
</script>
<style>
.parent {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 0px;
}

.el-dialog_header {
  height: 30px;
}

.row1 {
  width: 960px;
  height: 90px;
  margin-bottom: 10px;
}

.row11 {
  height: 30px;
}

.row12 {
  margin-top: 10px;
  margin-left: 180px;
  width: 600px;
}

.row2 {
  width: 960px;
  height: 130px;
  margin-top: 0px;
  margin-bottom: 0px;
}

.row21 {
  margin-top: 10px;
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.row22 {
  margin-top: 10px;
  margin-bottom: 10px;
  margin-left: 100px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.row222 {
  margin-top: 0px;
  margin-left: 220px;
}

.row2222 {
  display: flex;
  flex-direction: row;
  /* justify-content: space-between; */
}

.row223 {
  margin-top: 25px;
}

.row3 {
  width: 960px;
  height: 170px;
  margin-top: 10px;
  margin-bottom: 10px;
}

.row31 {
  margin-top: 10px;
  margin-bottom: 10px;
}

.row32 {
  margin-top: 10px;
  margin-bottom: 10px;
  margin-left: 100px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.row322 {
  display: flex;
  flex-direction: raw;
  justify-content: space-between;
  margin-top: 30px;
  margin-right: 650px;
}

.row4 {
  width: 960px;
  height: 170px;
  margin-top: 10px;
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.row41 {
  margin-top: 10px;
  margin-bottom: 10px;
}

.row42 {
  margin-top: 10px;
  margin-bottom: 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-left: 100px;
}

.row4211 {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 300px;
}

.row4212 {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 300px;
}

.row421 {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.row4213 {
  width: 90px;
}

.row422 {
  margin-right: 60px;
}

.row422 .image-slot {
  font-size: 30px;
}

.row422 .image-slot .el-icon {
  font-size: 30px;
}

.row422 .el-image {
  width: 100%;
  height: 200px;
}
</style>
