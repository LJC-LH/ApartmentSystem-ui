<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="学生名字" prop="studentId">
        <el-input v-model="queryParams.studentId" placeholder="请输入学生名字" clearable @keyup.enter.native="handleQuery" />
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
        <el-date-picker clearable v-model="queryParams.createAt" type="date" value-format="yyyy-MM-dd" placeholder="请选择创建时间">
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
      <el-form-item label="维修人员" prop="repairmanId">
        <el-input v-model="queryParams.repairmanId" placeholder="请输入维修人员" clearable @keyup.enter.native="handleQuery" />
      </el-form-item>
      <el-form-item label="校区管理办公室意见" prop="campusManagementOpinion">
        <el-input v-model="queryParams.campusManagementOpinion" placeholder="请输入校区管理办公室意见" clearable
          @keyup.enter.native="handleQuery" />
      </el-form-item>
      <el-form-item label="是否二次派单" prop="isSecondaryDispatch">
        <el-input v-model="queryParams.isSecondaryDispatch" placeholder="请输入是否二次派单" clearable
          @keyup.enter.native="handleQuery" />
      </el-form-item>
      <el-form-item label="二次维修人员" prop="secondaryRepairmanId">
        <el-input v-model="queryParams.secondaryRepairmanId" placeholder="请输入二次维修人员" clearable
          @keyup.enter.native="handleQuery" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button type="primary" plain icon="el-icon-plus" size="mini" @click="handleAdd"
          v-hasPermi="['apartment:leaderOrders:add']">新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button type="success" plain icon="el-icon-edit" size="mini" :disabled="single" @click="handleUpdate"
          v-hasPermi="['apartment:leaderOrders:edit']">修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button type="danger" plain icon="el-icon-delete" size="mini" :disabled="multiple" @click="handleDelete"
          v-hasPermi="['apartment:leaderOrders:remove']">删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button type="warning" plain icon="el-icon-download" size="mini" @click="handleExport"
          v-hasPermi="['apartment:leaderOrders:export']">导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="leaderOrdersList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="主键" align="center" prop="id" />
      <el-table-column label="学生名字" align="center" prop="studentId" />
      <el-table-column label="楼栋号" align="center" prop="buildingNo" />
      <el-table-column label="房间号" align="center" prop="roomNo" />
      <el-table-column label="损坏说明" align="center" prop="damageDescription" />
      <el-table-column label="创建时间
  " align="center" prop="createAt" width="180">
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
      <el-table-column label="维修人员" align="center" prop="repairmanId" />
      <el-table-column label="校区管理办公室意见" align="center" prop="campusManagementOpinion" />
      <el-table-column label="是否二次派单" align="center" prop="isSecondaryDispatch" />
      <el-table-column label="二次维修人员" align="center" prop="secondaryRepairmanId" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button size="mini" type="text" icon="el-icon-edit" @click="handleUpdate(scope.row)"
            v-hasPermi="['apartment:leaderOrders:edit']">修改</el-button>
          <el-button size="mini" type="text" icon="el-icon-delete" @click="handleDelete(scope.row)"
            v-hasPermi="['apartment:leaderOrders:remove']">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total > 0" :total="total" :page.sync="queryParams.pageNum" :limit.sync="queryParams.pageSize"
      @pagination="getList" />

    <!-- 添加或修改领导订单表对话框 -->
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
        <el-form-item label="创建时间
  " prop="createAt">
          <el-date-picker clearable v-model="form.createAt" type="date" value-format="yyyy-MM-dd" placeholder="请选择创建时间
  ">
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


    <!--______________________________详情页_________________________________  -->
      <!-- v-bind="$attrs" v-on="$listeners" -->
      <el-dialog :visible.sync="orderDetailOpen" width="1000px" title="订单详情页">
        <div class="parent">
          <div class="row1">
            <div class="row11">
              保修订单详情
            </div>
            <!-- 这里需要获得订单的状态，即active和finish是响应式的 -->
            <div class="row12" align-center>
              <el-steps :active="2">
                <el-step title="Step 1" :icon="Edit" />
                <el-step title="Step 2" :icon="Upload" />
                <el-step title="Step 3" :icon="Picture" />
              </el-steps>
            </div>
          </div>
          <div class="row2">
            <div class="row21">
              宿舍信息
            </div>
            <div class="row22">

            </div>
          </div>
          <div class="row3">
            <div class="row31">
              损坏详情
            </div>
            <div class="row32">
              <div class="row321">
                损坏描述：
              </div>
              <div class="row322">
                <div class="row3221">损坏图片：</div>
                <div class="row3222">
                  <el-image style="width: 100px; height: 100px" 
                  :src="testImgUrl" 
                  :zoom-rate="1.2" 
                  :preview-src-list="srcList"
                  :initial-index="4" fit="cover" />
                </div>
              </div>
            </div>
          </div>
          <div class="row4">
            <div class="row41">
              维修记录
            </div>
            <div class="row42">
              <div class="row421">
                <div class="row4211">
                  <div class="42111">
                    订单状态：
                  </div>
                  <div class="42111">
                    维修人员：{{ }}
                  </div>
                  <div class="42111">
                    预计完成时间：
                  </div>
                </div>
                <div class="row4212">
                  <div>
                    维修结论：
                  </div>
                </div>
                <div class="row4213" >
                  维修图片：
                </div>
              </div>
              <div class="row422">
                <!-- <img src="../../../../testImags/Snipaste_2023-04-05_09-21-47.png" 
              style="width: 50px; height: 30px;"
              alt="暂无"> -->
                <el-image style="width: 100px; height: 100px" 
                :src="testImgUrl" 
                :zoom-rate="1.2" :preview-src-list="srcList"
                :initial-index="4" fit="cover" />
              </div>
            </div>
          </div>
        </div>
      </el-dialog>


  </div>
</template>

<script>
import { listLeaderOrders, getLeaderOrders, delLeaderOrders, addLeaderOrders, updateLeaderOrders } from "@/api/apartment/leaderOrders";

export default {
  name: "LeaderOrders",
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
      // 领导订单表表格数据
      leaderOrdersList: [],
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
      // 详情页demo
      orderDetailOpen: false,
      imgsList: "https://iknow-pic.cdn.bcebos.com/38dbb6fd5266d0168e3dec21982bd40735fa3596",
      testImgUrl: 'https://p.qqan.com/up/2023-4/16813647503409543.jpg',
      srcList: [
        'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
        'https://p.qqan.com/up/2023-4/16813647503409543.jpg',
        require('D:\\testUploadImages\\2023\\04\\06\\Snipaste_2023-04-05_09-21-47_20230406202303A003.png')
      ],
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询领导订单表列表 */
    getList() {
      this.loading = true;
      listLeaderOrders(this.queryParams).then(response => {
        this.leaderOrdersList = response.rows;
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
      this.open = true;
      this.title = "添加领导订单表";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getLeaderOrders(id).then(response => {
        console.log(id);
        console.log(response);
        // this.form = response.data;
        // this.open = true;
        // this.title = "修改领导订单表";
        this.orderDetailOpen = true
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateLeaderOrders(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addLeaderOrders(this.form).then(response => {
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
      this.$modal.confirm('是否确认删除领导订单表编号为"' + ids + '"的数据项？').then(function () {
        return delLeaderOrders(ids);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => { });
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('apartment/leaderOrders/export', {
        ...this.queryParams
      }, `leaderOrders_${new Date().getTime()}.xlsx`)
    }
  }
};
</script>
<style>
/* 这里是详情页面的版式 */
.parent {
  display: flex;

  flex-direction: column;
  justify-content: space-between;
}
.el-dialog_header {
  height: 30px;
}

.row1 {
  width: 960px;
  height: 130px;
  margin-bottom: 10px;
}

.row11 {
  height: 30px;
}

.row12 {
  margin-top: 50px;
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
}

.row22 {
  margin-top: 10px;
  margin-bottom: 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
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
}</style>
