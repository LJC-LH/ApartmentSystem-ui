<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="用户ID" prop="studentId">
        <el-input
          v-model="queryParams.studentId"
          placeholder="请输入用户ID"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="学生姓名" prop="studentName">
        <el-input
          v-model="queryParams.studentName"
          placeholder="请输入学生姓名"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="申请类型" prop="approvalCategory">
        <el-select v-model="queryParams.approvalCategory" placeholder="请选择申请类型" clearable>
          <el-option
            v-for="dict in dict.type.fzu_approval_category"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
<!--      <el-form-item label="申请原因" prop="approvalReason">-->
<!--        <el-input-->
<!--          v-model="queryParams.approvalReason"-->
<!--          placeholder="请输入申请原因"-->
<!--          clearable-->
<!--          @keyup.enter.native="handleQuery"-->
<!--        />-->
<!--      </el-form-item>-->
<!--      <el-form-item label="开始住宿时间" prop="startTime">-->
<!--        <el-date-picker clearable-->
<!--          v-model="queryParams.startTime"-->
<!--          type="date"-->
<!--          value-format="yyyy-MM-dd"-->
<!--          placeholder="请选择开始住宿时间">-->
<!--        </el-date-picker>-->
<!--      </el-form-item>-->
<!--      <el-form-item label="结束住宿时间" prop="endTime">-->
<!--        <el-date-picker clearable-->
<!--          v-model="queryParams.endTime"-->
<!--          type="date"-->
<!--          value-format="yyyy-MM-dd"-->
<!--          placeholder="请选择结束住宿时间">-->
<!--        </el-date-picker>-->
<!--      </el-form-item>-->
<!--      <el-form-item label="辅导员ID" prop="fdyId">-->
<!--        <el-input-->
<!--          v-model="queryParams.fdyId"-->
<!--          placeholder="请输入辅导员ID"-->
<!--          clearable-->
<!--          @keyup.enter.native="handleQuery"-->
<!--        />-->
<!--      </el-form-item>-->
<!--      <el-form-item label="辅导员意见" prop="fdyOpinion">-->
<!--        <el-select v-model="queryParams.fdyOpinion" placeholder="请选择辅导员意见" clearable>-->
<!--          <el-option-->
<!--            v-for="dict in dict.type.opinion"-->
<!--            :key="dict.value"-->
<!--            :label="dict.label"-->
<!--            :value="dict.value"-->
<!--          />-->
<!--        </el-select>-->
<!--      </el-form-item>-->
<!--      <el-form-item label="学工处审批人ID" prop="xgcId">-->
<!--        <el-input-->
<!--          v-model="queryParams.xgcId"-->
<!--          placeholder="请输入学工处审批人ID"-->
<!--          clearable-->
<!--          @keyup.enter.native="handleQuery"-->
<!--        />-->
<!--      </el-form-item>-->
<!--      <el-form-item label="学工处意见" prop="xgcOpinion">-->
<!--        <el-select v-model="queryParams.xgcOpinion" placeholder="请选择学工处意见" clearable>-->
<!--          <el-option-->
<!--            v-for="dict in dict.type.opinion"-->
<!--            :key="dict.value"-->
<!--            :label="dict.label"-->
<!--            :value="dict.value"-->
<!--          />-->
<!--        </el-select>-->
<!--      </el-form-item>-->
<!--      <el-form-item label="校区管理办公室ID" prop="manageId">-->
<!--        <el-input-->
<!--          v-model="queryParams.manageId"-->
<!--          placeholder="请输入校区管理办公室ID"-->
<!--          clearable-->
<!--          @keyup.enter.native="handleQuery"-->
<!--        />-->
<!--      </el-form-item>-->
<!--      <el-form-item label="校区管理办公室意见" prop="manageOpinion">-->
<!--        <el-input-->
<!--          v-model="queryParams.manageOpinion"-->
<!--          placeholder="请输入校区管理办公室意见"-->
<!--          clearable-->
<!--          @keyup.enter.native="handleQuery"-->
<!--        />-->
<!--      </el-form-item>-->
      <el-form-item label="宿舍ID" prop="dormId">
        <el-input
          v-model="queryParams.dormId"
          placeholder="请输入宿舍ID"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="primary"
          plain
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          v-hasPermi="['apartment:approval:add']"
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
          v-hasPermi="['apartment:approval:edit']"
        >修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          plain
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['apartment:approval:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['apartment:approval:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="approvalList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="审批ID" align="center" prop="approvalId" />
      <el-table-column label="用户ID" align="center" prop="studentId" />
      <el-table-column label="学生姓名" align="center" prop="studentName" />
      <el-table-column label="申请类型" align="center" prop="approvalCategory">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.fzu_approval_category" :value="scope.row.approvalCategory"/>
        </template>
      </el-table-column>
      <el-table-column label="申请原因" align="center" prop="approvalReason" />
      <el-table-column label="开始住宿时间" align="center" prop="startTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.startTime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="结束住宿时间" align="center" prop="endTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.endTime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="辅导员ID" align="center" prop="fdyId" />
      <el-table-column label="辅导员意见" align="center" prop="fdyOpinion">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.opinion" :value="scope.row.fdyOpinion"/>
        </template>
      </el-table-column>
      <el-table-column label="学工处审批人ID" align="center" prop="xgcId" />
      <el-table-column label="学工处意见" align="center" prop="xgcOpinion">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.opinion" :value="scope.row.xgcOpinion"/>
        </template>
      </el-table-column>
      <el-table-column label="校区管理办公室ID" align="center" prop="manageId" />
      <el-table-column label="校区管理办公室意见" align="center" prop="manageOpinion">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.opinion" :value="scope.row.manageOpinion"/>
        </template>
      </el-table-column>
      <el-table-column label="审批状态" align="center" prop="approvalStatus" />
      <el-table-column label="宿舍ID" align="center" prop="dormId" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['apartment:approval:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['apartment:approval:remove']"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />

    <!-- 添加或修改特殊宿舍申请对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="用户ID" prop="studentId">
          <el-input v-model="form.studentId" placeholder="请输入用户ID" />
        </el-form-item>
        <el-form-item label="学生姓名" prop="studentName">
          <el-input v-model="form.studentName" placeholder="请输入学生姓名" />
        </el-form-item>
        <el-form-item label="申请类型" prop="approvalCategory">
          <el-select v-model="form.approvalCategory" placeholder="请选择申请类型">
            <el-option
              v-for="dict in dict.type.fzu_approval_category"
              :key="dict.value"
              :label="dict.label"
              :value="dict.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="申请原因" prop="approvalReason">
          <el-input v-model="form.approvalReason" placeholder="请输入申请原因" />
        </el-form-item>
        <el-form-item label="开始住宿时间" prop="startTime">
          <el-date-picker clearable
            v-model="form.startTime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="请选择开始住宿时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="结束住宿时间" prop="endTime">
          <el-date-picker clearable
            v-model="form.endTime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="请选择结束住宿时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="辅导员ID" prop="fdyId">
          <el-input v-model="form.fdyId" placeholder="请输入辅导员ID" />
        </el-form-item>
        <el-form-item label="辅导员意见" prop="fdyOpinion">
          <el-select v-model="form.fdyOpinion" placeholder="请选择辅导员意见">
            <el-option
              v-for="dict in dict.type.opinion"
              :key="dict.value"
              :label="dict.label"
              :value="dict.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="学工处审批人ID" prop="xgcId">
          <el-input v-model="form.xgcId" placeholder="请输入学工处审批人ID" />
        </el-form-item>
        <el-form-item label="学工处意见" prop="xgcOpinion">
          <el-select v-model="form.xgcOpinion" placeholder="请选择学工处意见">
            <el-option
              v-for="dict in dict.type.opinion"
              :key="dict.value"
              :label="dict.label"
              :value="dict.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="校区管理办公室ID" prop="manageId">
          <el-input v-model="form.manageId" placeholder="请输入校区管理办公室ID" />
        </el-form-item>
        <el-form-item label="校区管理办公室意见" prop="manageOpinion">
          <el-input v-model="form.manageOpinion" placeholder="请输入校区管理办公室意见" />
        </el-form-item>
        <el-form-item label="宿舍ID" prop="dormId">
          <el-input v-model="form.dormId" placeholder="请输入宿舍ID" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { listApproval, getApproval, delApproval, addApproval, updateApproval } from "@/api/apartment/approval";

export default {
  name: "Approval",
  dicts: ['fzu_approval_category', 'opinion'],
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
      // 特殊宿舍申请表格数据
      approvalList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        studentId: null,
        studentName: null,
        approvalCategory: null,
        approvalReason: null,
        startTime: null,
        endTime: null,
        fdyId: null,
        fdyOpinion: null,
        xgcId: null,
        xgcOpinion: null,
        manageId: null,
        manageOpinion: null,
        approvalStatus: null,
        dormId: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询特殊宿舍申请列表 */
    getList() {
      this.loading = true;
      listApproval(this.queryParams).then(response => {
        this.approvalList = response.rows;
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
        approvalId: null,
        studentId: null,
        studentName: null,
        approvalCategory: null,
        approvalReason: null,
        startTime: null,
        endTime: null,
        fdyId: null,
        fdyOpinion: null,
        xgcId: null,
        xgcOpinion: null,
        manageId: null,
        manageOpinion: null,
        approvalStatus: null,
        dormId: null
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
      this.ids = selection.map(item => item.approvalId)
      this.single = selection.length!==1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加特殊宿舍申请";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const approvalId = row.approvalId || this.ids
      getApproval(approvalId).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改特殊宿舍申请";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.approvalId != null) {
            updateApproval(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addApproval(this.form).then(response => {
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
      const approvalIds = row.approvalId || this.ids;
      this.$modal.confirm('是否确认删除特殊宿舍申请编号为"' + approvalIds + '"的数据项？').then(function() {
        return delApproval(approvalIds);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('apartment/approval/export', {
        ...this.queryParams
      }, `approval_${new Date().getTime()}.xlsx`)
    }
  }
};
</script>
