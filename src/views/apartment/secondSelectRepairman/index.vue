<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
<!--      <el-form-item label="学生id" prop="studentId">-->
<!--        <el-input-->
<!--          v-model="queryParams.studentId"-->
<!--          placeholder="请输入学生id"-->
<!--          clearable-->
<!--          @keyup.enter.native="handleQuery"-->
<!--        />-->
<!--      </el-form-item>-->
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
      <el-form-item label="损坏说明" prop="damageDescription">
        <el-input
          v-model="queryParams.damageDescription"
          placeholder="请输入损坏说明"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="创建时间" prop="createAt">
        <el-date-picker clearable
          v-model="queryParams.createAt"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="请选择报修创建时间">
        </el-date-picker>
      </el-form-item>
<!--      <el-form-item label="一次维修人员id" prop="firstRepairmanId">-->
<!--        <el-input-->
<!--          v-model="queryParams.firstRepairmanId"-->
<!--          placeholder="请输入一次维修人员id"-->
<!--          clearable-->
<!--          @keyup.enter.native="handleQuery"-->
<!--        />-->
<!--      </el-form-item>-->
      <el-form-item label="第一次报修完成时间" prop="firstCompletionTime" label-width="140px">
        <el-date-picker clearable
          v-model="queryParams.firstCompletionTime"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="请选择第一次报修完成时间">
        </el-date-picker>
      </el-form-item>
<!--      <el-form-item label="校区管理办公室意见" prop="campusManagementOpinion">-->
<!--        <el-input-->
<!--          v-model="queryParams.campusManagementOpinion"-->
<!--          placeholder="请输入校区管理办公室意见"-->
<!--          clearable-->
<!--          @keyup.enter.native="handleQuery"-->
<!--        />-->
<!--      </el-form-item>-->




<!--      <el-form-item label="是否二次派单" prop="isSecondDispatch" label-width="110px">-->
<!--        <el-select v-model="queryParams.isSecondDispatch" placeholder="请选择是否二次派单" clearable>-->
<!--          <el-option-->
<!--            v-for="dict in dict.type.is_second_dispatch"-->
<!--            :key="dict.value"-->
<!--            :label="dict.label"-->
<!--            :value="dict.value"-->
<!--          />-->
<!--        </el-select>-->
<!--      </el-form-item>-->






<!--      <el-form-item label="学生评分" prop="evaluateRate">-->
<!--        <el-input-->
<!--          v-model="queryParams.evaluateRate"-->
<!--          placeholder="请输入学生评分"-->
<!--          clearable-->
<!--          @keyup.enter.native="handleQuery"-->
<!--        />-->
<!--      </el-form-item>-->
<!--      <el-form-item label="二次维修人员id" prop="secondaryRepairmanId">-->
<!--        <el-input-->
<!--          v-model="queryParams.secondaryRepairmanId"-->
<!--          placeholder="请输入二次维修人员id"-->
<!--          clearable-->
<!--          @keyup.enter.native="handleQuery"-->
<!--        />-->
<!--      </el-form-item>-->
<!--      <el-form-item label="第二次报修预计完成时间" prop="secondExpectedCompletionTime">-->
<!--        <el-date-picker clearable-->
<!--          v-model="queryParams.secondExpectedCompletionTime"-->
<!--          type="date"-->
<!--          value-format="yyyy-MM-dd"-->
<!--          placeholder="请选择第二次报修预计完成时间">-->
<!--        </el-date-picker>-->
<!--      </el-form-item>-->
<!--      <el-form-item label="第二次报修实际完成时间" prop="secondActualCompletionTime">-->
<!--        <el-date-picker clearable-->
<!--          v-model="queryParams.secondActualCompletionTime"-->
<!--          type="date"-->
<!--          value-format="yyyy-MM-dd"-->
<!--          placeholder="请选择第二次报修实际完成时间">-->
<!--        </el-date-picker>-->
<!--      </el-form-item>-->
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
<!--      <el-col :span="1.5">-->
<!--        <el-button-->
<!--          type="primary"-->
<!--          plain-->
<!--          icon="el-icon-plus"-->
<!--          size="mini"-->
<!--          @click="handleAdd"-->
<!--          v-hasPermi="['apartment:secondSelectRepairman:add']"-->
<!--        >新增</el-button>-->
<!--      </el-col>-->
      <el-col :span="1.5">
        <el-button
          type="success"
          plain
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['apartment:secondSelectRepairman:edit']"
        >修改</el-button>
      </el-col>
<!--      <el-col :span="1.5">-->
<!--        <el-button-->
<!--          type="danger"-->
<!--          plain-->
<!--          icon="el-icon-delete"-->
<!--          size="mini"-->
<!--          :disabled="multiple"-->
<!--          @click="handleDelete"-->
<!--          v-hasPermi="['apartment:secondSelectRepairman:remove']"-->
<!--        >删除</el-button>-->
<!--      </el-col>-->
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['apartment:secondSelectRepairman:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="secondSelectRepairmanList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="报修号" align="center" prop="repairId" />
<!--      <el-table-column label="学生id" align="center" prop="studentId" />-->
<!--      <el-table-column label="学生姓名" align="center" prop="nickName" />-->
      <el-table-column label="学生姓名" align="center" width=150>
        <template #default="{ row }">
          {{ row.nickName }}({{ row.userName }})
        </template>
      </el-table-column>
      <el-table-column label="楼栋号" align="center" prop="buildingNo" />
      <el-table-column label="房间号" align="center" prop="roomNo" />
      <el-table-column label="损坏说明" align="center" prop="damageDescription" />
<!--      <el-table-column label="报修类型" align="center" prop="fixType" />-->
      <el-table-column label="报修创建时间" align="center" prop="createAt" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.createAt, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
<!--      <el-table-column label="报修状态" align="center" prop="fixStatus" />-->
      <el-table-column label="报修状态" align="center" prop="fixStatus">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.fzu_fix_status" :value="scope.row.fixStatus"/>
        </template>
      </el-table-column>
<!--      <el-table-column label="一次维修人员id" align="center" prop="firstRepairmanId" />-->
      <el-table-column label="维修人员" align="center" prop="firstRepairmanName" />
      <el-table-column label="第一次维修内容" align="center" prop="firstWorkContent" />
      <el-table-column label="第一次报修完成时间" align="center" prop="firstCompletionTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.firstCompletionTime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="校区管理办公室意见" align="center" prop="campusManagementOpinion" />
<!--      <el-table-column label="是否二次派单，0否，1是" align="center" prop="isSecondDispatch" />-->
      <el-table-column label="是否二次派单" align="center" prop="isSecondDispatch">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.is_second_dispatch" :value="scope.row.isSecondDispatch"/>
        </template>
      </el-table-column>
<!--      <el-table-column label="学生评价内容" align="center" prop="evaluateContent" />-->
<!--      <el-table-column label="学生评分" align="center" prop="evaluateRate" />-->
<!--      <el-table-column label="二次维修人员id" align="center" prop="secondaryRepairmanId" />-->
<!--      <el-table-column label="第二次报修预计完成时间" align="center" prop="secondExpectedCompletionTime" width="180">-->
<!--        <template slot-scope="scope">-->
<!--          <span>{{ parseTime(scope.row.secondExpectedCompletionTime, '{y}-{m}-{d}') }}</span>-->
<!--        </template>-->
<!--      </el-table-column>-->
<!--      <el-table-column label="第二次报修实际完成时间" align="center" prop="secondActualCompletionTime" width="180">-->
<!--        <template slot-scope="scope">-->
<!--          <span>{{ parseTime(scope.row.secondActualCompletionTime, '{y}-{m}-{d}') }}</span>-->
<!--        </template>-->
<!--      </el-table-column>-->
<!--      <el-table-column label="第二次维修内容" align="center" prop="secondWorkContent" />-->
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['apartment:secondSelectRepairman:edit']"
          >派单</el-button>
<!--          <el-button-->
<!--            size="mini"-->
<!--            type="text"-->
<!--            icon="el-icon-delete"-->
<!--            @click="handleDelete(scope.row)"-->
<!--            v-hasPermi="['apartment:secondSelectRepairman:remove']"-->
<!--          >删除</el-button>-->
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
    <el-dialog :title="title" :visible.sync="open" width="800px" append-to-body>
      <div class="descriptions-container">
        <el-descriptions :bordered="true" :column="2" class="custom-descriptions">
          <el-descriptions-item label="学生姓名">{{ form.nickName }}</el-descriptions-item>
          <el-descriptions-item label="第一次维修人员">{{ form.firstRepairmanName }}</el-descriptions-item>
          <el-descriptions-item label="楼栋号">{{ form.buildingNo }}</el-descriptions-item>
          <el-descriptions-item label="第一次维修内容">{{ form.firstWorkContent }}</el-descriptions-item>
          <el-descriptions-item label="房间号">{{ form.roomNo }}</el-descriptions-item>
          <el-descriptions-item label="第一次报修完成时间">{{ form.firstCompletionTime }}</el-descriptions-item>
          <el-descriptions-item label="损坏说明">{{ form.damageDescription }}</el-descriptions-item>
          <el-descriptions-item label="校区管理办公室意见">{{ form.campusManagementOpinion }}</el-descriptions-item>
          <el-descriptions-item label="报修创建时间">{{ form.createAt }}</el-descriptions-item>
<!--          <el-descriptions-item label="是否二次派单">{{ form.isSecondDispatch }}</el-descriptions-item>-->
          <el-descriptions-item label="是否二次派单">
            <span v-if="form.isSecondDispatch == 1">
              <i class="el-icon-check text-success"></i> 是
            </span>
            <span v-else>
              <i class="el-icon-close text-danger"></i> 否
            </span>
          </el-descriptions-item>
        </el-descriptions>
      </div>
      <div class="image-container">
        <div class="damage-images">
          <h4>损坏说明图片</h4>
          <el-image style="width: 100px; height: 100px" :src="stuURL" :zoom-rate="1.2"
                    :preview-src-list="stuURLList" :initial-index="4" fit="cover" />
        </div>
        <div class="first-repair-images">
          <h4>一次维修图片</h4>
          <el-image style="width: 100px; height: 100px" :src="repairURL" :zoom-rate="1.2"
                    :preview-src-list="repairURLList" :initial-index="4" fit="cover" />
        </div>
      </div>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px" class="secondary-repairman-form">
        <el-form-item label="二次维修人员" prop="secondaryRepairmanId" label-width="200">
          <el-select v-model="form.secondaryRepairmanId" placeholder="请选择维修人员">
            <el-option
              v-for="repairman in repairmanList"
              :key="repairman.userId"
              :label="repairman.nickName"
              :value="repairman.userId">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>


<!--        &lt;!&ndash; 添加或修改二次派单对话框 &ndash;&gt;-->
<!--    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>-->
<!--      <el-form ref="form" :model="form" :rules="rules" label-width="80px">-->
<!--&lt;!&ndash;        <el-form-item label="学生姓名" prop="studentId">&ndash;&gt;-->
<!--        <el-form-item label="学生姓名" prop="nickName">-->
<!--&lt;!&ndash;          <el-input v-model="form.studentId" placeholder="请输入学生id" />&ndash;&gt;-->
<!--          <el-input v-model="form.nickName" placeholder="请输入学生姓名" :disabled=true />-->
<!--        </el-form-item>-->
<!--        <el-form-item label="楼栋号" prop="buildingNo">-->
<!--          <el-input v-model="form.buildingNo" placeholder="请输入楼栋号" :disabled=true />-->
<!--        </el-form-item>-->
<!--        <el-form-item label="房间号" prop="roomNo">-->
<!--          <el-input v-model="form.roomNo" placeholder="请输入房间号":disabled=true />-->
<!--        </el-form-item>-->
<!--        <el-form-item label="损坏说明" prop="damageDescription">-->
<!--          <el-input v-model="form.damageDescription" placeholder="请输入损坏说明" :disabled=true />-->
<!--        </el-form-item>-->
<!--        <el-form-item label="报修创建时间" prop="createAt">-->
<!--          <el-input v-model="form.createAt" placeholder="报修时间" :disabled=true />-->
<!--&lt;!&ndash;          <el-date-picker clearable&ndash;&gt;-->
<!--&lt;!&ndash;            v-model="form.createAt"&ndash;&gt;-->
<!--&lt;!&ndash;            type="date"&ndash;&gt;-->
<!--&lt;!&ndash;            value-format="yyyy-MM-dd"&ndash;&gt;-->
<!--&lt;!&ndash;            placeholder="请选择报修创建时间">&ndash;&gt;-->
<!--&lt;!&ndash;          </el-date-picker>&ndash;&gt;-->
<!--        </el-form-item>-->
<!--        <el-form-item label="一次维修人员" prop="firstRepairmanId">-->
<!--          <el-select v-model="form.firstRepairmanId" placeholder="请选择维修人员" :disabled=true>-->
<!--            <el-option-->
<!--              v-for="repairman in repairmanList"-->
<!--              :key="repairman.userId"-->
<!--              :label="repairman.nickName"-->
<!--              :value="repairman.userId" >-->
<!--            </el-option>-->
<!--          </el-select>-->
<!--        </el-form-item>-->
<!--&lt;!&ndash;        <el-form-item label="一次维修人员id" prop="firstRepairmanId">&ndash;&gt;-->
<!--&lt;!&ndash;          <el-input v-model="form.firstRepairmanId" placeholder="请输入一次维修人员id" :disabled=true />&ndash;&gt;-->
<!--&lt;!&ndash;        </el-form-item>&ndash;&gt;-->
<!--        <el-form-item label="第一次维修内容">-->
<!--          <el-input v-model="form.firstWorkContent" :disabled=true />-->
<!--&lt;!&ndash;          <editor v-model="form.firstWorkContent" :min-height="192" />&ndash;&gt;-->
<!--        </el-form-item>-->
<!--        <el-form-item label="第一次报修完成时间" prop="firstCompletionTime">-->
<!--          <el-input v-model="form.firstCompletionTime" placeholder="第一次报修完成时间" :disabled=true />-->
<!--&lt;!&ndash;          <el-date-picker clearable&ndash;&gt;-->
<!--&lt;!&ndash;            v-model="form.firstCompletionTime"&ndash;&gt;-->
<!--&lt;!&ndash;            type="date"&ndash;&gt;-->
<!--&lt;!&ndash;            value-format="yyyy-MM-dd"&ndash;&gt;-->
<!--&lt;!&ndash;            placeholder="请选择第一次报修完成时间">&ndash;&gt;-->
<!--&lt;!&ndash;          </el-date-picker>&ndash;&gt;-->
<!--        </el-form-item>-->
<!--        <el-form-item label="校区管理办公室意见" prop="campusManagementOpinion">-->
<!--          <el-input v-model="form.campusManagementOpinion" placeholder="请输入校区管理办公室意见" :disabled=true />-->
<!--        </el-form-item>-->
<!--        <el-form-item label="是否二次派单" prop="isSecondDispatch">-->
<!--&lt;!&ndash;          <el-input v-model="form.isSecondDispatch" placeholder="请选择是否二次派单" :disabled=true />&ndash;&gt;-->
<!--          <el-select v-model="form.isSecondDispatch" placeholder="请选择是否二次派单" :disabled=true >-->
<!--            <el-option-->
<!--              v-for="dict in dict.type.is_second_dispatch"-->
<!--              :key="dict.value"-->
<!--              :label="dict.label"-->
<!--              :value="dict.value"-->
<!--            ></el-option>-->
<!--          </el-select>-->
<!--        </el-form-item>-->
<!--&lt;!&ndash;        <el-form-item label="是否二次派单，0否，1是" prop="isSecondDispatch">&ndash;&gt;-->
<!--&lt;!&ndash;          <el-input v-model="form.isSecondDispatch" placeholder="请输入是否二次派单，0否，1是" :disabled=true />&ndash;&gt;-->
<!--&lt;!&ndash;        </el-form-item>&ndash;&gt;-->
<!--&lt;!&ndash;        <el-form-item label="学生评价内容">&ndash;&gt;-->
<!--&lt;!&ndash;          <editor v-model="form.evaluateContent" :min-height="192"/>&ndash;&gt;-->
<!--&lt;!&ndash;        </el-form-item>&ndash;&gt;-->
<!--&lt;!&ndash;        <el-form-item label="学生评分" prop="evaluateRate">&ndash;&gt;-->
<!--&lt;!&ndash;          <el-input v-model="form.evaluateRate" placeholder="请输入学生评分" />&ndash;&gt;-->
<!--&lt;!&ndash;        </el-form-item>&ndash;&gt;-->
<!--        <el-form-item label="二次维修人员id" prop="secondaryRepairmanId">-->
<!--          <el-select v-model="form.secondaryRepairmanId" placeholder="请选择维修人员">-->
<!--&lt;!&ndash;          <el-input v-model="form.secondaryRepairmanId" placeholder="请输入二次维修人员id" />&ndash;&gt;-->
<!--          <el-option-->
<!--            v-for="repairman in repairmanList"-->
<!--            :key="repairman.userId"-->
<!--            :label="repairman.nickName"-->
<!--            :value="repairman.userId" >-->
<!--          </el-option>-->
<!--          </el-select>-->
<!--        </el-form-item>-->
<!--&lt;!&ndash;        <el-form-item label="第二次报修预计完成时间" prop="secondExpectedCompletionTime">&ndash;&gt;-->
<!--&lt;!&ndash;          <el-date-picker clearable&ndash;&gt;-->
<!--&lt;!&ndash;            v-model="form.secondExpectedCompletionTime"&ndash;&gt;-->
<!--&lt;!&ndash;            type="date"&ndash;&gt;-->
<!--&lt;!&ndash;            value-format="yyyy-MM-dd"&ndash;&gt;-->
<!--&lt;!&ndash;            placeholder="请选择第二次报修预计完成时间">&ndash;&gt;-->
<!--&lt;!&ndash;          </el-date-picker>&ndash;&gt;-->
<!--&lt;!&ndash;        </el-form-item>&ndash;&gt;-->
<!--&lt;!&ndash;        <el-form-item label="第二次报修实际完成时间" prop="secondActualCompletionTime">&ndash;&gt;-->
<!--&lt;!&ndash;          <el-date-picker clearable&ndash;&gt;-->
<!--&lt;!&ndash;            v-model="form.secondActualCompletionTime"&ndash;&gt;-->
<!--&lt;!&ndash;            type="date"&ndash;&gt;-->
<!--&lt;!&ndash;            value-format="yyyy-MM-dd"&ndash;&gt;-->
<!--&lt;!&ndash;            placeholder="请选择第二次报修实际完成时间">&ndash;&gt;-->
<!--&lt;!&ndash;          </el-date-picker>&ndash;&gt;-->
<!--&lt;!&ndash;        </el-form-item>&ndash;&gt;-->
<!--&lt;!&ndash;        <el-form-item label="第二次维修内容">&ndash;&gt;-->
<!--&lt;!&ndash;          <editor v-model="form.secondWorkContent" :min-height="192"/>&ndash;&gt;-->
<!--&lt;!&ndash;        </el-form-item>&ndash;&gt;-->
<!--      </el-form>-->
<!--      <div slot="footer" class="dialog-footer">-->
<!--        <el-button type="primary" @click="submitForm">确 定</el-button>-->
<!--        <el-button @click="cancel">取 消</el-button>-->
<!--      </div>-->
<!--    </el-dialog>-->
  </div>
</template>

<script>
import {
  listSecondSelectRepairman,
  getSecondSelectRepairman,
  delSecondSelectRepairman,
  addSecondSelectRepairman,
  updateSecondSelectRepairman,
  selectUserByRoleId
} from "@/api/apartment/secondSelectRepairman";


export default {
  dicts: ['fzu_fix_status', 'is_second_dispatch'],
  name: "SecondSelectRepairman",
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
      // 二次派单表格数据
      secondSelectRepairmanList: [],
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
      repairmanList: null,
      userList: [],
      // 表单参数
      form: {},
      stuURL: '',
      stuURLList: [],
      repairURL: '',
      repairURLList: [],
      // 表单校验
      rules: {
      }
    };
  },
  created() {
    this.getList();
    this.getRepairmanList();
  },
  methods: {
    async getRepairmanList() {
      const roleId = 105; // 获取roleId参数
      const response = await selectUserByRoleId(roleId);
      this.repairmanList = response;
    },
    /** 查询二次派单列表 */
    getList() {
      this.loading = true;
      this.queryParams.fixStatus = 3;
      listSecondSelectRepairman(this.queryParams).then(response => {
        this.secondSelectRepairmanList = response.rows;
        console.log(this.secondSelectRepairmanList)
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
      this.single = selection.length!==1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加二次派单";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const repairId = row.repairId || this.ids
      getSecondSelectRepairman(repairId).then(response => {
        this.stuURL = response.data.stuImagesURL[0];
        this.stuURLList = response.data.stuImagesURL;
        this.repairURL = response.data.onceImagesURL[0];
        this.repairURLList = response.data.onceImagesURL;
        this.form = response.data;
        this.open = true;
        this.title = "二次派单";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.repairId != null) {
            this.form.fixStatus = 1;
            updateSecondSelectRepairman(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            // addSecondSelectRepairman(this.form).then(response => {
            //   this.$modal.msgSuccess("新增成功");
            //   this.open = false;
            //   this.getList();
            // });
          }
        }
      });
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const repairIds = row.repairId || this.ids;
      this.$modal.confirm('是否确认删除二次派单编号为"' + repairIds + '"的数据项？').then(function() {
        return delSecondSelectRepairman(repairIds);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('apartment/secondSelectRepairman/export', {
        ...this.queryParams
      }, `secondSelectRepairman_${new Date().getTime()}.xlsx`)
    }
  }
};
</script>
<style scoped>
.descriptions-container {
  padding: 20px;
  background-color: #f5f7fa;
  border-radius: 4px;
}

.custom-descriptions {
  background-color: #ffffff;
  border-radius: 4px;
  padding: 20px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.secondary-repairman-form {
  margin-top: 20px;
}

.dialog-footer {
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
}
.image-container {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

.damage-images,
.first-repair-images {
  width: 48%;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
.text-success {
  color: #67C23A;
}

.text-danger {
  color: #F56C6C;
}
</style>
