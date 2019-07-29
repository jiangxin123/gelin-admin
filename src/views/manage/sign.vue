<template>
  <div class="app-container">
    <div class="filter-container mb-0">
      <el-form :inline="true" :model="search" >
        <el-form-item>
          <el-input size="small" v-model="search.name" placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item>
          <el-select size="small" v-model="search.course" placeholder="请选择课程">
              <el-option label="全部课程" value=""></el-option>
              <el-option v-for="(item, index) in courseList" :key="index" :label="item" :value="index+1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button size="small" type="primary" plain @click="onSubmit"><i class="el-icon-search"></i>搜索</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-table empty-text="暂无数据" size="mini" :data="list" v-loading="listLoading" element-loading-text="Loading"
      border highlight-current-row>
      <el-table-column align="center" label="序号" width="60">
        <template slot-scope="scope">
          {{ scope.$index }}
        </template>
      </el-table-column>
      <el-table-column label="姓名" width="150" align="center">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column label="手机号" width="150" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.phone }}</span>
        </template>
      </el-table-column>
      <el-table-column label="报名时间" width="150" align="center">
        <template slot-scope="scope">
          {{ scope.row.creatTime }}
        </template>
      </el-table-column>
      <el-table-column label="课程" width="150" align="center">
        <template slot-scope="scope">
          {{ courseList[scope.row.course - 1] }}
        </template>
      </el-table-column>
      <el-table-column label="地址" width="250">
        <template slot-scope="scope">
          {{ scope.row.address }}
        </template>
      </el-table-column>
      <el-table-column label="留言" min-width="300">
        <template slot-scope="scope">
          {{ scope.row.message }}
        </template>
      </el-table-column>
      <!-- <el-table-column class-name="status-col" label="Status" width="110" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status | statusFilter">{{ scope.row.status }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="Display_time" width="200">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.display_time }}</span>
        </template>
      </el-table-column> -->
    </el-table>
    <!--分页-->
    <div v-if="page.total > 0" class="pagination-container">
      <el-pagination :current-page="page.offset"
                      :total="page.total"
                      background
                      layout="total, prev, pager, next, sizes, jumper"
                      :page-sizes="[20, 50, 100]"
                      :page-size="page.limit"
                      @size-change="handleSizeChange"
                      @current-change="handleCurrentChange">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { postList } from '@/api/table'

export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      list: null,
      listLoading: true,
      search: {},
      page: {
        limit: 20,
        offset: 1,
        total: 0
      },
      courseList: ['叉车司机', '行车', '电工作业', '电焊工作业', '建筑电焊工作业', '建筑电工', '压力容器']
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    // 修改每页显示条数
    handleSizeChange(val) {
      this.page.offset = 1
      this.page.limit = val
      this.fetchData()
    },
    // 切换到当前页
    handleCurrentChange(val) {
      this.page.offset = val
      this.fetchData()
    },
    // 搜索
    onSubmit() {
      this.page.offset = 1
      this.fetchData()
    },
    fetchData() {
      const data = {
        search: this.search,
        offset: this.page.offset,
        limit: this.page.limit
      }
      this.listLoading = true
      postList(data).then(res => {
        this.listLoading = false
        this.list = res.data
        this.page.total = res.total
      })
    }
  }
}
</script>
