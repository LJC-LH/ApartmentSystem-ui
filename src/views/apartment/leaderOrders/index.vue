
<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="楼栋号" prop="buildingNo">
        <el-input v-model="queryParams.buildingNo" placeholder="请输入楼栋号" clearable @keyup.enter.native="handleQuery" />
      </el-form-item>
      <el-form-item label="房间号" prop="roomNo">
        <el-input v-model="queryParams.roomNo" placeholder="请输入房间号" clearable @keyup.enter.native="handleQuery" />
      </el-form-item>
      <el-form-item label="学号" prop="userName">
        <el-input v-model="queryParams.userName" placeholder="请输入学号" clearable @keyup.enter.native="handleQuery" />
      </el-form-item>
      <el-form-item label="学生姓名" prop="niceName">
        <el-input v-model="queryParams.niceName" placeholder="请输入学生姓名" clearable @keyup.enter.native="handleQuery" />
      </el-form-item>
      <el-form-item label="床位" prop="bedNo">
        <el-input v-model="queryParams.bedNo" placeholder="请输入床位" clearable @keyup.enter.native="handleQuery" />
      </el-form-item>
      <el-form-item label="学院" prop="deptId">
        <el-select v-model="queryParams.deptId" placeholder="请选择学院" clearable>
          <el-option v-for="dict in dict.type.fzu_dept_id_name" :key="dict.value" :label="dict.label"
            :value="Number(dict.value)" />
        </el-select>
      </el-form-item>
      <el-form-item label="缴费情况" prop="feesCategory">
        <el-input v-model="queryParams.feesCategory" placeholder="请输入缴费情况" clearable @keyup.enter.native="handleQuery" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button type="primary" plain icon="el-icon-plus" size="mini" @click="handleAdd" :disabled="addoption"
          v-hasPermi="['apartment:user:add']">新增</el-button>
      </el-col>
    <!-- <el-col :span="1.5">
        <el-button type="success" plain icon="el-icon-edit" size="mini" :disabled="single || addoption" @click="handleUpdate" 
          v-hasPermi="['apartment:user:edit']">修改</el-button>
        </el-col> -->
      <el-col :span="1.5">
        <el-button type="danger" plain icon="el-icon-delete" size="mini" :disabled="multiple || addoption"
          @click="handleDelete" v-hasPermi="['apartment:user:remove']">删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button type="info" plain icon="el-icon-upload2" size="mini" @click="handleImport"
          v-hasPermi="['apartment:user:import']">导入</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button type="warning" plain icon="el-icon-download" size="mini" @click="handleExport"
          v-hasPermi="['apartment:user:export']">导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="userList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="楼栋号" align="center" prop="buildingNo" />
      <el-table-column label="房间号" align="center" prop="roomNo" />
      <el-table-column label="学号" align="center" prop="userName" width="100px" />
      <el-table-column label="学生姓名" align="center" prop="niceName" />
      <el-table-column label="性别" align="center" prop="sex">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.sys_user_sex" :value="scope.row.sex" />
        </template>
      </el-table-column>
      <el-table-column label="床位" align="center" prop="bedNo" />
      <el-table-column label="学院" align="center" prop="deptId" width="180px">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.fzu_dept_id_name" :value="scope.row.deptId" />
        </template>
      </el-table-column>
      <el-table-column label="省份" align="center" prop="province" />
      <el-table-column label="学生电话" align="center" prop="stuPhone" width="110px" />
      <el-table-column label="缴费情况" align="center" prop="feesStatus">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.fzu_fees_status" :value="scope.row.feesStatus" />
        </template>
      </el-table-column>
      <el-table-column label="缴费类型" align="center" prop="feesCategory">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.fzu_fees_category" :value="scope.row.feesCategory" />
        </template>
      </el-table-column>
      <el-table-column label="宿舍使用情况" align="center" prop="dormStatus">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.fzu_dorm_status" :value="scope.row.dormStatus" />
        </template>
      </el-table-column>
      <el-table-column label="学籍状态" align="center" prop="schoolRoll" :formatter="schoolroolFormat">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.fzu_school_roll" :value="scope.row.schoolRoll" />
        </template>
      </el-table-column>
      <el-table-column label="校区" align="center" prop="schoolArea">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.fzu_school_area" :value="scope.row.schoolArea" />
        </template>
      </el-table-column>
      <el-table-column label="单位联系人" align="center" prop="fdyName" />
      <el-table-column label="单位联系人电话" align="center" prop="fdyPhone" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width" width="100px">
        <template slot-scope="scope">
          <el-button size="mini" type="text" icon="el-icon-edit" @click="handleUpdate(scope.row)" :disabled="addoption"
            v-hasPermi="['apartment:user:edit']">修改</el-button>
          <el-button size="mini" type="text" icon="el-icon-delete" @click="handleDelete(scope.row)" :disabled="addoption"
            v-hasPermi="['apartment:user:remove']">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total > 0" :total="total" :page.sync="queryParams.pageNum" :limit.sync="queryParams.pageSize"
      @pagination="getList" />

    <!-- 添加用户信息对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="楼栋号" prop="buildingNo">
          <el-input v-model="form.buildingNo" placeholder="请输入楼栋号" />
        </el-form-item>
        <el-form-item label="房间号" prop="roomNo">
          <el-input v-model="form.roomNo" placeholder="请输入房间号" />
        </el-form-item>
        <el-form-item label="学号" prop="userName">
          <el-input v-model="form.userName" placeholder="请输入学号" />
        </el-form-item>
        <el-form-item label="学生姓名" prop="nickName">
          <el-input v-model="form.nickName" placeholder="请输入学生姓名" />
        </el-form-item>
        <el-form-item label="床位" prop="bedNo">
          <el-input v-model="form.bedNo" placeholder="请输入床位" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
    <!-- 修改用户信息对话框 -->
    <el-dialog :title="title" :visible.sync="changeopen" width="500px" append-to-body>
      <el-form ref="changeform" :model="changeform" :rules="rules" label-width="80px">
        <el-form-item label="楼栋号" prop="buildingNo">
          <el-input v-model="changeform.buildingNo" placeholder="请输入楼栋号" :disabled="true" />
        </el-form-item>
        <el-form-item label="房间号" prop="roomNo">
          <el-input v-model="changeform.roomNo" placeholder="请输入房间号" :disabled="true" />
        </el-form-item>
        <el-form-item label="学号" prop="userName">
          <el-input v-model="changeform.userName" placeholder="请输入学号" />
        </el-form-item>
        <el-form-item label="学生姓名" prop="niceName">
          <el-input v-model="changeform.niceName" placeholder="请输入学生姓名" />
        </el-form-item>
        <el-form-item label="床位" prop="bedNo">
          <el-input v-model="changeform.bedNo" placeholder="请输入床位" :disabled="true" />
        </el-form-item>
        <el-form-item label="学院" prop="deptId">
          <el-select v-model="changeform.deptId" placeholder="请选择学院">
            <el-option v-for="dict in dict.type.fzu_dept_id_name" :key="dict.value" :label="dict.label"
              :value="Number(dict.value)" />
          </el-select>
        </el-form-item>
        <!-- 修改辅导员 -->
        <el-form-item label="单位联系人" prop="fdyNumber">
          <el-select v-model="changeform.fdyNumber" filterable placeholder="请选择单位负责人" clearable>
            <el-option v-for="item in fdyList" :key="item.userName" :label="item.nickName + '（' + item.userName + '）'"
              :value="item.userName"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="省份" prop="province">
          <el-input v-model="changeform.province" placeholder="请输入省份" />
        </el-form-item>
        <el-form-item label="学生电话" prop="stuPhone">
          <el-input v-model="changeform.stuPhone" placeholder="请输入电话" />
        </el-form-item>
        <el-form-item label="缴费类别" prop="feesCategory">
          <el-radio-group v-model="changeform.feesCategory">
            <el-radio v-for="dict in dict.type.fzu_fees_category" :key="dict.value" :label="dict.value">{{ dict.label
            }}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="缴费情况" prop="feesStatus">
          <el-radio-group v-model="changeform.feesStatus">
            <el-radio v-for="dict in dict.type.fzu_fees_status" :key="dict.value" :label="dict.value">{{ dict.label
            }}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="宿舍使用情况" prop="dormStatus">
          <el-select v-model="changeform.dormStatus" placeholder="请选择宿舍使用情况">
            <el-option v-for="dict in dict.type.fzu_dorm_status" :key="dict.value" :label="dict.label"
              :value="dict.value"></el-option>
          </el-select>
        </el-form-item>
      <!-- <el-form-item label="单位联系人" prop="contactPerson">
          <el-input v-model="changeform.contactPerson" placeholder="请输入校区" />
        </el-form-item>
        <el-form-item label="单位联系人电话" prop="contactPhone">
          <el-input v-model="changeform.contactPhone" placeholder="请输入校区" />
          </el-form-item> -->
        <el-form-item label="学籍状态" prop="schoolRoll">
          <el-radio-group v-model="changeform.schoolRoll">
            <el-radio v-for="dict in dict.type.fzu_school_roll" :key="dict.value" :label="dict.value">{{ dict.label
            }}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="校区" prop="schoolArea">
          <el-select v-model="changeform.schoolArea" placeholder="请选择校区">
            <el-option v-for="dict in dict.type.fzu_school_area" :key="dict.value" :label="dict.label"
              :value="dict.value"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="changesubmitForm">确 定</el-button>
        <el-button @click="changecancel">取 消</el-button>
      </div>
    </el-dialog>

    <!-- 学生宿舍信息导入对话框 -->
    <el-dialog :title="upload.title" :visible.sync="upload.open" width="400px" append-to-body>
      <el-upload ref="upload" :limit="1" accept=".xlsx, .xls" :headers="upload.headers"
        :action="upload.url + '?updateSupport=' + upload.updateSupport" :disabled="upload.isUploading"
        :on-progress="handleFileUploadProgress" :on-success="handleFileSuccess" :auto-upload="false" drag
        v-loading.fullscreen.lock="fullscreenLoading" element-loading-text="数据正在拼命导入中，请稍等..."
        element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.8)">
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip text-center" slot="tip">
        <!-- <div class="el-upload__tip" slot="tip">
            <el-checkbox v-model="upload.updateSupport" /> 是否更新已经存在的学生宿舍数据
            </div> -->
          <span>仅允许导入xls、xlsx格式文件。</span>
          <el-link type="primary" :underline="false" style="font-size:12px;vertical-align: baseline;"
            @click="importTemplate">下载模板</el-link>
        </div>
      </el-upload>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitFileForm">确 定</el-button>
        <el-button @click="upload.open = false">取 消</el-button>
      </div>
    </el-dialog>


  </div>
</template>

<script>
import { listUser, getUser, delUser, addUser, updateUser, getRoot, getRolesDeptId } from "@/api/apartment/user";
import { listFdy } from "@/api/system/user";
import { getToken } from "@/utils/auth";
import { number } from 'echarts';

export default {
  name: "User",
  dicts: ['fzu_dorm_status', 'fzu_school_roll', 'fzu_school_area', 'fzu_fees_status', 'fzu_fees_category', 'sys_user_sex', 'fzu_dept_id_name'],
  data() {
    return {
      fullscreenLoading: false,
      fdyList: null,
      fdyParams: {
        roleId: 100,
        deptId: undefined,
      },
      changeopen: false,
      schoolrollOpt: [],
      feesstatusOpt: [],
      feescategoryOpt: [],
      dormstatusOpt: [],
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
      dormIds: [],
      addoption: false,
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 显示搜索条件
      showSearch: true,
      // 总条数
      total: 0,
      // 用户信息表格数据
      temp: [],
      userList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 学生宿舍信息导入参数
      upload: {
        // 是否显示弹出层（宿舍导入）
        open: false,
        // 弹出层标题（宿舍导入）
        title: "",
        // 是否禁用上传
        isUploading: false,
        // 是否更新已经存在的宿舍数据
        updateSupport: 0,
        // 设置上传的请求头部
        headers: { Authorization: "Bearer " + getToken() },
        // 上传的地址
        url: process.env.VUE_APP_BASE_API + "/apartment/user/importData"
      },
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        buildingNo: null,
        roomNo: null,
        userName: null,
        niceName: null,
        sex: null,
        bedNo: null,
        deptId: null,
        province: null,
        stuPhone: null,
        feesCategory: null,
        dormStatus: null,
        contactPerson: null,
        contactPhone: null,
        schoolRoll: null,
        schoolArea: null,
        fdyName: null,
        fdyId: null,
        fdyNumber: null,
      },
      changeParams: {
        userId: null,
        dormId: null,
      },
      // 表单参数
      form: {},
      changeform: {},
      checkCode: 0,
      rolesDeptId: 0,
      // 表单校验
      rules: {
        userName: [
          { required: true, message: "用户账号不能为空", trigger: "blur" }
        ],
        buildingNo: [
          { required: true, message: "楼栋号不能为空", trigger: "blur" }
        ],
        roomNo: [
          { required: true, message: "房间号不能为空", trigger: "blur" }
        ],
        nickName: [
          { required: true, message: "学生姓名不能为空", trigger: "blur" }
        ],
        bedNo: [
          { required: true, message: "床位不能为空", trigger: "blur" }
        ],
      }
    };
  },
  created() {
    this.getList();
    this.getfdyList();
    // this.rootCheck(); //先注释掉

    // this.getrolesdeptid();
    // this.getDicts("fzu_school_roll").then(response => {
    //   this.schoolrollOpt = response.data;
    // });
    // this.getDicts("fzu_fees_status").then(response => {
    //   this.feesstatusOpt = response.data;
    // });
    // this.getDicts("fzu_fees_category").then(response => {
    //   this.feescategoryOpt = response.data;
    // });
    // this.getDicts("fzu_dorm_status").then(response => {
    //   this.dormstatusOpt = response.data;
    // });
  },
  methods: {
    getfdyList() {
      listFdy(this.fdyParams).then(response => {
        console.log(response.rows)
        this.fdyList = response.rows;
      }
      )
    },
    //2023.2.13.字典翻译
    schoolroolFormat(row) {
      return this.selectDictLabel(this.schoolrollOpt, row.type)
    },
    handleclose() {
      this.changeopen = false
    },
    /** 查询用户信息列表 */
    getList() {
      this.loading = true;
      //重置？
      this.temp = [];
      this.userList = [];
      if (this.$store.state.user.roles[0] == 'fdy') {
        this.queryParams.deptId = this.$store.state.user.deptid;
      }
      if (this.$store.state.user.roles[0] == 'student') {
        this.queryParams.userName = this.$store.state.user.name;
      }
      listUser(this.queryParams).then(response => {
        this.userList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    rootCheck() { //这个函数前端或者后端有问题
      this.loading = true;
      var userrole = this.$store.state.user.roles[0];
      if (userrole == 'fdy' || userrole == 'xgc') {
        getRoot().then(response => {
          this.checkCode = response
          console.log(this.checkCode);
          if (this.checkCode == 0) {
            this.addoption = true;
            console.log(this.addoption);
          }
        });
      }

    },
    getrolesdeptid() {
      getRolesDeptId(this.$store.state.user.roles[0]).then(response => {
        this.rolesDeptId = response
        console.log(this.rolesDeptId);
      })
    },

    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    // 表单重置
    reset() {
      this.form = {
        userId: null,
        buildingNo: null,
        roomNo: null,
        userName: null,
        niceName: null,
        sex: null,
        bedNo: null,
        deptId: null,
        province: null,
        stuPhone: null,
        feesCategory: null,
        dormStatus: null,
        contactPerson: null,
        contactPhone: null,
        schoolRoll: null,
        schoolArea: null
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
      // console.log(selection)
      this.ids = selection.map(item => item.userId)
      this.dormIds = selection.map(item => item.dormId)
      this.single = selection.length !== 1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加宿舍信息管理";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      // console.log(row);
      this.changeParams.userId = row.userId
      this.changeParams.dormId = row.dormId
      getUser(this.changeParams).then(response => {
        this.changeform = response.data;
        this.changeopen = true;
        this.title = "修改宿舍信息管理";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        console.log(this.form);
        if (valid) {
          if (this.form.userId != null) {
            updateUser(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addUser(this.form).then(response => {
              this.$modal.msgSuccess("新增成功");
              this.open = false;
              this.getList();
            });
          }
        }
      });
    },

    changesubmitForm() {
      this.$refs["changeform"].validate(valid => {
        console.log(this.changeform);
        if (valid) {
          if (this.changeform.userId != null) {
            updateUser(this.changeform).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.changeopen = false;
              this.getList();
            });
          } else {
            addUser(this.changeform).then(response => {
              this.$modal.msgSuccess("新增成功");
              this.changeopen = false;
              this.getList();
            });
          }
        }
      });
    },
    changecancel() {
      this.changeopen = false;
      this.reset();
    },

    /** 删除按钮操作 */
    handleDelete(row) {
      var dormAndUserList = [];
      const dormIds = row.dormId || this.dormIds;
      const userIds = row.userId || this.ids;
      if (typeof dormIds == 'number') {
        var dormAndUserItem = {
          dormId: dormIds,
          userId: userIds,
        }
        dormAndUserList.push(dormAndUserItem)
      }
      else {
        for (var i = 0; i < userIds.length; i++) {
          var dormAndUserItem = {
            dormId: null,
            userId: null,
          }
          dormAndUserItem.dormId = dormIds[i];
          dormAndUserItem.userId = userIds[i];
          dormAndUserList.push(dormAndUserItem)
        }
      }
      console.log(dormAndUserList)
      this.$modal.confirm('是否确认删除用户信息编号为"' + userIds + '"的数据项？').then(function () {
        return delUser(dormAndUserList);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => { });
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('apartment/user/export', {
        ...this.queryParams
      }, `user_${new Date().getTime()}.xlsx`)
    },
    /** 导入按钮操作 */
    handleImport() {
      this.upload.title = "学生宿舍信息导入";
      this.upload.open = true;
    },
    /** 下载模板操作 */
    importTemplate() {
      this.download('apartment/user/importTemplate', {
      }, `stuDormitory_template_${new Date().getTime()}.xlsx`)
    },
    // 文件上传中处理
    handleFileUploadProgress(event, file, fileList) {
      this.upload.isUploading = true;
    },
    // 文件上传成功处理
    handleFileSuccess(response, file, fileList) {
      this.upload.open = false;
      this.upload.isUploading = false;
      this.$refs.upload.clearFiles();
      this.$alert("<div style='overflow: auto;overflow-x: hidden;max-height: 70vh;padding: 10px 20px 0;'>" + response.msg + "</div>", "导入结果", { dangerouslyUseHTMLString: true });
      this.getList();
    },
    // 提交上传文件
    submitFileForm() {
      this.$refs.upload.submit();
    }
  }
};
</script>
