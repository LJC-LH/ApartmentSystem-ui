<template>
                  <div class="app-container">
                    <!-- <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
                      <el-form-item>
                        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
                        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
                      </el-form-item>
                    </el-form> -->
                
                    <!-- <el-row :gutter="10" class="mb8">
                      <el-col :span="1.5">
                        <el-button
                          type="primary"
                          plain
                          icon="el-icon-plus"
                          size="mini"
                          @click="handleAdd"
                          v-hasPermi="['apartment:studentdorm:add']"
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
                          v-hasPermi="['apartment:studentdorm:edit']"
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
                          v-hasPermi="['apartment:studentdorm:remove']"
                        >删除</el-button>
                      </el-col>
                      <el-col :span="1.5">
                        <el-button
                          type="warning"
                          plain
                          icon="el-icon-download"
                          size="mini"
                          @click="handleExport"
                          v-hasPermi="['apartment:studentdorm:export']"
                        >导出</el-button>
                      </el-col>
                      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
                    </el-row> -->
                
                    <el-table v-loading="loading" :data="studentdormList" @selection-change="handleSelectionChange">
                      <el-table-column type="selection" width="55" align="center" />
                      <el-table-column label="宿舍ID" align="center" prop="dormId" />
                      <el-table-column label="楼栋号" align="center" prop="buildingNo" />
                      <el-table-column label="房间号" align="center" prop="roomNo" />
                      <el-table-column label="欠费金额" align="center" prop="fees" />
                      <el-table-column label="是否欠费" align="center" prop="feesStatus">
                        <!-- <template slot-scope="scope">
                          <dict-tag :options="dict.type.fzu_fees_status" :value="scope.row.feesStatus"/>
                        </template> -->
                      </el-table-column>
                      <el-table-column label="缴费类别" align="center" prop="feesCategory">
                        <!-- <template slot-scope="scope">
                          <dict-tag :options="dict.type.fzu_fees_category" :value="scope.row.feesCategory"/>
                        </template> -->
                      </el-table-column>
                      <el-table-column label="宿舍使用状态" align="center" prop="dormStatus">
                        <template slot-scope="scope">
                          <dict-tag :options="dict.type.fzu_dorm_status" :value="scope.row.dormStatus"/>
                        </template>
                      </el-table-column>
                      <el-table-column label="单位负责人" align="center" prop="contactPerson" />
                      <el-table-column label="单位负责人联系方式" align="center" prop="contactPhone" />
                      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
                        <!-- <template slot-scope="scope">
                          <el-button
                            size="mini"
                            type="text"
                            icon="el-icon-edit"
                            @click="handleUpdate(scope.row)"
                            v-hasPermi="['apartment:studentdorm:edit']"
                          >修改</el-button>
                          <el-button
                            size="mini"
                            type="text"
                            icon="el-icon-delete"
                            @click="handleDelete(scope.row)"
                            v-hasPermi="['apartment:studentdorm:remove']"
                          >删除</el-button>
                        </template> -->
                      </el-table-column>
                    </el-table>
                    
                    <pagination
                      v-show="total>0"
                      :total="total"
                      :page.sync="queryParams.pageNum"
                      :limit.sync="queryParams.pageSize"
                      @pagination="getList"
                    />
                
                    <!-- 添加或修改宿舍对话框 -->
                    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
                      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
                      </el-form>
                      <div slot="footer" class="dialog-footer">
                        <el-button type="primary" @click="submitForm">确 定</el-button>
                        <el-button @click="cancel">取 消</el-button>
                      </div>
                    </el-dialog>
                  </div>
                </template>
                
                <script>
                import { listStudentdorm, getStudentdorm, delStudentdorm, addStudentdorm, updateStudentdorm } from "@/api/apartment/studentdorm";
                
                export default {
                  name: "Studentdorm",
                  dicts: ['fzu_dorm_status'],
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
                      // 宿舍表格数据
                      studentdormList: [],
                      // 弹出层标题
                      title: "",
                      // 是否显示弹出层
                      open: false,
                      // 查询参数
                      queryParams: {
                        pageNum: 1,
                        pageSize: 10,
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
                    /** 查询宿舍列表 */
                    getList() {
                      this.loading = true;
                      listStudentdorm(this.queryParams).then(response => {
                        this.studentdormList = response.rows;
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
                        dormId: null,
                        buildingNo: null,
                        roomNo: null,
                        fees: null,
                        feesStatus: null,
                        feesCategory: null,
                        dormStatus: null,
                        contactPerson: null,
                        contactPhone: null,
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
                      this.ids = selection.map(item => item.dormId)
                      this.single = selection.length!==1
                      this.multiple = !selection.length
                    },
                    /** 新增按钮操作 */
                    handleAdd() {
                      this.reset();
                      this.open = true;
                      this.title = "添加宿舍";
                    },
                    /** 修改按钮操作 */
                    handleUpdate(row) {
                      this.reset();
                      const dormId = row.dormId || this.ids
                      getStudentdorm(dormId).then(response => {
                        this.form = response.data;
                        this.open = true;
                        this.title = "修改宿舍";
                      });
                    },
                    /** 提交按钮 */
                    submitForm() {
                      this.$refs["form"].validate(valid => {
                        if (valid) {
                          if (this.form.dormId != null) {
                            updateStudentdorm(this.form).then(response => {
                              this.$modal.msgSuccess("修改成功");
                              this.open = false;
                              this.getList();
                            });
                          } else {
                            addStudentdorm(this.form).then(response => {
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
                      const dormIds = row.dormId || this.ids;
                      this.$modal.confirm('是否确认删除宿舍编号为"' + dormIds + '"的数据项？').then(function() {
                        return delStudentdorm(dormIds);
                      }).then(() => {
                        this.getList();
                        this.$modal.msgSuccess("删除成功");
                      }).catch(() => {});
                    },
                    /** 导出按钮操作 */
                    handleExport() {
                      this.download('apartment/studentdorm/export', {
                        ...this.queryParams
                      }, `studentdorm_${new Date().getTime()}.xlsx`)
                    }
                  }
                };
                </script>
                