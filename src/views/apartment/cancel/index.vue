<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
<!--      <el-form-item label="学生ID" prop="studentId">-->
<!--        <el-input-->
<!--          v-model="queryParams.studentId"-->
<!--          placeholder="请输入学生ID"-->
<!--          clearable-->
<!--          @keyup.enter.native="handleQuery"-->
<!--        />-->
<!--      </el-form-item>-->
      <el-form-item label="学生姓名" prop="studentName">
        <el-input
          v-model="queryParams.studentName"
          placeholder="请输入学生姓名"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
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
<!--      <el-form-item label="学工处ID" prop="xgcId">-->
<!--        <el-input-->
<!--          v-model="queryParams.xgcId"-->
<!--          placeholder="请输入学工处ID"-->
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
<!--        <el-select v-model="queryParams.manageOpinion" placeholder="请选择校区管理办公室意见" clearable>-->
<!--          <el-option-->
<!--            v-for="dict in dict.type.fzu_approval_category"-->
<!--            :key="dict.value"-->
<!--            :label="dict.label"-->
<!--            :value="dict.value"-->
<!--          />-->
<!--        </el-select>-->
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
          v-hasPermi="['apartment:cancel:add']"
        >申请</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          plain
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['apartment:cancel:edit']"
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
          v-hasPermi="['apartment:cancel:remove']"
        >删除</el-button>
      </el-col>
      <!-- <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['apartment:cancel:export']"
        >导出</el-button>
      </el-col> -->
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="cancelList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="退宿申请编号" align="center" prop="cancelId" />
<!--      <el-table-column label="学生ID" align="center" prop="studentId" />-->
      <el-table-column label="学生姓名" align="center" prop="studentName" />
<!--      <el-table-column label="辅导员ID" align="center" prop="fdyId" />-->
      <el-table-column label="辅导员" align="center" prop="fdyName" />
      <el-table-column label="辅导员意见" align="center" prop="fdyOpinion">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.fzu_approval_opinion" :value="scope.row.fdyOpinion"/>
        </template>
      </el-table-column>
<!--      <el-table-column label="学工处ID" align="center" prop="xgcId" />-->
      <el-table-column label="学工处" align="center" prop="xgcName" />
      <el-table-column label="学工处意见" align="center" prop="xgcOpinion">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.fzu_approval_opinion" :value="scope.row.xgcOpinion"/>
        </template>
      </el-table-column>
<!--      <el-table-column label="校区管理办公室ID" align="center" prop="manageId" />-->
      <el-table-column label="校区管理办公室" align="center" prop="manageName" />
      <el-table-column label="校区管理办公室意见" align="center" prop="manageOpinion">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.fzu_approval_opinion" :value="scope.row.manageOpinion"/>
        </template>
      </el-table-column>
      <el-table-column label="审批状态" align="center" prop="cancelStatus">
      <template slot-scope="scope">
        <dict-tag :options="dict.type.fzu_approval_status" :value="scope.row.cancelStatus"/>
      </template>
      </el-table-column>
      <el-table-column label="宿舍ID" align="center" prop="dormId" />
      <el-table-column label="备注" align="center" prop="remark" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['apartment:cancel:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['apartment:cancel:remove']"
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
    <!-- 添加或修改特殊退宿申请对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="学生ID" prop="studentId">
          <el-input v-model="form.studentId" placeholder="请输入学生ID" :disabled="true" />
        </el-form-item>
        <el-form-item label="学生姓名" prop="studentName">
          <el-input v-model="form.studentName" placeholder="请输入学生姓名" :disabled="true" />
        </el-form-item>
        <el-form-item label="辅导员" prop="fdyId">
<!--          <el-input v-model="form.fdyId" placeholder="请输入辅导员ID" />-->
          <el-select v-model="form.fdyId" placeholder="请选择辅导员" :disabled=!stuOption>
            <el-option
              v-for="item in fdyList"
              :key="item.userId"
              :label="item.nickName"
              :value="item.userId">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="辅导员意见" prop="fdyOpinion">
          <el-select v-model="form.fdyOpinion" placeholder="请选择辅导员意见" :disabled=!fdyOption>
            <el-option
              v-for="dict in dict.type.fzu_approval_opinion"
              :key="dict.value"
              :label="dict.label"
              :value="dict.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="学工处" prop="xgcId">
<!--          <el-input v-model="form.xgcId" placeholder="请输入学工处ID" />-->
          <el-select v-model="form.xgcId" placeholder="请选择学工处" :disabled=!stuOption>
            <el-option
              v-for="item in xgcList"
              :key="item.userId"
              :label="item.nickName"
              :value="item.userId">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="学工处意见" prop="xgcOpinion">
          <el-select v-model="form.xgcOpinion" placeholder="请选择学工处意见" :disabled=!xgcOption>
            <el-option
              v-for="dict in dict.type.fzu_approval_opinion"
              :key="dict.value"
              :label="dict.label"
              :value="dict.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="校区管理办公室负责人" prop="manageId">
<!--          <el-input v-model="form.manageId" placeholder="请输入校区管理办公室ID" />-->
          <el-select v-model="form.manageId" placeholder="请选择校区" :disabled=!stuOption>
            <el-option
              v-for="item in xqglList"
              :key="item.userId"
              :label="item.nickName"
              :value="item.userId">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="校区管理办公室意见" prop="manageOpinion">
          <el-select v-model="form.manageOpinion" placeholder="请选择校区管理办公室意见" :disabled=!manageOption>
            <el-option
              v-for="dict in dict.type.fzu_approval_opinion"
              :key="dict.value"
              :label="dict.label"
              :value="dict.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="宿舍" prop="dormId">
<!--          <el-input v-model="form.dormId" placeholder="请选择宿舍" :disabled="true"/>-->
          <el-select v-model="form.dormId" placeholder="请选择宿舍" :disabled=!wyglOption>
            <el-option
              v-for="item in dormList"
              :key="item.dormId"
              :label="item.buildingNo + '栋' + item.roomNo"
              :value="item.dormId">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="form.remark" placeholder="请输入备注" />
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
import { listCancel, getCancel, delCancel, addCancel, updateCancel } from "@/api/apartment/cancel";
import { getInfo } from '@/api/login'
import { selectUserListByRoleId } from '@/api/apartment/approval'
import { getUser } from '@/api/system/user'
import { getStudentdorm, updateStudentdorm } from '@/api/apartment/dormitory'

export default {
  name: "Cancel",
  dicts: ['opinion', 'fzu_approval_opinion','fzu_approval_status'],
  data() {
    return {
      //学生特殊宿舍申请表填写权限
      stuOption:true,
      //辅导员特殊宿舍申请表填写权限
      fdyOption:true,
      //学工处特殊宿舍申请表填写权限
      xgcOption:true,
      //校区管理办公室特殊宿舍申请表填写权限
      manageOption:true,
      //物业特殊宿舍申请表填写权限
      wyglOption:true,
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
      // 特殊退宿申请表格数据
      cancelList: [],
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
        fdyId: null,
        fdyOpinion: null,
        xgcId: null,
        xgcOpinion: null,
        manageId: null,
        manageOpinion: null,
        cancelStatus: null,
        dormId: null,
      },
      roomParams:{
        dormId:null,
        buildingNo: null,
        roomNo: null,
        feesStatus: null,
        feesCategory: null,
        dormStatus: 3,
      },
      // 表单参数
      form: {},
      dormform:{},
      // 表单校验
      rules: {
        fdyId: [
          { required: true, message: "辅导员不能为空", trigger: "blur" }
        ],
        xgcId: [
          { required: true, message: "学工处不能为空", trigger: "blur" }
        ],
        manageId: [
          { required: true, message: "校区管理办公室不能为空", trigger: "blur" }
        ],
        dormId: [
          { required: true, message: "宿舍Id不能为空", trigger: "blur" }
        ],
      },
      user:undefined,
      roleParams:{
        fdyRoleId:null,
        xgcRoleId:null,
        xqglRoleId:null,
        deptId:null
      },
      fdyList:null,
      xgcList:null,
      xqglList:null,
      wyglList:null
    };
  },
  created() {
    getInfo().then(response => {
      this.user = response.user;
      var roleId = this.user.roles[0].roleId;
      this.getList();
      if (roleId == '1') {
        //学生特殊宿舍申请表填写权限
        this.stuOption = true
        //辅导员特殊宿舍申请表填写权限
        this.fdyOption = true
        //学工处特殊宿舍申请表填写权限
        this.xgcOption = true
        //校区管理办公室特殊宿舍申请表填写权限
        this.manageOption = true
        //物业特殊宿舍申请表填写权限
        this.wyglOption = true
      } else if (roleId == '2') {
        //学生特殊宿舍申请表填写权限
        this.stuOption = true
        //辅导员特殊宿舍申请表填写权限
        this.fdyOption = false
        //学工处特殊宿舍申请表填写权限
        this.xgcOption = false
        //校区管理办公室特殊宿舍申请表填写权限
        this.manageOption = false
        //物业特殊宿舍申请表填写权限
        this.wyglOption = false
      } else if (roleId == '100') {
        //学生特殊宿舍申请表填写权限
        this.stuOption = false
        //辅导员特殊宿舍申请表填写权限
        this.fdyOption = true
        //学工处特殊宿舍申请表填写权限
        this.xgcOption = false
        //校区管理办公室特殊宿舍申请表填写权限
        this.manageOption = false
        //物业特殊宿舍申请表填写权限
        this.wyglOption = false
      } else if (roleId == '101') {
        //学生特殊宿舍申请表填写权限
        this.stuOption = false
        //辅导员特殊宿舍申请表填写权限
        this.fdyOption = false
        //学工处特殊宿舍申请表填写权限
        this.xgcOption = true
        //校区管理办公室特殊宿舍申请表填写权限
        this.manageOption = false
        //物业特殊宿舍申请表填写权限
        this.wyglOption = false
      } else if (roleId == '102') {
        //学生特殊宿舍申请表填写权限
        this.stuOption = false
        //辅导员特殊宿舍申请表填写权限
        this.fdyOption = false
        //学工处特殊宿舍申请表填写权限
        this.xgcOption = false
        //校区管理办公室特殊宿舍申请表填写权限
        this.manageOption = true
        //物业特殊宿舍申请表填写权限
        this.wyglOption = false
      } else if (roleId == '103') {
        //学生特殊宿舍申请表填写权限
        this.stuOption = false
        //辅导员特殊宿舍申请表填写权限
        this.fdyOption = false
        //学工处特殊宿舍申请表填写权限
        this.xgcOption = false
        //校区管理办公室特殊宿舍申请表填写权限
        this.manageOption = false
        //物业特殊宿舍申请表填写权限
        this.wyglOption = true
      }
    })
  },
  methods: {
    /** 查询特殊退宿申请列表 */
    getList() {
      const roleKey = this.$store.getters.roles[0]
      if(roleKey == 'student'){
        // console.log(this.$store.getters);
        this.queryParams.studentId = this.user.userId;
      }else if(roleKey =='fdy'){
        this.queryParams.fdyId = this.user.userId;
      }else if(roleKey =='xgc'){
        this.queryParams.xgcId = this.user.userId;
        this.queryParams.fdyOpinion = 1;
      }else if(roleKey =='manage'){
        this.queryParams.manageId = this.user.userId;
        this.queryParams.fdyOpinion = 1;
        this.queryParams.xgcOpinion = 1;
      }else if(roleKey =='wygl'){
        this.queryParams.fdyOpinion = 1;
        this.queryParams.xgcOpinion = 1;
        this.queryParams.manageOpinion = 1;
      }
      this.loading = true;
      listCancel(this.queryParams).then(response => {
        this.cancelList = response.rows;
        this.total = response.total;
        this.loading = false;
        console.log(response)
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
        cancelId: null,
        studentId: null,
        studentName: null,
        fdyId: null,
        fdyOpinion: null,
        xgcId: null,
        xgcOpinion: null,
        manageId: null,
        manageOpinion: null,
        cancelStatus: null,
        dormId: null,
        remark: null
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
      this.ids = selection.map(item => item.cancelId)
      this.single = selection.length!==1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      const roleKey = this.$store.getters.roles[0]
      if(roleKey == 'student'){
        this.roleParams.fdyRoleId = 100;
        this.roleParams.xgcRoleId = 101;
        this.roleParams.xqglRoleId = 102;
        this.roleParams.deptId = this.user.deptId;
        selectUserListByRoleId(this.roleParams).then(response => {
          console.log(response.rows)
          this.fdyList = response.rows[0]
          this.xgcList = response.rows[1]
          this.xqglList = response.rows[2]
        })

      }else if(roleKey =='fdy'){

      }else if(roleKey =='xgc'){

      }else if(roleKey =='manage'){

      }else if(roleKey =='wygl'){

      }
      this.form.studentId = this.user.userId;
      this.form.studentName = this.user.nickName;
      this.open = true;
      this.title = "添加特殊退宿申请";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const cancelId = row.cancelId || this.ids
      getCancel(cancelId).then(response => {
        this.form = response.data;
        const roleKey = this.$store.getters.roles[0]
        this.roleParams.fdyRoleId = 100;
        this.roleParams.xgcRoleId = 101;
        this.roleParams.xqglRoleId = 102;
        getUser(this.form.studentId).then(response =>{
          this.roleParams.deptId = response.data.deptId
        })
        selectUserListByRoleId(this.roleParams).then(response => {
          this.fdyList = response.rows[0]
          this.xgcList = response.rows[1]
          this.xqglList = response.rows[2]
        })
        this.open = true;
        this.title = "修改特殊退宿申请";
      });
    },
    /** 提交按钮 */
    submitForm() {
      if (new Date(this.form.endTime).getTime() < new Date(this.form.startTime).getTime()) {
        this.$message.error("起始日期要早于终止日期");
        return false;
      }
      if(this.form.fdyOpinion == 1 && this.form.xgcOpinion == 1 && this.form.manageOpinion == 1){
        //审批通过
        this.form.cancelStatus = 1;
        if(this.form.dormId){
          getStudentdorm(this.form.dormId).then(response => {
            this.dormform = response.data;
            if(this.dormform.dormStatus == 4){this.dormform.dormStatus = 3;}
            console.log(this.dormform)
            updateStudentdorm(this.dormform).then(response => {
              this.$modal.msgSuccess("取消分配成功");
            });
          });
        }
      }else if(this.form.fdyOpinion == 2 || this.form.xgcOpinion == 2 || this.form.manageOpinion == 2){
        //审批不通过
        this.form.cancelStatus = 2;
      }else {
        //审批中
        this.form.cancelStatus = 3;
      }
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.cancelId != null) {
            updateCancel(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addCancel(this.form).then(response => {
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
      const cancelIds = row.cancelId || this.ids;
      this.$modal.confirm('是否确认删除特殊退宿申请编号为"' + cancelIds + '"的数据项？').then(function() {
        return delCancel(cancelIds);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('apartment/cancel/export', {
        ...this.queryParams
      }, `cancel_${new Date().getTime()}.xlsx`)
    }
  }
};
</script>
