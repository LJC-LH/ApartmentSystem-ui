<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="150px">
      <!-- <el-form-item label="交换学生id" prop="oneStudentId">
        <el-input
          v-model="queryParams.oneStudentId"
          placeholder="请输入交换学生id"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item> -->
      <el-form-item label="交换学生学号" prop="oneUserName">
        <el-input
          v-model="queryParams.oneUserName"
          placeholder="请输入交换学生学号"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="交换学生姓名" prop="oneNickName">
        <el-input
          v-model="queryParams.oneNickName"
          placeholder="请输入交换学生姓名"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <!-- <el-form-item label="原宿舍号" prop="oneDormId">
        <el-input
          v-model="queryParams.oneDormId"
          placeholder="请输入原宿舍号"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item> -->
      <!-- <el-form-item label="原宿舍楼栋" prop="oneBuildingNo">
        <el-input
          v-model="queryParams.oneBuildingNo"
          placeholder="请输入原宿舍楼栋"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="原房间号" prop="oneRoomNo">
        <el-input
          v-model="queryParams.oneRoomNo"
          placeholder="请输入原房间号"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="原床位号" prop="oneBedNo">
        <el-select v-model="queryParams.oneBedNo" placeholder="请选择原床位号" clearable>
          <el-option
            v-for="dict in dict.type.fzu_bed_no"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item> -->
      <!-- <el-form-item label="被交换学生id" prop="twoStudentId">
        <el-input
          v-model="queryParams.twoStudentId"
          placeholder="请输入被交换学生id"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item> -->
      <el-form-item label="被交换学生学号" prop="twoUserName">
        <el-input
          v-model="queryParams.twoUserName"
          placeholder="请输入被交换学生学号"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="被交换学生姓名" prop="twoNickName">
        <el-input
          v-model="queryParams.twoNickName"
          placeholder="请输入被交换学生姓名"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <!-- <el-form-item label="新宿舍号" prop="twoDormId">
        <el-input
          v-model="queryParams.twoDormId"
          placeholder="请输入新宿舍号"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="新宿舍楼栋" prop="twoBuildingNo">
        <el-input
          v-model="queryParams.twoBuildingNo"
          placeholder="请输入新宿舍楼栋"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="新房间号" prop="twoRoomNo">
        <el-input
          v-model="queryParams.twoRoomNo"
          placeholder="请输入新房间号"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="新床位号" prop="twoBedNo">
        <el-select v-model="queryParams.twoBedNo" placeholder="请选择新床位号" clearable>
          <el-option
            v-for="dict in dict.type.fzu_bed_no"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item> -->
      <el-form-item style="padding-left:50px">
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
          v-hasPermi="['apartment:changeDorm:add']"
        >院内宿舍调整</el-button>
      </el-col>
      <!-- <el-col :span="1.5">
        <el-button
          type="success"
          plain
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['apartment:changeDorm:edit']"
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
          v-hasPermi="['apartment:changeDorm:remove']"
        >删除</el-button>
      </el-col> -->
      <!-- <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['apartment:changeDorm:export']"
        >导出</el-button>
      </el-col> -->
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="changeDormList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="编号" align="center" prop="changeId" />
      <!-- <el-table-column label="交换学生ID" align="center" prop="oneStudentId" /> -->
      <el-table-column label="交换学生学号" align="center" prop="oneUserName" />
      <el-table-column label="交换学生姓名" align="center" prop="oneNickName" />
      <!-- <el-table-column label="原宿舍ID" align="center" prop="oneDormId" /> -->
      <el-table-column label="原宿舍楼栋" align="center" prop="oneBuildingNo" />
      <el-table-column label="原房间号" align="center" prop="oneRoomNo" />
      <el-table-column label="原床位号" align="center" prop="oneBedNo">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.fzu_bed_no" :value="scope.row.oneBedNo"/>
        </template>
      </el-table-column>
      <!-- <el-table-column label="被交换学生ID" align="center" prop="twoStudentId" /> -->
      <el-table-column label="被交换学生学号" align="center" prop="twoUserName" />
      <el-table-column label="被交换学生姓名" align="center" prop="twoNickName" />
      <!-- <el-table-column label="新宿舍ID" align="center" prop="twoDormId" /> -->
      <el-table-column label="新宿舍楼栋" align="center" prop="twoBuildingNo" />
      <el-table-column label="新房间号" align="center" prop="twoRoomNo" />
      <el-table-column label="新床位号" align="center" prop="twoBedNo">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.fzu_bed_no" :value="scope.row.twoBedNo"/>
        </template>
      </el-table-column>
      <el-table-column label="调整时间" align="center" prop="createTime"/>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <!-- <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['apartment:changeDorm:edit']"
          >修改</el-button> -->
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['apartment:changeDorm:remove']"
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

    <!-- 添加或修改宿舍调整对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="600px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="150px">
        <el-divider content-position="left">原信息</el-divider>
        <!-- <el-form-item label="交换学生id" prop="oneStudentId">
          <el-input v-model="form.oneStudentId" placeholder="请输入交换学生id" />
        </el-form-item> -->
        <el-form-item label="交换学生学号" prop="oneUserName">
          <el-input v-model="form.oneUserName" placeholder="请输入交换学生学号" />
        </el-form-item>
        <el-form-item label="交换学生姓名" prop="oneNickName">
          <el-input v-model="form.oneNickName" placeholder="请输入交换学生姓名" />
        </el-form-item>
        <!-- <el-form-item label="原宿舍号" prop="oneDormId">
          <el-input v-model="form.oneDormId" placeholder="请输入原宿舍号" />
        </el-form-item> -->
        <el-form-item label="原宿舍楼栋" prop="oneBuildingNo">
          <el-input v-model="form.oneBuildingNo" placeholder="请输入原宿舍楼栋" />
        </el-form-item>
        <el-form-item label="原房间号" prop="oneRoomNo">
          <el-input v-model="form.oneRoomNo" placeholder="请输入原房间号" />
        </el-form-item>
        <el-form-item label="原床位号" prop="oneBedNo">
          <el-select v-model="form.oneBedNo" placeholder="请选择原床位号">
            <el-option
              v-for="dict in dict.type.fzu_bed_no"
              :key="dict.value"
              :label="dict.label"
              :value="dict.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-divider content-position="left">新信息 (调整到空床位时无需填写学生信息)</el-divider>
        <!-- <el-form-item label="被交换学生id" prop="twoStudentId">
          <el-input v-model="form.twoStudentId" placeholder="请输入被交换学生id" />
        </el-form-item> -->
        <el-form-item label="被交换学生学号" prop="twoUserName">
          <el-input v-model="form.twoUserName" placeholder="请输入被交换学生学号" />
        </el-form-item>
        <el-form-item label="被交换学生姓名" prop="twoNickName">
          <el-input v-model="form.twoNickName" placeholder="请输入被交换学生姓名" />
        </el-form-item>
        <!-- <el-form-item label="新宿舍号" prop="twoDormId">
          <el-input v-model="form.twoDormId" placeholder="请输入新宿舍号" />
        </el-form-item> -->
        <el-form-item label="新宿舍楼栋" prop="twoBuildingNo">
          <el-input v-model="form.twoBuildingNo" placeholder="请输入新宿舍楼栋" />
        </el-form-item>
        <el-form-item label="新房间号" prop="twoRoomNo">
          <el-input v-model="form.twoRoomNo" placeholder="请输入新房间号" />
        </el-form-item>
        <el-form-item label="新床位号" prop="twoBedNo">
          <el-select v-model="form.twoBedNo" placeholder="请选择新床位号">
            <el-option
              v-for="dict in dict.type.fzu_bed_no"
              :key="dict.value"
              :label="dict.label"
              :value="dict.value"
            ></el-option>
          </el-select>
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
import { listChangeDorm, getChangeDorm, delChangeDorm, addChangeDorm, updateChangeDorm } from "@/api/apartment/changeDorm";

export default {
  name: "ChangeDorm",
  dicts: ['fzu_bed_no'],
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
      // 宿舍调整表格数据
      changeDormList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        oneStudentId: null,
        oneUserName: null,
        oneNickName: null,
        oneDormId: null,
        oneBuildingNo: null,
        oneRoomNo: null,
        oneBedNo: null,
        twoStudentId: null,
        twoUserName: null,
        twoNickName: null,
        twoDormId: null,
        twoBuildingNo: null,
        twoRoomNo: null,
        twoBedNo: null,
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
    /** 查询宿舍调整列表 */
    getList() {
      this.loading = true;
      listChangeDorm(this.queryParams).then(response => {
        this.changeDormList = response.rows;
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
        changeId: null,
        oneStudentId: null,
        oneUserName: null,
        oneNickName: null,
        oneDormId: null,
        oneBuildingNo: null,
        oneRoomNo: null,
        oneBedNo: null,
        twoStudentId: null,
        twoUserName: null,
        twoNickName: null,
        twoDormId: null,
        twoBuildingNo: null,
        twoRoomNo: null,
        twoBedNo: null,
        createTime: null
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
      this.ids = selection.map(item => item.changeId)
      this.single = selection.length!==1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "宿舍调整申请";
      console.log(this.$store.state);
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const changeId = row.changeId || this.ids
      getChangeDorm(changeId).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改宿舍调整";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.changeId != null) {
            updateChangeDorm(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            this.form.deptId = this.$store.state.user.deptid;
            addChangeDorm(this.form).then(response => {
              this.$modal.msgSuccess("调整成功");
              this.open = false;
              this.getList();
            });
          }
        }
      });
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const changeIds = row.changeId || this.ids;
      this.$modal.confirm('是否确认删除编号为"' + changeIds + '"的数据项？').then(function() {
        return delChangeDorm(changeIds);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('apartment/changeDorm/export', {
        ...this.queryParams
      }, `changeDorm_${new Date().getTime()}.xlsx`)
    }
  }
};
</script>