<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
      <!-- <el-form-item label="学生ID" prop="studentId">
        <el-input
          v-model="queryParams.studentId"
          placeholder="请输入学生ID"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item> -->
      <el-form-item label="学号" prop="userName">
        <el-input
          v-model="queryParams.userName"
          placeholder="请输入学号"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="学生姓名" prop="nickName">
        <el-input
          v-model="queryParams.nickName"
          placeholder="请输入学生姓名"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="辅导员" prop="fdyName">
        <el-input
          v-model="queryParams.fdyName"
          placeholder="请输入辅导员"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="学院" prop="deptId">
        <el-select v-model="queryParams.deptId" placeholder="请选择学院" clearable>
          <el-option
            v-for="dict in dict.type.fzu_dept_id_name"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <!-- <el-form-item label="校区" prop="schoolArea">
        <el-select v-model="queryParams.schoolArea" placeholder="请选择校区" clearable>
          <el-option
            v-for="dict in dict.type.fzu_school_area"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item> -->
      <!-- <el-form-item label="宿舍ID" prop="dormId">
        <el-input
          v-model="queryParams.dormId"
          placeholder="请输入宿舍ID"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="楼栋号" prop="buildingNo">
        <el-input
          v-model="queryParams.buildingNo"
          placeholder="请输入楼栋号"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="房间号" prop="roomNo">
        <el-input
          v-model="queryParams.roomNo"
          placeholder="请输入房间号"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="床位号" prop="bedNo">
        <el-select v-model="queryParams.bedNo" placeholder="请选择床位号" clearable>
          <el-option
            v-for="dict in dict.type.fzu_bed_no"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item> -->
      <!-- <el-form-item label="退宿原因" prop="quitReason">
        <el-input
          v-model="queryParams.quitReason"
          placeholder="请输入退宿原因"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item> -->
      <!-- <el-form-item label="入住时间" prop="inTime">
        <el-date-picker clearable
          v-model="queryParams.inTime"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="请选择入住时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="退宿时间" prop="outTime">
        <el-date-picker clearable
          v-model="queryParams.outTime"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="请选择退宿时间">
        </el-date-picker>
      </el-form-item> -->
      <!-- <el-form-item label="辅导员" prop="fdyId">
        <el-input
          v-model="queryParams.fdyId"
          placeholder="请输入辅导员"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="辅导员意见" prop="fdyOpinion">
        <el-select v-model="queryParams.fdyOpinion" placeholder="请选择辅导员意见" clearable>
          <el-option
            v-for="dict in dict.type.fzu_approval_opinion"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="学工处" prop="xgcId">
        <el-input
          v-model="queryParams.xgcId"
          placeholder="请输入学工处"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="学工处意见" prop="xgcOpinion">
        <el-select v-model="queryParams.xgcOpinion" placeholder="请选择学工处意见" clearable>
          <el-option
            v-for="dict in dict.type.fzu_approval_opinion"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="校区管理办公室" prop="manageId">
        <el-input
          v-model="queryParams.manageId"
          placeholder="请输入校区管理办公室"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="校区管理办公室意见" prop="manageOpinion">
        <el-select v-model="queryParams.manageOpinion" placeholder="请选择校区管理办公室意见" clearable>
          <el-option
            v-for="dict in dict.type.fzu_approval_opinion"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="审批状态" prop="quitStatus">
        <el-select v-model="queryParams.quitStatus" placeholder="请选择审批状态" clearable>
          <el-option
            v-for="dict in dict.type.fzu_approval_status"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item> -->
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
          v-hasPermi="['apartment:quitDormApproval:add']"
        >申请退宿</el-button>
      </el-col>
      <!-- <el-col :span="1.5">
        <el-button
          type="success"
          plain
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['apartment:quitDormApproval:edit']"
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
          v-hasPermi="['apartment:quitDormApproval:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['apartment:quitDormApproval:export']"
        >导出</el-button>
      </el-col> -->
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="quitDormApprovalList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <!-- <el-table-column label="退宿申请ID" align="center" prop="quitId" /> -->
      <!-- <el-table-column label="学生ID" align="center" prop="studentId" /> -->
      <el-table-column label="学号" align="center" prop="userName" />
      <el-table-column label="学生姓名" align="center" prop="nickName" />
      <!-- <el-table-column label="辅导员" align="center" prop="fdyName" /> -->
      <el-table-column label="学院" align="center" prop="deptId">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.fzu_dept_id_name" :value="scope.row.deptId"/>
        </template>
      </el-table-column>
      <el-table-column label="校区" align="center" prop="schoolArea">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.fzu_school_area" :value="scope.row.schoolArea"/>
        </template>
      </el-table-column>
      <!-- <el-table-column label="宿舍ID" align="center" prop="dormId" /> -->
      <el-table-column label="楼栋号" align="center" prop="buildingNo" />
      <el-table-column label="房间号" align="center" prop="roomNo" />
      <el-table-column label="床位号" align="center" prop="bedNo">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.fzu_bed_no" :value="scope.row.bedNo"/>
        </template>
      </el-table-column>
      <el-table-column label="退宿原因" align="center" prop="quitReason" />
      <el-table-column label="入住时间" align="center" prop="inTime" width="100">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.inTime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="退宿时间" align="center" prop="outTime" width="100">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.outTime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <!-- <el-table-column label="辅导员" align="center" prop="fdyId" /> -->
      <el-table-column label="辅导员" align="center" prop="fdyName" />
      <el-table-column label="辅导员意见" align="center" prop="fdyOpinion">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.fzu_approval_opinion" :value="scope.row.fdyOpinion"/>
        </template>
      </el-table-column>
      <!-- <el-table-column label="学工处" align="center" prop="xgcId" /> -->
      <el-table-column label="学工处" align="center" prop="xgcName" />
      <el-table-column label="学工处意见" align="center" prop="xgcOpinion">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.fzu_approval_opinion" :value="scope.row.xgcOpinion"/>
        </template>
      </el-table-column>
      <!-- <el-table-column label="校区管理办公室" align="center" prop="manageId" /> -->
      <el-table-column label="校区管理办公室" align="center" prop="manageName" />
      <el-table-column label="校区管理办公室意见" align="center" prop="manageOpinion">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.fzu_approval_opinion" :value="scope.row.manageOpinion"/>
        </template>
      </el-table-column>
      <el-table-column label="审批状态" align="center" prop="quitStatus">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.fzu_approval_status" :value="scope.row.quitStatus"/>
        </template>
      </el-table-column>
      <el-table-column label="申请时间" align="center" prop="createTime"  width="180"/>
      <!-- <el-table-column label="备注" align="center" prop="remark" /> -->
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['apartment:quitDormApproval:edit']"
          >审核</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['apartment:quitDormApproval:remove']"
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

    <!-- 添加或修改休学宿舍退宿对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="600px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="160px" style="margin-right:40px">
        <!-- <el-form-item label="学生ID" prop="studentId">
          <el-input v-model="form.studentId" placeholder="请输入学生ID" />
        </el-form-item> -->
        <el-form-item label="学号" prop="userName">
          <el-input v-model="form.userName" placeholder="请输入学号" disabled/>
        </el-form-item>
        <el-form-item label="学生姓名" prop="nickName">
          <el-input v-model="form.nickName" placeholder="请输入学生姓名" disabled/>
        </el-form-item>
        <!-- <el-form-item label="辅导员" prop="fdyName">
          <el-input v-model="form.fdyName" placeholder="请输入辅导员" />
        </el-form-item> -->
        <el-form-item label="学院" prop="deptId">
          <el-select v-model="form.deptId" placeholder="请选择学院" disabled>
            <el-option
              v-for="dict in dict.type.fzu_dept_id_name"
              :key="dict.value"
              :label="dict.label"
              :value="parseInt(dict.value)"
            ></el-option>
          </el-select>
        </el-form-item>
        <!-- <el-form-item label="校区" prop="schoolArea">
          <el-select v-model="form.schoolArea" placeholder="请选择校区">
            <el-option
              v-for="dict in dict.type.fzu_school_area"
              :key="dict.value"
              :label="dict.label"
              :value="dict.value"
            ></el-option>
          </el-select>
        </el-form-item> -->
        <!-- <el-form-item label="宿舍ID" prop="dormId">
          <el-input v-model="form.dormId" placeholder="请输入宿舍ID" />
        </el-form-item> -->
        <el-form-item label="楼栋号" prop="buildingNo">
          <el-input v-model="form.buildingNo" placeholder="请输入楼栋号" disabled/>
        </el-form-item>
        <el-form-item label="房间号" prop="roomNo">
          <el-input v-model="form.roomNo" placeholder="请输入房间号" disabled/>
        </el-form-item>
        <el-form-item label="床位号" prop="bedNo">
          <el-select v-model="form.bedNo" placeholder="请选择床位号" disabled>
            <el-option
              v-for="dict in dict.type.fzu_bed_no"
              :key="dict.value"
              :label="dict.label"
              :value="dict.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="入住时间" prop="inTime">
          <el-date-picker clearable
            v-model="form.inTime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="请选择入住时间"
            disabled>
          </el-date-picker>
        </el-form-item>
        <el-form-item label="退宿时间" prop="outTime">
          <el-date-picker clearable
            v-model="form.outTime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="请选择退宿时间"
            :disabled=!stuOption>
          </el-date-picker>
        </el-form-item>
        <el-form-item label="退宿原因" prop="quitReason">
          <el-input v-model="form.quitReason" placeholder="请输入退宿原因" :disabled=!stuOption />
        </el-form-item>
        <!-- <el-form-item label="辅导员" prop="fdyId">
          <el-input v-model="form.fdyId" placeholder="请输入辅导员" />
        </el-form-item> -->
        <el-form-item label="辅导员" prop="fdyId">
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
        <!-- <el-form-item label="学工处" prop="xgcId">
          <el-input v-model="form.xgcId" placeholder="请输入学工处" />
        </el-form-item> -->
        <el-form-item label="学工处" prop="xgcId">
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
        <!-- <el-form-item label="校区管理办公室" prop="manageId">
          <el-input v-model="form.manageId" placeholder="请输入校区管理办公室" />
        </el-form-item> -->
        <el-form-item label="校区管理办公室" prop="manageId">
          <el-select v-model="form.manageId" placeholder="请选择校区管理办公室负责人" :disabled=!stuOption>
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
        <!-- <el-form-item label="审批状态" prop="quitStatus">
          <el-select v-model="form.quitStatus" placeholder="请选择审批状态">
            <el-option
              v-for="dict in dict.type.fzu_approval_status"
              :key="dict.value"
              :label="dict.label"
              :value="dict.value"
            ></el-option>
          </el-select>
        </el-form-item> -->
        <!-- <el-form-item label="备注" prop="remark">
          <el-input v-model="form.remark" placeholder="请输入备注" />
        </el-form-item> -->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { listQuitDormApproval, getQuitDormApproval, delQuitDormApproval, addQuitDormApproval, updateQuitDormApproval, getInfo, deleteAndUpdateDormInfo } from "@/api/apartment/quitDormApproval";
import { selectUserListByRoleId } from '@/api/apartment/approval';

export default {
  name: "QuitDormApproval",
  dicts: ['fzu_approval_opinion', 'fzu_approval_status', 'fzu_bed_no', 'fzu_school_area', 'fzu_dept_id_name'],
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
      roleParams:{
        fdyRoleId:null,
        xgcRoleId:null,
        xqglRoleId:null,
        deptId:null
      },
      fdyList:[],
      xgcList:[],
      xqglList:[],
      studentInfo:null,
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
      // 休学宿舍退宿表格数据
      quitDormApprovalList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        studentId: null,
        userName: null,
        nickName: null,
        fdyName: null,
        deptId: null,
        schoolArea: null,
        dormId: null,
        buildingNo: null,
        roomNo: null,
        bedNo: null,
        quitReason: null,
        inTime: null,
        outTime: null,
        fdyId: null,
        fdyOpinion: null,
        xgcId: null,
        xgcOpinion: null,
        manageId: null,
        manageOpinion: null,
        quitStatus: null,
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        outTime: [
          { required: true, message: "请选择退宿时间", trigger: "blur" }
        ],
        quitReason: [
          { required: true, message: "请填写退宿理由", trigger: "blur" }
        ],
        fdyId: [
          { required: true, message: "辅导员不能为空", trigger: "blur" }
        ],
        xgcId: [
          { required: true, message: "学工处不能为空", trigger: "blur" }
        ],
        manageId: [
          { required: true, message: "校区管理办公室不能为空", trigger: "blur" }
        ],
      }
    };
  },
  created() {
    console.log(this.$store.state.user);
    this.getList();
    this.getStudentInfo();
    if (this.$store.state.user.roles[0] == "admin") {
        //学生特殊宿舍申请表填写权限
        this.stuOption = true
        //辅导员特殊宿舍申请表填写权限
        this.fdyOption = true
        //学工处特殊宿舍申请表填写权限
        this.xgcOption = true
        //校区管理办公室特殊宿舍申请表填写权限
        this.manageOption = true
      } else if (this.$store.state.user.roles[0] == "student") {
        //学生特殊宿舍申请表填写权限
        this.stuOption = true
        //辅导员特殊宿舍申请表填写权限
        this.fdyOption = false
        //学工处特殊宿舍申请表填写权限
        this.xgcOption = false
        //校区管理办公室特殊宿舍申请表填写权限
        this.manageOption = false
      } else if (this.$store.state.user.roles[0] == "fdy") {
        //学生特殊宿舍申请表填写权限
        this.stuOption = false
        //辅导员特殊宿舍申请表填写权限
        this.fdyOption = true
        //学工处特殊宿舍申请表填写权限
        this.xgcOption = false
        //校区管理办公室特殊宿舍申请表填写权限
        this.manageOption = false
      } else if (this.$store.state.user.roles[0] == "xgc") {
        //学生特殊宿舍申请表填写权限
        this.stuOption = false
        //辅导员特殊宿舍申请表填写权限
        this.fdyOption = false
        //学工处特殊宿舍申请表填写权限
        this.xgcOption = true
        //校区管理办公室特殊宿舍申请表填写权限
        this.manageOption = false
      } else if (this.$store.state.user.roles[0] == "manage") {
        //学生特殊宿舍申请表填写权限
        this.stuOption = false
        //辅导员特殊宿舍申请表填写权限
        this.fdyOption = false
        //学工处特殊宿舍申请表填写权限
        this.xgcOption = false
        //校区管理办公室特殊宿舍申请表填写权限
        this.manageOption = true
      }
  },
  methods: {
    getStudentInfo(){
      if(this.$store.state.user.roles[0] == "student"){
        getInfo(this.$store.state.user.name).then(response =>{
          this.studentInfo = response.data
          console.log("studentInfo:",this.studentInfo)
        })
      } 
    },
    /** 查询休学宿舍退宿列表 */
    getList() {
      if(this.$store.state.user.roles[0] == 'student'){
        this.queryParams.studentId = this.$store.state.user.userId;
      }else if(this.$store.state.user.roles[0] =='fdy'){
        this.queryParams.fdyId = this.$store.state.user.userId;
        this.queryParams.quitStatus = "3";
      }else if(this.$store.state.user.roles[0] =='xgc'){
        this.queryParams.xgcId = this.$store.state.user.userId;
        this.queryParams.fdyOpinion = 1;
        this.queryParams.quitStatus = "3";
      }else if(this.$store.state.user.roles[0] =='manage'){
        this.queryParams.manageId = this.$store.state.user.userId;
        this.queryParams.fdyOpinion = 1;
        this.queryParams.xgcOpinion = 1;
      }
      this.loading = true;
      listQuitDormApproval(this.queryParams).then(response => {
        this.quitDormApprovalList = response.rows;
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
        quitId: null,
        studentId: null,
        userName: null,
        nickName: null,
        fdyName: null,
        deptId: null,
        schoolArea: null,
        dormId: null,
        buildingNo: null,
        roomNo: null,
        bedNo: null,
        quitReason: null,
        inTime: null,
        outTime: null,
        fdyId: null,
        fdyOpinion: null,
        xgcId: null,
        xgcOpinion: null,
        manageId: null,
        manageOpinion: null,
        quitStatus: null,
        createTime: null,
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
      this.ids = selection.map(item => item.quitId)
      this.single = selection.length!==1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.form.studentId = this.studentInfo.userId;
      this.form.userName = this.studentInfo.userName;
      this.form.nickName = this.studentInfo.nickName;
      this.form.fdyName = this.studentInfo.fdyName;
      this.form.deptId = this.studentInfo.deptId;
      this.form.buildingNo = this.studentInfo.buildingNo;
      this.form.roomNo = this.studentInfo.roomNo;
      this.form.bedNo = this.studentInfo.bedNo;
      this.form.inTime = this.studentInfo.createTime;
      this.form.schoolArea = this.studentInfo.schoolArea;
      this.form.dormId = this.studentInfo.dormId;
      this.form.fdyId = this.studentInfo.fdyId;
      if(this.$store.state.user.roles[0] == 'student'){
        this.roleParams.fdyRoleId = 100;
        this.roleParams.xgcRoleId = 101;
        this.roleParams.xqglRoleId = 102;
        this.roleParams.deptId = this.studentInfo.deptId;
        selectUserListByRoleId(this.roleParams).then(response => {
          console.log(response.rows)
          this.fdyList = response.rows[0]
          this.xgcList = response.rows[1]
          this.xqglList = response.rows[2]
        })
      }
      console.log(this.form);
      this.open = true;
      this.title = "宿舍退宿申请";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const quitId = row.quitId || this.ids
      getQuitDormApproval(quitId).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "宿舍退宿审批";
      });
    },
    /** 提交按钮 */
    submitForm() {
      if (new Date(this.form.inTime).getTime() > new Date(this.form.outTime).getTime()) {
        this.$message.error("退宿日期要晚于入住日期");
        return false;
      }
      if(this.form.fdyOpinion == 1 && this.form.xgcOpinion == 1 && this.form.manageOpinion == 1){
        //审批通过
        this.form.quitStatus = 1;
      }else if(this.form.fdyOpinion == 2 || this.form.xgcOpinion == 2 || this.form.manageOpinion == 2){
        //审批不通过
        this.form.quitStatus = 2;
      }else {
        //审批中
        this.form.quitStatus = 3;
      }
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.quitId != null) {
            updateQuitDormApproval(this.form).then(response => {
              this.$modal.msgSuccess("审批完成");
              if(this.form.fdyOpinion == 1 && this.form.xgcOpinion == 1 && this.form.manageOpinion == 1){
                deleteAndUpdateDormInfo(this.form).then(response =>{
                  this.$modal.msgSuccess("宿舍更新完成");
                })
              }
              this.open = false;
              this.getList();
            });
          } else {
            addQuitDormApproval(this.form).then(response => {
              this.$modal.msgSuccess("申请完成");
              this.open = false;
              this.getList();
            });
          }
        }
      });
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const quitIds = row.quitId || this.ids;
      this.$modal.confirm('是否确认删除编号为"' + quitIds + '"的数据项？').then(function() {
        return delQuitDormApproval(quitIds);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('apartment/quitDormApproval/export', {
        ...this.queryParams
      }, `quitDormApproval_${new Date().getTime()}.xlsx`)
    }
  }
};
</script>