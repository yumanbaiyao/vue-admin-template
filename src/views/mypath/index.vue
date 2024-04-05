<template>
<div class="app-container">
    <div class="filter-container">
      <!-- <el-input v-model="listQuery.title" placeholder="Title" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-select v-model="listQuery.importance" placeholder="Imp" clearable style="width: 90px" class="filter-item">
        <el-option v-for="item in importanceOptions" :key="item" :label="item" :value="item" />
      </el-select>
      <el-select v-model="listQuery.type" placeholder="Type" clearable class="filter-item" style="width: 130px">
        <el-option v-for="item in calendarTypeOptions" :key="item.key" :label="item.display_name+'('+item.key+')'" :value="item.key" />
      </el-select>
      <el-select v-model="listQuery.sort" style="width: 140px" class="filter-item" @change="handleFilter">
        <el-option v-for="item in sortOptions" :key="item.key" :label="item.label" :value="item.key" />
      </el-select>
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
        Search
      </el-button> -->
      <el-button class="filter-item" style="margin-left: 10px;margin-bottom: 5px" type="primary" icon="el-icon-edit" @click="handleCreate">
        新增机构
      </el-button>
      <!-- <el-button v-waves :loading="downloadLoading" class="filter-item" type="primary" icon="el-icon-download" @click="handleDownload">
        Export
      </el-button>
      <el-checkbox v-model="showReviewer" class="filter-item" style="margin-left:15px;" @change="tableKey=tableKey+1">
        reviewer
      </el-checkbox> -->
    </div>

  
  

  <el-table v-loading="listLoading" :data="list" @sort-change="sortChange" element-loading-text="Loading"  border style="width: 100%">
    <el-table-column prop="deptId" sortable label="机构ID" width="180"> </el-table-column>
    <el-table-column prop="deptName" label="名称" width="180"> </el-table-column>
    <el-table-column prop="phone" label="电话"> </el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>

  <el-dialog title="机构" :visible.sync="dialogFormVisible">
  <el-form :model="form">
    <el-input v-model="form.deptId" autocomplete="off" v-show="false"></el-input>
    <el-form-item label="名称" :label-width="'120px'">
      <el-input v-model="form.deptName" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="电话" :label-width="'120px'">
      <el-input v-model="form.phone" autocomplete="off"></el-input>
    </el-form-item>
    
     
    
    <el-form-item label="上级机构" :label-width="'120px'">
      <el-input v-model="form.parentName" disabled></el-input>
      <!-- <el-input v-model="form.parentId" autocomplete="off"></el-input> -->
      <el-tree :data="data2" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
    </el-form-item>

    
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="submitEdit()">确 定</el-button>
  </div>
  </el-dialog>

    
  </div>


</template>

<script>
import { getList, modify, add, del, treeData } from '@/api/pageone'

export default {
  data() {
    return {
      list: null,
      dialogFormVisible: false,
      ins: true,
      form: {
          deptId: '',
          parentId: '',
          parentName: '',
          deptName: '',
          phone: ''
      },
      data2: null,
      defaultProps: {
        children: 'children',
        label: 'name',
      }
      
    };
  },
  created() {
    this.fetchData();
    
  },
  watch: {  
      // 监听message的变化  
    // dialogFormVisible(oldVal, newVal) {  

    //   // console.log('message changed from', oldVal, 'to', newVal);  
    //   if(oldVal==false && newVal==true){
    //       this.form.parentId = '';
    //       this.form.parentName = ''
    //   }
              
    // }  
  },
  methods: {
    buildTree(items) {  
          const map = {};  
          const tree = [];  
          
          // 第一步：将每个项目都映射到map中，以便快速查找  
          items.forEach(item => {  
            map[item.id] = { ...item, children: [] };  
          });  
          
          // 第二步：遍历所有项目，为它们设置children属性  
          items.forEach(item => {  
            const parent = map[item.pId];  
            if (parent) {  
              // 如果找到了父对象，就把当前对象添加到父对象的children数组中  
              parent.children.push(map[item.id]);  
            } else {  
              // 如果没有找到父对象（即pId为0），说明它是根节点，直接添加到tree数组中  
              tree.push(map[item.id]);  
            }  
          });  
          
          return tree;  
        },
    handleNodeClick(data) {
        this.form.parentId = data.id;
        this.form.parentName = data.name;
        console.log(data)
      },
    fetchData() {
      this.listLoading = true;
      getList({}).then((response) => {
        this.list = response.data.depts;
        this.listLoading = false;
        console.log(this.list)
      });
    },
    handleCreate() {
        this.form = {
          deptId: '',
          parentId: '',
          parentName: '',
          deptName: '',
          phone: ''
        }
        treeData().then((response) => {
          this.data2 = response.data.tree;
          this.data2 = this.buildTree(this.data2);
          this.listLoading = false;
          console.log(this.list)
        });

     
          
          this.dialogFormVisible = true;
          this.ins = true;
        },
    handleEdit(index, row) {
          
          treeData().then((response) => {
            this.data2 = response.data.tree;
            this.data2 = this.buildTree(this.data2);
            this.listLoading = false;
            console.log(this.list)
          });

          
          console.log(index, row);
          this.ins = false;
          this.dialogFormVisible = true;
          this.form.deptId = row.deptId;
          this.form.parentId = row.parentId;
          this.form.deptName = row.deptName;
          this.form.phone = row.phone;
          this.form.parentName = row.parentName;
        },
    submitEdit() {
        if(this.ins){
            add(this.form).then((response) => {
            if(response.code==200){
                this.fetchData();
                this.$message({
                      message: '新增操作成功',
                      type: 'success'
                      })
            }
            this.form.parentId = '';
            this.form.parentName = ''
            });
        }else{
            // console.log("================")
            // console.log(this.form)
            modify(this.form).then((response) => {
            if(response.code==200){
                this.fetchData();
                this.$message({
                      message: '修改操作成功',
                      type: 'success'
                      })
            }else{
                this.$message({
                      message: '修改操作失败',
                      type: 'error'
                      })
            }
            this.form.parentId = '';
            this.form.parentName = ''
            });
        }
        this.dialogFormVisible = false
        },
    handleDelete(index, row) {
      console.log(index, row);
      del(row.deptId).then((response) => {
            if(response.code==200){
                this.fetchData();
                this.$message({
                      message: '删除操作成功',
                      type: 'success'
                      })
            }else{
                this.$message({
                      message: '删除操作失败',
                      type: 'error'
                      })
            }
            });
    },
    sortChange(column) {
        //打印看看参数有哪些？
        console.log('排序', column.prop, column.order);
        // this.fetchData();
        // //排序默认是从第一页开始
        //   this.listQuery.page = 1;
        //   //排序的字段是属性名
        //   this.listQuery.param.sort = column.prop;
        //   //排序的方式是根据上下选择来确定
        //   this.listQuery.param.asc = (column.order == 'ascending' ? true : false);
        //   //此方法为获取数据的方法
        //   this.getPage();
    },
  },
    
};
</script>
